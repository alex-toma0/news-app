import Link from "next/link";
import { Divider, Button } from "@nextui-org/react";
const feeds = [];
export default function Page() {
  let feedList = <></>;
  if (feeds.length === 0) {
    feedList = <p>Your have no custom feeds, start by creating one!</p>;
  } else {
    feedList = <p>this is your feed list</p>;
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
