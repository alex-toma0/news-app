import ArticleCard from "@/app/components/ArticleCard";
import { Article } from "@/app/page";
import { getFavorites, isFavorite } from "@/app/actions";

export default async function Page() {
  const favorites = await getFavorites();
  console.log(favorites);
  if (favorites && favorites.length > 0) {
    return (
      <div className="py-10 flex flex-col gap-7 place-items-center">
        <h1 className="text-2xl">Your Favorites</h1>
        {favorites.map((favArticle: any) => (
          <ArticleCard
            key={`${favArticle.title}_${favArticle.uploadDate}`}
            title={favArticle.title}
            source={favArticle.source}
            uploadTime={favArticle.uploadDate}
            image={favArticle.image}
            url={favArticle.url}
            favorite={true}
            isLoggedIn={true}
          ></ArticleCard>
        ))}
      </div>
    );
  } else {
    return (
      <div className="py-10 flex flex-col gap-7 place-items-center">
        <h1 className="text-2xl">Your Favorites</h1>
        You don't have any favorited articles. Try adding some! 👆
      </div>
    );
  }
}
