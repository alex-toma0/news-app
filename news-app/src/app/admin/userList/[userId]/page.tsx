import prisma from "@/app/utils/prisma";
import { clerkClient } from "@clerk/nextjs/server";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { editFeed } from "@/app/actions";
export default async function Page({
  params,
}: {
  params: {
    userId: string;
  };
}) {
  console.log(params.userId);
  const feeds = await prisma.userFeeds.findMany({
    where: {
      userId: params.userId,
    },
  });
  const favorites = await prisma.userFavorites.findMany({
    where: {
      userId: params.userId,
    },
  });
  let feedList, favoriteList;
  if (feeds.length === 0) feedList = <>User has no feeds</>;
  else {
    feedList = (
      <form action={editFeed}>
        <input type="hidden" name="userId" value={params.userId} />

        <div className="max-w-lg table">
          <div className="table-row border-b-2">
            <div className="table-cell text-left">Name</div>
            <div className="table-cell text-left">Categories</div>
            <div className="table-cell text-left">Language</div>
            <div className="table-cell text-left">Sources</div>
          </div>
          {feeds.map((feed) => {
            return (
              <div
                key={feed.feedName + feed.categories}
                className="table-row even:bg-gray-600"
              >
                <input
                  type="hidden"
                  name="originalName"
                  value={feed.feedName}
                />
                <div className="table-cell">
                  {
                    <input
                      placeholder={feed.feedName}
                      type="text"
                      name="feedName"
                      className="bg-inherit w-40"
                    />
                  }
                </div>
                <div className="table-cell">
                  {
                    <input
                      placeholder={feed.categories as string}
                      type="text"
                      name="feedCategories"
                      className="bg-inherit w-40"
                    />
                  }
                </div>
                <div className="table-cell">
                  {
                    <input
                      placeholder={feed.languages as string}
                      type="text"
                      name="feedLanguages"
                      className="bg-inherit w-40"
                    />
                  }
                </div>
                <div className="table-cell">
                  {
                    <input
                      placeholder={feed.sources as string}
                      type="text"
                      name="feedSources"
                      className="bg-inherit w-40"
                    />
                  }
                </div>
              </div>
            );
          })}
        </div>
        <Button type="submit" variant="flat">
          Edit
        </Button>
      </form>
    );
  }
  if (favorites.length === 0) favoriteList = <>User has no favorites</>;
  else {
    favoriteList = (
      <div className="max-w-lg table">
        <div className="table-row border-b-2">
          <div className="table-cell text-left">Source</div>
          <div className="table-cell text-left">Title</div>
          <div className="table-cell text-left">URL</div>
          <div className="table-cell text-left">Image</div>
          <div className="table-cell text-left">Upload Date</div>
        </div>
        {favorites.map((favorite) => (
          <div
            className="table-row even:bg-gray-600"
            key={favorite.userId + favorite.url}
          >
            <div className="table-cell">{favorite.source}</div>
            <div className="table-cell">{favorite.title}</div>
            <div className="table-cell">{favorite.url}</div>
            <div className="table-cell">{favorite.image}</div>
            <div className="table-cell">
              {favorite.uploadDate.toISOString()}
            </div>
          </div>
        ))}
      </div>
    );
  }
  const user = await clerkClient.users.getUser(params.userId);

  return (
    <div className="py-10 pl-12 flex flex-col place-items-center gap-7">
      <h1>User {user.id} </h1>
      <p>Feeds:</p>
      {feedList}
      <p>Favorites:</p>
      {favoriteList}
    </div>
  );
}
