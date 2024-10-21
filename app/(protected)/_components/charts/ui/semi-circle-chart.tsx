"use client"

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

type DataItem = {
  name: string;
  value: number;
  color: string;
};

type SemiCircleChartProps = {
  data: DataItem[];
  width?: number;
  height?: number;
};

const SemiCircleChart = ({ data, width = 250, height = 200 }: SemiCircleChartProps) => {
  return (
      <PieChart width={width} height={height}>
        <ChartTooltip content={<ChartTooltipContent />} />
        <Pie
          data={data}
          cx="50%"
          cy="75%"
          startAngle={180}
          endAngle={0}
          innerRadius="60%"
          outerRadius="90%"
          paddingAngle={2}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>

  );
};

export default SemiCircleChart;