"use client"

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine, Text } from 'recharts';
import {
  ChartTooltip,
  ChartTooltipContent,
  ChartContainer,
} from "@/components/ui/chart";

type DataItem = {
  year: string | number;
  percentage?: string;
  [key: string]: string | number | undefined;
};

type StackedBarChartProps = {
  data: DataItem[];
  categories: { name: string; color: string }[];
  width?: number;
  height?: number;
  showReferenceLine?: boolean;
  showPercentage?: boolean;
};

const CustomLegend = ({ categories }: { categories: { name: string; color: string }[] }) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-8 mt-4">
      {categories.map((category, index) => (
        <div key={`item-${index}`} className="flex items-center gap-2">
          <div 
            className="w-3 h-3 rounded-sm"
            style={{ backgroundColor: category.color }}
          />
          <span className="text-sm">{category.name}</span>
        </div>
      ))}
    </div>
  );
};

const StackedBarChart = ({ 
  data, 
  categories, 
  width = 500, 
  height = 300, 
  showReferenceLine = false, 
  showPercentage = false 
}: StackedBarChartProps) => {
  const formatYAxis = (value: number): string => {
    return value.toString();
  };

  const chartConfig = Object.fromEntries(
    categories.map(cat => [cat.name, { label: cat.name, color: cat.color }])
  );

  const LabelComponent = (props: any) => {
    const { x, y, width, value } = props;
    if (!showPercentage || !value?.percentage) return null;
    return (
      <Text
        x={x + width / 2}
        y={y - 10}
        textAnchor="middle"
        fill="white"
        fontSize={12}
      >
        {value.percentage}
      </Text>
    );
  };

  return (
    <>
      <ChartContainer config={chartConfig}>
        <ResponsiveContainer width="100%" height={height}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="year"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis
              tickFormatter={formatYAxis}
              tickLine={false}
              axisLine={false}
              tickMargin={10}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            {categories.map((category, index) => (
              <Bar 
                key={category.name}
                dataKey={category.name}
                stackId="a"
                fill={category.color}
                radius={index === categories.length - 1 ? [3, 3, 0, 0] : [0, 0, 0, 0]}
                label={showPercentage && index === 0 ? LabelComponent as any : false}
              />
            ))}
            {showReferenceLine && <ReferenceLine y={0} stroke="hsl(var(--chart-3))" strokeWidth={1} />}
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
      <CustomLegend categories={categories} />
    </>
  );
};

export default StackedBarChart;