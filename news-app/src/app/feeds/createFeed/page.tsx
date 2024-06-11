"use client";
import { createFeed } from "@/app/actions";
import { Input, Select, SelectItem, Button } from "@nextui-org/react";
const categories = [
  "general",
  "business",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
];
const languageObj: any = {
  Arabic: "ar",
  German: "de",
  English: "en",
  Spanish: "es",
};
const languages = Object.keys(languageObj);
export default function Page() {
  return (
    <div className="flex flex-col place-items-center gap-5 pt-10">
      <h1>Create your feed</h1>
      <form action={createFeed} className="flex flex-col gap-3">
        <Input
          label="Name"
          type="text"
          name="feedName"
          placeholder="Your feed's name"
          isRequired
        />
        <Select
          label="Choose the categories"
          placeholder="Select the categories"
          selectionMode="multiple"
          name="feedCategory"
        >
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </Select>
        <Select
          label="Choose the languages"
          placeholder="Select the languages"
          selectionMode="multiple"
          name="languages"
        >
          {languages.map((language) => (
            <SelectItem
              key={languageObj[language]}
              value={languageObj[language]}
            >
              {language}
            </SelectItem>
          ))}
        </Select>
        <Input
          type="text"
          name="sources"
          label="Choose the news sources"
          placeholder="source1,source2,..."
          pattern="^([a-zA-Z0-9]+,)*[a-zA-Z0-9]+$"
        />
        <Button type="submit">Create feed</Button>
      </form>
    </div>
  );
}
