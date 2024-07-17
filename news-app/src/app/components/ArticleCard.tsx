"use client";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { isFavorite, unfavorite, uploadFavorite } from "../actions";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function ArticleCard({
  source,
  title,
  uploadTime,
  image,
  url,
  favorite,
  isLoggedIn,
  category,
}: {
  source: string;
  title: string;
  uploadTime: string;
  image: string;
  url: string;
  favorite: boolean;
  isLoggedIn: boolean;
  category: string;
}) {
  let favSrc = "/favorite.svg";
  if (favorite) {
    favSrc = "/favorite-clicked.svg";
  }

  const router = useRouter();
  const handleFavorite = async (
    title: string,
    source: string,
    url: string,
    image: string,
    category: string,
    uploadDate: Date
  ) => {
    if (!favorite) {
      const uploaded = uploadFavorite(
        title,
        source,
        url,
        image,
        category,
        uploadDate
      );
      if (!uploaded) {
        alert("The article couldn't be favorited");
      } else {
        router.refresh();
      }
    } else {
      if (!unfavorite(url)) {
        alert("The article couldn't be unfavorited!");
      } else {
        router.refresh();
      }
    }
  };
  const uploadDate = new Date(uploadTime);
  const day = uploadDate.getDate();
  const month = uploadDate.getMonth() + 1;
  const year = uploadDate.getFullYear();

  return (
    <Card className="w-full max-w-lg flex flex-col items-start">
      <CardHeader className="flex flex-col items-start flex-wrap">
        <small>{source}</small>
        <a href={url} className="font-extrabold">
          {title}
        </a>
        <small>{category}</small>
      </CardHeader>
      <CardBody className="flex flex-col">
        <small className="pb-2">{`${year}-${month}-${day}`}</small>
        {image && <Image alt="Article Image" src={image} width="185rem" />}
      </CardBody>
      <button
        onClick={() =>
          handleFavorite(title, source, url, image, category, uploadDate)
        }
        title="Favorite"
      >
        {isLoggedIn && (
          <Image className="ml-3" src={favSrc} height={40} width={40}></Image>
        )}
      </button>
    </Card>
  );
}
