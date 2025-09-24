import { useEffect, useState } from "react";
import {
  ChartContainer,
  type ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "./ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Dice } from "../lib/dice";

const chartConfig = {
  count: {
    label: "number",
    color: "#2563eb",
  },
} satisfies ChartConfig;

const MAX_NUMBER = 6;
const MIN_NUMBER = 1;
const LOOP_MAX = 1000;

type Data = {
  number: number;
  count: number;
};

export default function Histogram() {
  const [data, setData] = useState<Data[]>([]);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const generatedChartData = new Dice(
      MAX_NUMBER,
      MIN_NUMBER,
      LOOP_MAX
    ).roll();
    const newData: Data[] = [];
    console.log(generatedChartData)
    for (let i = 0; i < generatedChartData.length; i++) {
      const found = newData.find((f) => f.number === generatedChartData[i]);
      if (!found) {
        newData.push({
          number: generatedChartData[i],
          count: 1,
        });
      } else {
        found.count++;
      }
    }

    // Sort the data by number in ascending order
    newData.sort((a, b) => a.number - b.number);

    setData(newData);
    console.log(data)
    setTimeout(() => {
      setLoading(false);
    }, 250);
  }, []);

  return (
    <div className="flex flex-col mt-[4rem]">
      <h1 className="text-center mb-[1rem]">
        Histogram of Expected Probability Of <span className="text-orange-500">1000</span>
      </h1>
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart accessibilityLayer data={data}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="number"
            tickLine={false}
            tickMargin={10}
            axisLine={true}
            // tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis
            dataKey="count"
            tickLine={false}
            tickMargin={10}
            axisLine={true}
            // tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="count" fill="var(--chart-3)" radius={4} />
        </BarChart>
      </ChartContainer>

      {data && !loading ? (
        <h1 className="text-center mt-4">
          <span className="opacity-30">Largest occurrence: </span>{" "}
          {data.length > 0
            ? data.reduce((max, current) =>
                current.count > max.count ? current : max
              ).number
            : 0}{" "}
          appeared {data.length > 0 ? Math.max(...data.map((d) => d.count)) : 0}{" "}
          times (
          {data.length > 0
            ? (
                (Math.max(...data.map((d) => d.count)) / LOOP_MAX) *
                100
              ).toFixed(2)
            : "0.00"}
          %)
        </h1>
      ) : (
        <></>
      )}
    </div>
  );
}
