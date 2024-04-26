import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
export default function ArticleCard({
  source,
  title,
  uploadTime,
  author,
  image,
}: {
  source: string;
  title: string;
  uploadTime: string;
  author: string;
  image: string;
}) {
  return (
    <Card className="py-4">
      <CardHeader className="flex-col items-start">
        <small>{source}</small>
        <h1>{title}</h1>
        <small>{uploadTime} ago</small>
      </CardHeader>
      <CardBody>
        <Image
          alt="Article Image"
          src="https://pixsector.com/cache/517d8be6/av5c8336583e291842624.png"
          width={270}
        ></Image>
      </CardBody>
    </Card>
  );
}
