import ArticleCard from "@/app/components/ArticleCard";
import { Article } from "@/app/page";
import { isFavorite } from "@/app/actions";
const getArticlesByKeywords = async (keywords: string) => {
  try {
    const res = await fetch(
      `http://api.mediastack.com/v1/news?access_key=${process.env.API_KEY}&keywords=${keywords}`
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
    keywords: string;
  };
}) {
  const repeatedHeadlines = new Map<string, boolean>();
  const articles = await getArticlesByKeywords(params.keywords);
  if (articles && articles.length > 0) {
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
        <h1 className="text-2xl">Your articles</h1>
        {updatedArticles.map((article: any) => (
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
  }
}
