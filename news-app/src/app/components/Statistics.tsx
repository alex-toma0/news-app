"use client";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  RadialLinearScale,
  LinearScale,
  CategoryScale,
  BarElement,
  Title,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";

ChartJS.defaults.color = "#FFFFFF";
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Statistics({
  articleCategories,
  articleSources,
}: {
  articleCategories: {
    category: string;
    count: number;
  }[];
  articleSources: {
    source: string;
    count: number;
  }[];
}) {
  const categoryLabels = articleCategories.map(
    (articleCategory) => articleCategory.category
  );
  const categoryCounts = articleCategories.map(
    (articleCategory) => articleCategory.count
  );

  const sourceLabels = articleSources.map(
    (articleSource) => articleSource.source
  );
  const sourceCounts = articleSources.map(
    (articleSource) => articleSource.count
  );
  const pieColors = [
    "#414f6e",
    "#3f4d1e",
    "#2d214c",
    "#295834",
    "#633c66",
    "#213b23",
    "#73363c",
    "#345751",
    "#421827",
    "#1d270d",
    "#674220",
    "#272a3c",
    "#3d2815",
    "#163233",
    "#59483c",
  ];
  const barColors = [
    "#6f432d",
    "#462f5e",
    "#355a36",
    "#541c20",
    "#173a18",
    "#723e52",
    "#172412",
    "#414f6f",
    "#514c27",
    "#391f33",
    "#2d5653",
    "#382818",
    "#1d3140",
    "#2f391f",
    "#192f2b",
  ];
  const options = {
    indexAxis: "y" as const,
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "News sources",
        color: "white",
      },
      legend: {
        labels: {
          color: "white",
        },
      },
    },
  };
  const barData = {
    labels: sourceLabels,
    datasets: [
      {
        label: "# of Sources",
        data: sourceCounts,
        backgroundColor: barColors.slice(0, sourceLabels.length),
        borderWidth: 1,
      },
    ],
  };
  const pieData = {
    labels: categoryLabels,
    datasets: [
      {
        label: "# of Articles",
        data: categoryCounts,
        backgroundColor: pieColors.slice(0, categoryLabels.length),
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="flex flex-col place-items-center">
      <div className="h-96 w-96">
        <Pie
          data={pieData}
          options={{
            plugins: {
              title: {
                display: true,
                text: "Categories",
              },
            },
            maintainAspectRatio: false,
          }}
        />
      </div>
      <div className="h-96 w-96 my-10">
        <Bar data={barData} options={options} />
      </div>
    </div>
  );
}
