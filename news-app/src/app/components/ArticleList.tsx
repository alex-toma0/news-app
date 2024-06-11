import { Article } from "../page";
import { isFavorite } from "../actions";
import Filters from "./Filters";
import ArticleCard from "./ArticleCard";
import { auth } from "@clerk/nextjs/server";

export default async function ArticleList({
  articles,
}: {
  articles: Article[];
}) {
  let isLoggedIn = true;
  const { userId } = auth();
  if (!userId) isLoggedIn = false;
  const repeatedHeadlines = new Map<string, boolean>();

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
    <>
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
            isLoggedIn={isLoggedIn}
            category={article.category}
          ></ArticleCard>
        );
      })}
    </>
  );
}
