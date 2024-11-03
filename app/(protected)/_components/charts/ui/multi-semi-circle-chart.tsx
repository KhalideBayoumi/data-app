"use client"

import { RadialBar, RadialBarChart } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface ChartData {
  asset: string;
  years: number;
  fill: string;
}

interface MultiSemiCircleChartProps {
  data: ChartData[];
  config: ChartConfig;
}

const CustomLegend = ({ data }: { data: ChartData[] }) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-8 mt-4">
      {data.map((entry, index) => (
        <div key={`item-${index}`} className="flex items-center gap-2">
          <div 
            className="w-3 h-3 rounded-sm"
            style={{ backgroundColor: entry.fill }}
          />
          <span className="text-sm">{entry.asset}</span>
        </div>
      ))}
    </div>
  );
};

const MultiSemiCircleChart = ({ data, config }: MultiSemiCircleChartProps) => {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-[400px]">
        <ChartContainer config={config}>
          <RadialBarChart 
            data={data} 
            innerRadius={30} 
            outerRadius={110}
            width={400}
            height={400}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey="asset" />}
            />
            <RadialBar dataKey="years" background />
          </RadialBarChart>
        </ChartContainer>
      </div>
      <CustomLegend data={data} />
    </div>
  )
}

export default MultiSemiCircleChart