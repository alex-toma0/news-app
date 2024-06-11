import Filters from "./components/Filters";
import ArticleList from "./components/ArticleList";
import { getLocalTimeZone, today } from "@internationalized/date";
export interface Article {
  title: string;
  author: string;
  source: string;
  published_at: string;
  image: string;
  url: string;
  favorite: boolean;
  category: string;
}
const getTopArticles = async (
  sort: string = "popularity",
  startDate: string,
  endDate: string
) => {
  const url = `http://api.mediastack.com/v1/news?access_key=${
    process.env.API_KEY
  }&languages=en&sort=${sort}&limit=${50}&date=${startDate},${endDate}`;
  const res = await fetch(url, { next: { revalidate: 3600 } });

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
  let endDate = today(getLocalTimeZone()).toString();
  let startDate = today(getLocalTimeZone()).set({ day: 1 }).toString();
  if (typeof searchParams.sort === "string") sort = searchParams.sort;
  if (
    typeof searchParams.startDate === "string" &&
    searchParams.startDate.length > 0
  )
    startDate = searchParams.startDate;
  if (
    typeof searchParams.endDate === "string" &&
    searchParams.endDate.length > 0
  )
    endDate = searchParams.endDate;

  const articles = await getTopArticles(sort, startDate!, endDate!);

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
