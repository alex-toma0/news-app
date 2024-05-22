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
}: {
  source: string;
  title: string;
  uploadTime: string;
  image: string;
  url: string;
  favorite: boolean;
}) {
  let imgSrc = "/favorite.svg";
  if (favorite) {
    imgSrc = "/favorite-clicked.svg";
  }

  const router = useRouter();
  const handleFavorite = async (
    title: string,
    source: string,
    url: string,
    image: string,
    uploadDate: Date
  ) => {
    if (!favorite) {
      const uploaded = uploadFavorite(title, source, url, image, uploadDate);
      if (!uploaded) {
        alert("The article couldn't be favorited");
      } else {
        alert("The article has been favorited!");
        router.refresh();
      }
    } else {
      if (!unfavorite(url)) {
        alert("The article couldn't be unfavorited!");
      } else {
        alert("The article has been unfavorited!");
        router.refresh();
      }
    }
  };
  const uploadDate = new Date(uploadTime);
  const day = uploadDate.getDay();
  const month = uploadDate.getMonth() + 1;
  const year = uploadDate.getFullYear();

  return (
    <Card className="w-full max-w-lg flex flex-col items-start">
      <CardHeader className="flex flex-col items-start flex-wrap">
        <small>{source}</small>
        <a href={url} className="font-extrabold">
          {title}
        </a>
      </CardHeader>
      <CardBody className="flex flex-col">
        <small>{`${year}-${month}-${day}`}</small>
        {image && <Image alt="Article Image" src={image} width="185rem" />}
      </CardBody>
      <button
        onClick={() => handleFavorite(title, source, url, image, uploadDate)}
      >
        <Image className="ml-3" src={imgSrc} height={40} width={40}></Image>
      </button>
    </Card>
  );
}
