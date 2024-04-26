import ArticleCard from "./components/ArticleCard";
const getTopArticles = async () => {
  const res: any = await fetch("http://localhost:8080/api/articles");
  console.log(res);
  if (!res.ok) {
    throw new Error("Couldn't fetch articles!");
  }
  const data = await res.json();
  console.log(data["posts"]);
  return data["posts"];
};
export default async function Home() {
  const articles = await getTopArticles();
  return (
    <>
      <ArticleCard
        title={articles[0].title}
        author={articles[0].author}
        source={articles[0].site}
        uploadTime={articles[0].published}
        image={articles[0].main_image}
      ></ArticleCard>
    </>
  );
}
