"use client";
import { Select, SelectItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function Filters() {
  const router = useRouter();
  const handleSelectionChange = (e: any) => {
    router.replace(`/?sort=${e.target.value}`);
  };
  const [value, setValue] = useState("");
  return (
    <div className="min-w-44">
      <Select
        label="Sort by"
        placeholder="popularity"
        selectionMode="single"
        selectedKeys={value}
        onChange={handleSelectionChange}
      >
        <SelectItem key="published_asc" value="published_asc">
          Date Asc
        </SelectItem>
        <SelectItem key="published_desc" value="published_desc">
          Date Desc
        </SelectItem>
        <SelectItem key="popularity" value="popularity">
          Popularity
        </SelectItem>
      </Select>
    </div>
  );
}
