import ArticleCard from "./components/ArticleCard";
export interface Article {
  title: string;
  author: string;
  source: string;
  published_at: string;
  image: string;
  url: string;
}
const getTopArticles = async () => {
  const res: any = await fetch(
    "http://localhost:8080/api/articles/getTopArticles"
  );
  if (!res.ok) {
    throw new Error("Couldn't fetch articles!");
  }
  const data = await res.json();
  return data["data"];
};
export default async function Home() {
  const articles = await getTopArticles();
  if (articles.length > 0) {
    return (
      <div className="py-10 flex flex-col gap-7 place-items-center">
        {articles.map((article: Article) => (
          <ArticleCard
            key={`${article.title}_${article.published_at}`}
            title={article.title}
            author={article.author}
            source={article.source}
            uploadTime={article.published_at}
            image={article.image}
            url={article.url}
          ></ArticleCard>
        ))}
      </div>
    );
  } else {
    return <>Articles couldn't be loaded!</>;
  }
}
