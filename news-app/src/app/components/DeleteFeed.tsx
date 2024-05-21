"use client";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/app/utils/prisma";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";
import { getFeed, handleDelete } from "@/app/actions";
export default async function DeleteFeed({
  feedName,
  userId,
}: {
  feedName: string;
  userId: string;
}) {
  return (
    <>
      <div className="flex flex-col gap-6 place-items-center">
        <h1 className="text-2xl">{decodeURIComponent(feedName)}</h1>

        <button onClick={() => handleDelete(feedName, userId)}>
          <Image alt="delete-button" src="/delete.svg" width={40} height={40} />
        </button>
      </div>
    </>
  );
}
