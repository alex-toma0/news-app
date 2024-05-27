import DeleteFeed from "@/app/components/DeleteFeed";
import { auth } from "@clerk/nextjs/server";
import ArticleList from "@/app/components/ArticleList";
import Filters from "@/app/components/Filters";
const getArticlesByCategory = async (
  category: string,
  languages: string,
  sources: string
) => {
  try {
    let baseURL = `http://api.mediastack.com/v1/news?access_key=${
      process.env.API_KEY
    }&limit=${50}`;
    // Building url based on the params
    if (category !== "all") baseURL += `&categories=${category}`;
    if (languages !== "all") baseURL += `&languages=${languages}`;
    if (sources !== "all") baseURL += `&sources=${sources}`;

    const res = await fetch(baseURL);
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
  const articles = await getArticlesByCategory(
    params.categories,
    params.languages,
    params.sources
  );
  const { userId } = auth();
  if (articles.length > 0) {
    return (
      <div className="py-10 flex flex-col gap-7 place-items-center">
        <DeleteFeed feedName={params.feedName} userId={userId} />
        <Filters />
        <ArticleList articles={articles} />
      </div>
    );
  } else {
    return <>Articles couldn't be loaded!</>;
  }
}
