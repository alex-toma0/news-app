"use server";
import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
export async function createFeed(formData: FormData) {
  const name = formData.get("feedName") as string;
  const feedCategories = formData.getAll("feedCategory");
  const { userId } = auth();
  if (!userId) {
    return { msg: "user is not authenticated!" };
  }
  const prisma = new PrismaClient();
  const feed = await prisma.userFeeds.create({
    data: {
      user_id: userId,
      feed_name: name,
      categories: feedCategories.toString(),
    },
  });
  return { feed: feed };
}
