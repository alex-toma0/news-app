"use client";
import { getArticleCategories } from "../actions";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function assignColors(itemList: any) {
  // Output array of colors
  let colorList: string[] = [];

  const generateColor = () => {
    return (
      "rgba(" +
      Math.floor(Math.random() * 256) +
      "," + // Red
      Math.floor(Math.random() * 256) +
      "," + // Green
      Math.floor(Math.random() * 256) +
      "," + // Blue
      Math.random().toFixed(1) +
      ")" // Alpha
    );
  };
  // Assign colors to each item
  for (let i = 0; i < itemList.length; i++) {
    // Generate random RGBA color
    let color = generateColor();
    while (colorList.includes(color)) {
      color = generateColor();
    }
    colorList.push(color);
  }

  return colorList;
}
export default function Statistics({
  articleCategories,
}: {
  articleCategories: {
    category: string;
    count: number;
  }[];
}) {
  const labels = articleCategories.map(
    (articleCategory) => articleCategory.category
  );
  const counts = articleCategories.map(
    (articleCategory) => articleCategory.count
  );
  const colors = assignColors(labels);
  const data = {
    labels: labels,
    datasets: [
      {
        label: "# of Articles",
        data: counts,
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="flex flex-col">
      <h1 className="text-lg text-center">Category chart</h1>
      <Pie className="mt-5" data={data} />
    </div>
  );
}
