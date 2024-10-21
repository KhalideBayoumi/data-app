import React from 'react';
import { PolarAngleAxis, PolarGrid, Radar, RadarChart, Text } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type DataPoint = {
  metric: string;
  value: number;
};

interface RadarChartProps {
  data: DataPoint[];
  color: string;
}

// Custom tick component to handle long labels
const CustomTick = ({ payload, x, y, textAnchor, stroke }: any) => {
  const { value } = payload;
  const words = value.split(' ');
  const lineHeight = 12;
  const maxWordsPerLine = 2;
  const lines: string[] = [];

  for (let i = 0; i < words.length; i += maxWordsPerLine) {
    lines.push(words.slice(i, i + maxWordsPerLine).join(' '));
  }

  return (
    <g>
      {lines.map((line, index) => (
        <Text
          key={index}
          x={x}
          y={y + index * lineHeight}
          textAnchor={textAnchor}
          stroke={stroke}
          fontSize={10}
        >
          {line}
        </Text>
      ))}
    </g>
  );
};

const RadarDotsChart = ({ data, color } : RadarChartProps) => {
  const chartConfig = {
    value: {
      label: "Value",
      color: color,
    },
  } satisfies ChartConfig;

  const averageScore = Math.floor(data.reduce((sum, item) => sum + item.value, 0) / data.length);

  return (
    <div className="relative">
      <ChartContainer
        config={chartConfig}
        className="w-full aspect-square max-h-[200px]"
      >
        <RadarChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <PolarAngleAxis 
            dataKey="metric" 
            tick={<CustomTick />} 
            tickLine={false}
          />
          <PolarGrid />
          <Radar
            dataKey="value"
            fill={color}
            fillOpacity={0.6}
            dot={{
              r: 3,
              fillOpacity: 1,
            }}
          />
        </RadarChart>
      </ChartContainer>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="border bg-black opacity-70 border-border rounded-md p-1 shadow-md">
          <div className="text-xl font-bold text-center">{averageScore}</div>
        </div>
      </div>
    </div>
  );
};

export default RadarDotsChart;