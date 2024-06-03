import Link from "next/link";
import { Divider, Button } from "@nextui-org/react";
import { auth } from "@clerk/nextjs/server";
import prisma from "../utils/prisma";
import Image from "next/image";
const getUserFeeds = async () => {
  const { userId } = auth();
  if (!userId) {
    return null;
  }
  const feeds = await prisma.userFeeds.findMany({
    where: {
      userId: userId,
    },
  });
  return feeds;
};
export default async function Page() {
  const feeds = await getUserFeeds();

  let feedList = <></>;
  if (!feeds || feeds.length === 0) {
    feedList = <p>You have no custom feeds, start by creating one!</p>;
  } else {
    feedList = (
      <div className="max-w-lg table">
        <div className="table-row border-b-2">
          <div className="table-cell py-2 px-2 text-left">Name</div>
          <div className="table-cell py-2 px-2 text-left">Categories</div>
          <div className="table-cell py-2 px-2 text-left">Language</div>
          <div className="table-cell py-2 px-2 text-left">Sources</div>
        </div>
        {feeds.map((feed) => {
          let redirectURL = `/feeds/${feed.feedName}/`;
          if (feed.categories) redirectURL += `${feed.categories}/`;
          else redirectURL += "/all";
          if (feed.languages) redirectURL += `${feed.languages}/`;
          else redirectURL += "/all";
          if (feed.sources) redirectURL += `${feed.sources}/`;
          else redirectURL += "/all";

          return (
            <div
              key={feed.feedName + feed.categories}
              className="table-row even:bg-gray-600"
            >
              <Link href={redirectURL}>
                <div className="table-cell py-1 px-2">{feed.feedName}</div>
              </Link>
              <div className="table-cell">{feed.categories}</div>
              <div className="table-cell">{feed.languages}</div>
              <div className="table-cell">{feed.sources}</div>
            </div>
          );
        })}
      </div>
    );
  }
  return (
    <div className="py-10 pl-12 flex flex-col place-items-center gap-7 ">
      <h1 className="text-3xl font-bold">Your Feeds</h1>
      <small className="font-extralight">View or Create a custom feed</small>
      <Divider />
      <Link href="/feeds/createFeed">
        <Button className="self-start">Create feed</Button>
      </Link>
      {feedList}
    </div>
  );
}
