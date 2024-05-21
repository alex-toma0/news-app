import ArticleCard from "@/app/components/ArticleCard";
import { Article } from "@/app/page";
import DeleteFeed from "@/app/components/DeleteFeed";
const getArticlesByCategory = async (category: string, languages: string) => {
  try {
    const res = await fetch(
      `http://api.mediastack.com/v1/news?access_key=${process.env.API_KEY}&categories=${category}&languages=${languages}&limit=10`
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
    userId: string;
    languages: string;
  };
}) {
  const articles = await getArticlesByCategory(
    params.categories,
    params.languages
  );
  if (articles.length > 0) {
    console.log(articles);
    return (
      <div className="py-10 flex flex-col gap-7 place-items-center">
        <DeleteFeed feedName={params.feedName} userId={params.userId} />
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
