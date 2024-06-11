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

export async function editFeed(formData: FormData) {
  const newName = formData.get("feedName") as string;
  const oldName = formData.get("originalName") as string;
  const feedCategories = formData.get("feedCategories") as string;
  const oldCategories = formData.get("originalCategories") as string;
  const oldLanguages = formData.get("originalLanguages") as string;
  const languages = formData.get("feedLanguages") as string;
  const oldSources = formData.get("originalSources") as string;
  const sources = formData.get("feedSources") as string;
  const userId = formData.get("userId") as string;

  const updateFeed = await prisma.userFeeds.update({
    data: {
      feedName: newName.length > 0 ? newName : oldName,
      categories: feedCategories.length > 0 ? feedCategories : oldCategories,
      languages: languages.length > 0 ? languages : oldLanguages,
      sources: sources.length > 0 ? sources : oldSources,
    },
    where: {
      userId_feedName: {
        userId: userId,
        feedName: oldName,
      },
    },
  });
  redirect(`/admin/userList/${userId}`);
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
  category: string,
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
      category: category,
    },
  });
  return favorite;
};

export const editFavorite = async (formData: FormData) => {
  const userId = formData.get("userId") as string;
  const oldSource = formData.get("originalSource") as string;
  const oldTitle = formData.get("originalTitle") as string;
  const oldURL = formData.get("originalUrl") as string;
  const oldImage = formData.get("originalImage") as string;
  const oldDateString = formData.get("originalDate") as string;
  const newSource = formData.get("source") as string;
  const newTitle = formData.get("title") as string;
  const newURL = formData.get("url") as string;
  const newImage = formData.get("image") as string;
  const newDateString = formData.get("date") as string;
  const oldCategory = formData.get("originalCategory") as string;
  const newCategory = formData.get("category") as string;

  const updateFavorite = await prisma.userFavorites.update({
    data: {
      source: newSource.length > 0 ? newSource : oldSource,
      title: newTitle.length > 0 ? newTitle : oldTitle,
      url: newURL.length > 0 ? newURL : oldURL,
      image: newImage.length > 0 ? newImage : oldImage,
      uploadDate:
        newDateString.length > 0
          ? new Date(newDateString)
          : new Date(oldDateString),
      category: newCategory.length > 0 ? newCategory : oldCategory,
    },
    where: {
      userId_url: {
        userId: userId,
        url: oldURL,
      },
    },
  });
  redirect(`/admin/userList/${userId}`);
};
export const deleteFavorite = async (userId: string, url: string) => {
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

export const getArticleCategories = async () => {
  const articleCategories = await prisma.userFavorites.groupBy({
    by: ["category"],
    _count: {
      category: true,
    },
  });
  return articleCategories.map((article) => ({
    category: article.category,
    count: article._count.category,
  }));
};
