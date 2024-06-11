import prisma from "@/app/utils/prisma";
import { clerkClient } from "@clerk/nextjs/server";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { editFavorite, editFeed, getArticleCategories } from "@/app/actions";
import DeleteFeed from "@/app/components/DeleteFeed";
import DeleteFavorite from "@/app/components/DeleteFavorite";
import Statistics from "@/app/components/Statistics";
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
  const articleCategories = await getArticleCategories();
  console.log(articleCategories);
  let feedList, favoriteList;
  if (feeds.length === 0) feedList = <>User has no feeds</>;
  else {
    feedList = (
      <div className="max-w-lg table">
        <div className="table-row border-b-2">
          <div className="table-cell text-left">Name</div>
          <div className="table-cell text-left">Categories</div>
          <div className="table-cell text-left">Language</div>
          <div className="table-cell text-left">Sources</div>
        </div>
        {feeds.map((feed, index) => {
          return (
            <div
              key={feed.feedName + feed.categories}
              className="table-row even:bg-gray-600"
            >
              <form action={editFeed} className="contents">
                <input type="hidden" name="userId" value={params.userId} />
                <input
                  type="hidden"
                  name="originalName"
                  value={feed.feedName}
                />
                <input
                  type="hidden"
                  name="originalCategories"
                  value={feed.categories || ""}
                />
                <input
                  type="hidden"
                  name="originalLanguages"
                  value={feed.languages || ""}
                />
                <input
                  type="hidden"
                  name="originalSources"
                  value={feed.sources || ""}
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
                <div className="table-cell">
                  <Button type="submit" variant="flat">
                    Edit
                  </Button>
                </div>
                <div className="table-cell">
                  <DeleteFeed userId={params.userId} feedName={feed.feedName} />
                </div>
              </form>
            </div>
          );
        })}
      </div>
    );
  }
  if (favorites.length === 0) favoriteList = <>User has no favorites</>;
  else {
    favoriteList = (
      <div className="table max-w-lg">
        <div className="table-row border-b-2">
          <div className="table-cell px-3">Source</div>
          <div className="table-cell px-3">Title</div>
          <div className="table-cell px-3">URL</div>
          <div className="table-cell px-3">Image</div>
          <div className="table-cell px-3">Category</div>
          <div className="table-cell px-3">Upload Date</div>
        </div>

        {favorites.map((favorite) => (
          <div
            className="table-row even:bg-gray-600"
            key={favorite.userId + favorite.url}
          >
            <form action={editFavorite} className="contents">
              <input type="hidden" name="userId" value={params.userId} />

              <input
                type="hidden"
                name="originalSource"
                value={favorite.source}
              />
              <input
                type="hidden"
                name="originalTitle"
                value={favorite.title}
              />
              <input type="hidden" name="originalUrl" value={favorite.url} />
              <input
                type="hidden"
                name="originalImage"
                value={favorite.image || ""}
              />
              <input
                type="hidden"
                name="originalDate"
                value={favorite.uploadDate.toISOString()}
              />
              <input
                type="hidden"
                name="originalCategory"
                value={favorite.category}
              />
              <div className="table-cell p-3">
                {
                  <input
                    placeholder={favorite.source}
                    title={favorite.source}
                    type="text"
                    name="source"
                    className="bg-inherit w-40"
                  />
                }
              </div>
              <div className="table-cell p-3 max-w-20 whitespace-nowrap overflow-hidden overflow-ellipsis">
                {
                  <input
                    placeholder={favorite.title}
                    title={favorite.title}
                    type="text"
                    name="title"
                    className="bg-inherit w-40"
                  />
                }
              </div>
              <div className="table-cell p-3 max-w-20 whitespace-nowrap overflow-hidden overflow-ellipsis">
                {
                  <input
                    placeholder={favorite.url}
                    title={favorite.url}
                    type="text"
                    name="url"
                    className="bg-inherit w-40"
                  />
                }
              </div>
              <div className="table-cell p-3 max-w-20 whitespace-nowrap overflow-hidden overflow-ellipsis">
                {
                  <input
                    placeholder={favorite.image as string}
                    title={favorite.image as string}
                    type="text"
                    name="image"
                    className="bg-inherit w-40"
                  />
                }
              </div>
              <div className="table-cell p-3">
                {
                  <input
                    placeholder={favorite.category}
                    title={favorite.category}
                    type="text"
                    name="category"
                    className="bg-inherit w-40"
                  />
                }
              </div>
              <div className="table-cell p-3">
                {
                  <input
                    placeholder={favorite.uploadDate.toISOString()}
                    title={favorite.uploadDate.toISOString()}
                    type="text"
                    name="date"
                    className="bg-inherit w-40"
                  />
                }
              </div>
              <div className="pl-5 table-cell">
                <Button type="submit" variant="flat" color="warning">
                  Edit
                </Button>
              </div>
              <div className="table-cell">
                <DeleteFavorite userId={params.userId} url={favorite.url} />
              </div>
            </form>
          </div>
        ))}
      </div>
    );
  }
  const user = await clerkClient.users.getUser(params.userId);

  return (
    <div className="py-10 pl-12 flex flex-col place-items-center gap-7">
      <h1>User {user.id} </h1>
      <h1 className="text-xl font-semibold">Feeds</h1>
      {feedList}
      <h1 className="text-xl font-semibold">Favorites</h1>
      {favoriteList}
    </div>
  );
}
