"use client";
import { Select, SelectItem, DateRangePicker, Button } from "@nextui-org/react";
import { useRouter, usePathname } from "next/navigation";
import { parseDate, today, getLocalTimeZone } from "@internationalized/date";
import { useState } from "react";
export default function Filters() {
  const pathname = usePathname();
  const router = useRouter();
  const handleFilter = () => {
    let urlParams = `/?startDate=${range.start.toString()}&endDate=${range.end.toString()}`;
    if (sort.length > 0) {
      urlParams += `&sort=${sort}`;
    }

    router.replace(pathname + urlParams);
  };
  const [sort, setSort] = useState("popularity");
  const [language, setLanguage] = useState("en");
  const [range, setRange] = useState({
    start: today(getLocalTimeZone()).set({ day: 1 }),
    end: today(getLocalTimeZone()),
  });
  return (
    <div className="flex flex-row gap-5">
      <Select
        label="Sort by"
        placeholder="Popularity"
        selectionMode="single"
        selectedKeys={[sort]}
        onChange={(e) => setSort(e.target.value)}
        className="min-w-48"
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
      <DateRangePicker
        label="Date range"
        value={range}
        onChange={setRange}
        className="max-w-md"
      />
      <Button onClick={handleFilter}>Filter</Button>
    </div>
  );
}
