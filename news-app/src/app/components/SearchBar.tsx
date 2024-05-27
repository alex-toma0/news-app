"use client";
import { Input } from "@nextui-org/react";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const handleSearch = () => {
    router.push(`/search/${search}`);
  };
  return (
    <Input
      type="text"
      label="Search"
      placeholder="Enter some keywords..."
      startContent={
        <Image src="/search.svg" alt="search-icon" height={20} width={20} />
      }
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleSearch();
        }
      }}
    />
  );
}
