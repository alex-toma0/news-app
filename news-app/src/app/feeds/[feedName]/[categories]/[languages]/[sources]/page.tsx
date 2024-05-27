import ArticleCard from "@/app/components/ArticleCard";
import { Article } from "@/app/page";
import DeleteFeed from "@/app/components/DeleteFeed";
import { isFavorite } from "@/app/actions";
import { auth } from "@clerk/nextjs/server";
const getArticlesByCategory = async (
  category: string,
  languages: string,
  sources: string
) => {
  try {
    const res = await fetch(
      `http://api.mediastack.com/v1/news?access_key=${
        process.env.API_KEY
      }&categories=${category}&languages=${languages}&sources=${sources}&limit=${50}`
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
}: {
  params: {
    feedName: string;
    categories: string;
    languages: string;
    sources: string;
  };
}) {
  const repeatedHeadlines = new Map<string, boolean>();
  const articles = await getArticlesByCategory(
    params.categories,
    params.languages,
    params.sources
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
      </div>
    );
  } else {
    return <>Articles couldn't be loaded!</>;
  }
}
