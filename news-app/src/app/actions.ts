"use server";
import { auth } from "@clerk/nextjs/server";
import prisma from "./utils/prisma";
import { redirect } from "next/navigation";
export async function createFeed(formData: FormData) {
  const name = formData.get("feedName") as string;
  const feedCategories = formData.getAll("feedCategory");
  const languages = formData.getAll("languages");
  const sources = formData.getAll("sources");
  const { userId } = auth();
  if (!userId) {
    return { msg: "user is not authenticated!" };
  }
  const feed = await prisma.userFeeds.create({
    data: {
      userId: userId,
      feedName: name,
      categories: feedCategories.length > 0 ? feedCategories.toString() : null,
      languages: languages.length > 0 ? languages.toString() : null,
      sources: sources.length > 0 ? sources.toString() : null,
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
      userId_feedName: {
        userId: userId,
        feedName: decodeURIComponent(feedName),
      },
    },
  });
  return feed;
};
export const deleteFeed = async (feedName: string, userId: string) => {
  const deleteFeed = await prisma.userFeeds.delete({
    where: {
      userId_feedName: {
        userId: userId,
        feedName: decodeURIComponent(feedName),
      },
    },
  });
  return deleteFeed;
};

export const editFeedName = async (
  feedName: string,
  userId: string,
  newName: string
) => {
  const editedFeed = await prisma.userFeeds.update({
    where: {
      userId_feedName: {
        userId: userId,
        feedName: feedName,
      },
    },
    data: {
      feedName: newName,
    },
  });
  return editedFeed;
};
export const getFavorites = async () => {
  const { userId } = auth();
  if (!userId) {
    return;
  }
  const favorites = await prisma.userFavorites.findMany({
    where: {
      userId: userId,
    },
  });
  return favorites;
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
      userId: userId,
      title: title,
      source: source,
      url: url,
      image: image,
      uploadDate: uploadDate,
    },
  });
  return favorite;
};

export const unfavorite = async (url: string) => {
  const { userId } = auth();
  if (!userId) {
    return;
  }
  const deleteFavorite = await prisma.userFavorites.delete({
    where: {
      userId_url: {
        userId: userId,
        url: url,
      },
    },
  });
  return deleteFavorite;
};

export const isFavorite = async (url: string) => {
  const { userId } = auth();
  if (!userId) {
    return;
  }
  const favorite = await prisma.userFavorites.findUnique({
    where: {
      userId_url: {
        userId: userId,
        url: url,
      },
    },
  });
  if (!favorite) return false;
  return true;
};
