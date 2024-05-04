import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
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
const uploadDate = new Date(uploadTime);
const day = uploadDate.getDay();
const month = uploadDate.getMonth() + 1;
const year = uploadDate.getFullYear()

  return (
    <Card className="py-2 my-4">
      <CardHeader className="flex-col items-start flex-wrap">
        <small>{source}</small>
        <a href={url} className="h-2 font-extrabold pb-6">{title}</a>
      </CardHeader>
      <CardBody className="flex-col">
        <small>{`${year}-${month}-${day}`}</small>
        {image &&
        <Image
        alt="Article Image"
        src={image}
        width={270}
      ></Image>
       }
        
      </CardBody>
    </Card>
  );
}
