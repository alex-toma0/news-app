import Link from "next/link";
import { Divider, Button } from "@nextui-org/react";
import { auth } from "@clerk/nextjs/server";
import prisma from "../utils/prisma";
const getUserFeeds = async () => {
  const { userId } = auth();
  const feeds = await prisma.userFeeds.findMany({
    where: {
      user_id: userId,
    },
  });
  return feeds;
};
export default async function Page() {
  const feeds = await getUserFeeds();
  console.log(feeds);
  let feedList = <></>;
  if (feeds.length === 0) {
    feedList = <p>You have no custom feeds, start by creating one!</p>;
  } else {
    feedList = (
      <div className="flex flex-col py-5">
        {feeds.map((feed) => (
          <Link
            key={feed.feed_name + feed.categories}
            href={`/feeds/${feed.categories}`}
          >
            <p className="py-2">{feed.feed_name}</p>
          </Link>
        ))}
      </div>
    );
  }
  return (
    <div className="py-10 flex flex-col gap-3">
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
