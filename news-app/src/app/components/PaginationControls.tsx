"use client";

import { FC } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@nextui-org/react";
interface PaginationControlsProps {
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

const PaginationControls: FC<PaginationControlsProps> = ({
  hasNextPage,
  hasPrevPage,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get("page") ?? "1";
  const limit = searchParams.get("limit") ?? "10";

  return (
    <div className="flex gap-2">
      <Button
        isDisabled={hasPrevPage}
        radius="full"
        onClick={() => {
          router.push(`/?page=${Number(page) - 1}&limit=${limit}`);
        }}
      >
        Previous
      </Button>

      <p className="pt-2">{`Page ${page}`}</p>

      <Button
        radius="full"
        isDisabled={!hasNextPage}
        onClick={() => {
          router.push(`/?page=${Number(page) + 1}&limit=${limit}`);
        }}
      >
        Next
      </Button>
    </div>
  );
};

export default PaginationControls;
