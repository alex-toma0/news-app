"use client";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { uploadFavorite } from "../actions";
import { useRouter } from "next/navigation";
export default function ArticleCard({
  source,
  title,
  uploadTime,
  author,
  image,
  url,
}: {
  source: string;
  title: string;
  uploadTime: string;
  author: string;
  image: string;
  url: string;
}) {
  const router = useRouter();
  const handleFavorite = async (
    title: string,
    source: string,
    url: string,
    image: string,
    uploadDate: Date
  ) => {
    const uploaded = uploadFavorite(title, source, url, image, uploadDate);
    if (!uploaded) {
      alert("Your feed couldn't be favorited");
    }
    alert("Your feed has been favorited!");
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
        <Image
          className="ml-3"
          src="/favorite.svg"
          height={40}
          width={40}
        ></Image>
      </button>
    </Card>
  );
}
