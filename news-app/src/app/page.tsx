import ArticleCard from "./components/ArticleCard";
import { isFavorite } from "./actions";
import PaginationControls from "./components/PaginationControls";
export interface Article {
  title: string;
  author: string;
  source: string;
  published_at: string;
  image: string;
  url: string;
  favorite: boolean;
}
const getTopArticles = async (page: number, limit: number) => {
  const res = await fetch(
    `http://api.mediastack.com/v1/news?access_key=${
      process.env.API_KEY
    }&languages=en&sort=popularity&date=2024-5-1,2024-6-1&limit=${limit}&offset=${
      (page - 1) * limit
    }`
  );

  if (!res.ok) {
    throw new Error("Couldn't fetch articles!");
  }
  const topArticles = await res.json();
  return topArticles["data"];
};
export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const repeatedHeadlines = new Map<string, boolean>();
  const page =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 1;
  const limit =
    typeof searchParams.limit === "string" ? Number(searchParams.limit) : 10;
  const articles = await getTopArticles(page, limit);

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
    return (
      <div className="py-10 flex flex-col gap-7 place-items-center">
        <p>Trending Articles</p>
        {updatedArticles.map((article: Article) => {
          return (
            <ArticleCard
              key={`${article.title}_${article.published_at}`}
              title={article.title}
              source={article.source}
              uploadTime={article.published_at}
              image={article.image}
              url={article.url}
              favorite={article.favorite}
            ></ArticleCard>
          );
        })}
        <PaginationControls hasNextPage={true} hasPrevPage={page === 1} />
      </div>
    );
  } else {
    return <>Articles couldn't be loaded!</>;
  }
}
