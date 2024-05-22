"use server";
import { auth } from "@clerk/nextjs/server";
import prisma from "./utils/prisma";
import { redirect } from "next/navigation";
export async function createFeed(formData: FormData) {
  const name = formData.get("feedName") as string;
  const feedCategories = formData.getAll("feedCategory");
  const languages = formData.getAll("languages");
  const { userId } = auth();
  if (!userId) {
    return { msg: "user is not authenticated!" };
  }
  const feed = await prisma.userFeeds.create({
    data: {
      user_id: userId,
      feed_name: name,
      categories: feedCategories.toString(),
      languages: languages.toString(),
    },
  });
  redirect("/feeds");
}

export const getFeed = async (feedName: string) => {
  const { userId } = auth();
  if (!userId) {
    return;
  }
  const feed = await prisma.userFeeds.findUnique({
    where: {
      user_id_feed_name: {
        user_id: userId,
        feed_name: decodeURIComponent(feedName),
      },
    },
  });
  return feed;
};
export const handleDelete = async (feedName: string, userId: string) => {
  const deleteFeed = await prisma.userFeeds.delete({
    where: {
      user_id_feed_name: {
        user_id: userId,
        feed_name: decodeURIComponent(feedName),
      },
    },
  });
  return deleteFeed;
};

export const uploadFavorite = async (
  title: string,
  source: string,
  url: string,
  image: string,
  uploadDate: Date
) => {
  const { userId } = auth();
  if (!userId) {
    return;
  }
  const favorite = await prisma.userFavorites.create({
    data: {
      user_id: userId,
      title: title,
      source: source,
      url: url,
      image: image,
      uploadDate: uploadDate,
    },
  });
  return favorite;
};
