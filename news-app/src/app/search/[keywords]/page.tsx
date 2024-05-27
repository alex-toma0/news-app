import ArticleCard from "@/app/components/ArticleCard";
import { Article } from "@/app/page";
import { isFavorite } from "@/app/actions";
import { today, getLocalTimeZone } from "@internationalized/date";
import ArticleList from "@/app/components/ArticleList";
import Filters from "@/app/components/Filters";
const getArticlesByKeywords = async (
  keywords: string,
  sort: string,
  startDate: string,
  endDate: string
) => {
  try {
    const res = await fetch(
      `http://api.mediastack.com/v1/news?access_key=${process.env.API_KEY}&keywords=${keywords}&sort=${sort}&date=${startDate},${endDate}`
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
  searchParams,
}: {
  params: {
    keywords: string;
  };
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
  const articles = await getArticlesByKeywords(
    params.keywords,
    sort,
    startDate,
    endDate
  );
  if (articles && articles.length > 0) {
    return (
      <div className="py-10 flex flex-col gap-7 place-items-center">
        <h1 className="text-2xl">Your articles</h1>
        <Filters />

        <ArticleList articles={articles} />
      </div>
    );
  }
}
