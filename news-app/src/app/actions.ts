"use server";
import { auth } from "@clerk/nextjs/server";
import prisma from "./utils/prisma";
import { redirect } from "next/navigation";
export async function createFeed(formData: FormData) {
  const name = formData.get("feedName") as string;
  const feedCategories = formData.getAll("feedCategory");
  const { userId } = auth();
  if (!userId) {
    return { msg: "user is not authenticated!" };
  }
  const feed = await prisma.userFeeds.create({
    data: {
      user_id: userId,
      feed_name: name,
      categories: feedCategories.toString(),
    },
  });
  if (!feed) {
    alert("Your feed couldn't be created!");
  }
  redirect("/feeds");
}
