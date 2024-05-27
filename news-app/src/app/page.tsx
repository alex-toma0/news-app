import { isFavorite } from "./actions";
import Filters from "./components/Filters";
import ArticleList from "./components/ArticleList";
export interface Article {
  title: string;
  author: string;
  source: string;
  published_at: string;
  image: string;
  url: string;
  favorite: boolean;
}
const getTopArticles = async (sort: string = "popularity") => {
  const res = await fetch(
    `http://api.mediastack.com/v1/news?access_key=${
      process.env.API_KEY
    }&languages=en&sort=${sort}&limit=${50}`
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
  let sort = "popularity";
  if (typeof searchParams.sort === "string") sort = searchParams.sort;
  const articles = await getTopArticles(sort);

  if (articles.length > 0) {
    return (
      <div className="py-10 flex flex-col gap-7 place-items-center">
        <h1 className="text-2xl">Trending Articles</h1>
        <Filters />
        <ArticleList articles={articles} />
      </div>
    );
  } else {
    return <>Articles couldn't be loaded!</>;
  }
}
