import ArticleCard from "./components/ArticleCard";
import { isFavorite } from "./actions";
export interface Article {
  title: string;
  author: string;
  source: string;
  published_at: string;
  image: string;
  url: string;
  favorite: boolean;
}
const getTopArticles = async () => {
  const res = await fetch(
    `http://api.mediastack.com/v1/news?access_key=${process.env.API_KEY}&languages=en&limit=10`
  );

  if (!res.ok) {
    throw new Error("Couldn't fetch articles!");
  }
  const topArticles = await res.json();
  return topArticles["data"];
};
export default async function Home() {
  const articles = await getTopArticles();
  const updatedArticles = await Promise.all(
    articles.map(async (article: Article) => {
      const favorite = await isFavorite(article.url);
      return { ...article, favorite };
    })
  );
  if (articles.length > 0) {
    return (
      <div className="py-10 flex flex-col gap-7 place-items-center">
        <p>Trending Articles</p>
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
