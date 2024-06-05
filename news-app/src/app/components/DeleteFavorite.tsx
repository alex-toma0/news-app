"use client";
import { Button } from "@nextui-org/react";
import { deleteFavorite } from "../actions";
import { useRouter } from "next/navigation";
export default function DeleteFavorite({
  userId,
  url,
}: {
  userId: string;
  url: string;
}) {
  const router = useRouter();
  return (
    <>
      <Button
        variant="flat"
        color="danger"
        onClick={() => {
          deleteFavorite(userId, url);
          router.push(`/admin/userList/${userId}`);
        }}
      >
        Delete
      </Button>
    </>
  );
}
