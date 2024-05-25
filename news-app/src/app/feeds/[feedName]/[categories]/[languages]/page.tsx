import ArticleCard from "@/app/components/ArticleCard";
import { Article } from "@/app/page";
import DeleteFeed from "@/app/components/DeleteFeed";
import { isFavorite } from "@/app/actions";
import { auth } from "@clerk/nextjs/server";
import PaginationControls from "@/app/components/PaginationControls";
const getArticlesByCategory = async (
  page: number,
  limit: number,
  category: string,
  languages: string
) => {
  try {
    const res = await fetch(
      `http://api.mediastack.com/v1/news?access_key=${
        process.env.API_KEY
      }&categories=${category}&languages=${languages}&limit=${limit}&offset=${
        (page - 1) * limit
      }`
    );
    const articles = await res.json();
    return articles["data"];
  } catch (err) {
    console.log(err);
    return err;
  }
};
export default async function Page({
  params,
  searchParams,
}: {
  params: {
    feedName: string;
    categories: string;
    languages: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const repeatedHeadlines = new Map<string, boolean>();
  const page =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 1;
  const limit =
    typeof searchParams.limit === "string" ? Number(searchParams.limit) : 10;
  const articles = await getArticlesByCategory(
    page,
    limit,
    params.categories,
    params.languages
  );
  const { userId } = auth();
  if (articles.length > 0) {
    const filteredArticles: Article[] = [];
    articles.forEach((article: Article) => {
      if (!repeatedHeadlines.has(article.title)) {
        filteredArticles.push(article);
      }
      repeatedHeadlines.set(article.title, true);
    });
    const updatedArticles = await Promise.all(
      filteredArticles.map(async (article: any) => {
        const favorite = await isFavorite(article.url);
        return { ...article, favorite };
      })
    );
    console.log(updatedArticles);
    return (
      <div className="py-10 flex flex-col gap-7 place-items-center">
        <DeleteFeed feedName={params.feedName} userId={userId} />
        {updatedArticles.map((article: Article) => (
          <ArticleCard
            key={`${article.title}_${article.published_at}`}
            title={article.title}
            source={article.source}
            uploadTime={article.published_at}
            image={article.image}
            url={article.url}
            favorite={article.favorite}
          ></ArticleCard>
        ))}
        <PaginationControls hasNextPage={true} hasPrevPage={page === 1} />
      </div>
    );
  } else {
    return <>Articles couldn't be loaded!</>;
  }
}
