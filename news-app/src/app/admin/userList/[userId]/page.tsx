import prisma from "@/app/utils/prisma";
import { clerkClient } from "@clerk/nextjs/server";
import Link from "next/link";
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
  let feedList;
  if (feeds.length === 0) feedList = <>User has no feeds</>;
  else {
    feedList = (
      <div className="max-w-lg table">
        <div className="table-row border-b-2">
          <div className="table-cell py-2 px-2 text-left">Name</div>
          <div className="table-cell py-2 px-2 text-left">Categories</div>
          <div className="table-cell py-2 px-2 text-left">Language</div>
          <div className="table-cell py-2 px-2 text-left">Sources</div>
        </div>
        {feeds.map((feed) => {
          return (
            <div
              key={feed.feedName + feed.categories}
              className="table-row even:bg-gray-600"
            >
              <div className="table-cell py-1 px-2">{feed.feedName}</div>
              <div className="table-cell">{feed.categories}</div>
              <div className="table-cell">{feed.languages}</div>
              <div className="table-cell">{feed.sources}</div>
            </div>
          );
        })}
      </div>
    );
  }
  const user = await clerkClient.users.getUser(params.userId);

  return (
    <div className="py-10 pl-12 flex flex-col place-items-center gap-7">
      <h1>User {user.id} </h1>
      <p>Feeds</p>
      {feedList}
    </div>
  );
}
