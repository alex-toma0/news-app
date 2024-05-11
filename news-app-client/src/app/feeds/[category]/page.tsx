import ArticleCard from "@/app/components/ArticleCard";
import { Article } from "@/app/page";
const getArticlesByCategory = async (category: string) => {
  try {
    const res = await fetch(
      `http://localhost:8080/api/articles/getArticlesByCategory/${category}`
    );
    const articles = await res.json();
    return articles["data"];
  } catch (err) {
    console.log(err);
    return err;
  }
};
export default async function Feed({
  params,
}: {
  params: { category: string };
}) {
  const articles = await getArticlesByCategory(params.category);
  console.log(articles);
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
