"use client";
import { Button } from "@nextui-org/react";
import { deleteFeed } from "../actions";
import { useRouter } from "next/navigation";
export default function DeleteFeed({
  userId,
  feedName,
}: {
  userId: string;
  feedName: string;
}) {
  const router = useRouter();
  return (
    <>
      <Button
        variant="flat"
        color="danger"
        onClick={() => {
          deleteFeed(feedName, userId);
          router.push(`/admin/dashboard/${userId}`);
        }}
      >
        Delete
      </Button>
    </>
  );
}
