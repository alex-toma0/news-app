"use client";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/app/utils/prisma";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";
import { deleteFeed, editFeedName, getFeed } from "@/app/actions";
import { useRouter } from "next/navigation";
import { Divider } from "@nextui-org/react";
export default function FeedBar({
  feedName,
  userId,
}: {
  feedName: string;
  userId: string;
}) {
  const router = useRouter();
  async function handleDeleteClient() {
    const deleteConfirm = confirm("Are you sure you want to delete the feed?");
    if (deleteConfirm) {
      const deletedFeed = await deleteFeed(feedName, userId);
      if (!deletedFeed) {
        alert("The feed couldn't be deleted!");
        router.push("/feeds");
      }
      alert("The feed was successfully deleted");
      router.push("/feeds");
      router.refresh();
    }
  }
  async function handleEditFeedName() {
    let newName = prompt("Enter the feed's new name");
    if (newName != null) {
      console.log(newName);
      const editedFeed = await editFeedName(feedName, userId, newName);
      if (!editedFeed) {
        alert("Invalid feed name.");
        router.refresh();
      }
      alert("Your feed has been renamed!");
      router.push("/feeds");
    }
  }
  return (
    <>
      <div className="flex flex-col gap-2 place-items-center flex-wrap w-full">
        <h1 className="text-2xl">{decodeURIComponent(feedName)}</h1>
        <Divider className="w-full" />

        <div className="flex flex-row gap-2 flex-wrap">
          <button title="Delete" onClick={() => handleDeleteClient()}>
            <Image
              alt="delete-button"
              src="/delete.svg"
              width={30}
              height={30}
            />
          </button>
          <button title="Edit Name" onClick={() => handleEditFeedName()}>
            <Image alt="edit-button" src="/edit.svg" width={25} height={25} />
          </button>
        </div>
      </div>
    </>
  );
}
