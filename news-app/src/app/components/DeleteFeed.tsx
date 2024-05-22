"use client";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/app/utils/prisma";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";
import { getFeed, handleDelete } from "@/app/actions";
import { useRouter } from "next/navigation";
export default function DeleteFeed({
  feedName,
  userId,
}: {
  feedName: string;
  userId: string;
}) {
  const router = useRouter();
  async function handleDeleteClient(feedName: string, userId: string) {
    const deleteConfirm = confirm("Are you sure you want to delete the feed?");
    if (deleteConfirm) {
      const deleteFeed = await handleDelete(feedName, userId);
      if (!deleteFeed) {
        alert("The feed couldn't be deleted!");
        router.push("/feeds");
      }
      alert("The feed was successfully deleted");
      router.push("/feeds");
      router.refresh();
    }
  }
  return (
    <>
      <div className="flex flex-col gap-6 place-items-center">
        <h1 className="text-2xl">{decodeURIComponent(feedName)}</h1>

        <button onClick={() => handleDeleteClient(feedName, userId)}>
          <Image alt="delete-button" src="/delete.svg" width={40} height={40} />
        </button>
      </div>
    </>
  );
}
