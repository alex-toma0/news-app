import DeleteFeed from "@/app/components/DeleteFeed";
import { auth } from "@clerk/nextjs/server";
import { today, getLocalTimeZone } from "@internationalized/date";
import ArticleList from "@/app/components/ArticleList";
import Filters from "@/app/components/Filters";
const getArticlesByCategory = async (
  category: string,
  languages: string,
  sources: string,
  sort: string,
  startDate: string,
  endDate: string
) => {
  try {
    let baseURL = `http://api.mediastack.com/v1/news?access_key=${
      process.env.API_KEY
    }&limit=${50}&sort=${sort}&date=${startDate},${endDate}`;
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
  searchParams,
}: {
  params: {
    feedName: string;
    categories: string;
    languages: string;
    sources: string;
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

  const articles = await getArticlesByCategory(
    params.categories,
    params.languages,
    params.sources,
    sort,
    startDate,
    endDate
  );
  const { userId } = auth();
  if (articles.length > 0 && userId) {
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
