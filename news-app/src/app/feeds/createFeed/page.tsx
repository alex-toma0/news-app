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
    <div className="flex flex-col">
      <h1>Create your feed</h1>
      <form action={createFeed} className="flex flex-col gap-3">
        <Input type="text" name="feedName" placeholder="Your feed's name" />
        <Select
          label="Choose your categories"
          placeholder="Select a category"
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
          label="Choose your language"
          placeholder="Select a language"
          selectionMode="single"
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
        <Button type="submit">Create feed</Button>
      </form>
    </div>
  );
}
