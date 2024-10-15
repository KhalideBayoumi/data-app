import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Rectangle, ReferenceLine } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const DualBarCharts: React.FC<{ data: any }> = ({ data }) => {
  const customYAxisTick = ({ x, y, payload }: any) => {
    return (
      <text x={x} y={y} dy={3} textAnchor="end" fill="#888" fontSize="12">
        {`${payload.value}%`}
      </text>
    );
  };

  const customXAxisTick = ({ x, y, payload }: any) => {
    return (
      <text x={x} y={y} dy={10} textAnchor="middle" fill="#888" fontSize="12">
        {payload.value}
      </text>
    );
  };

  return (
    <ChartContainer
      config={{
        company: {
          label: "Company",
          color: "hsl(var(--chart-2))",
        },
        industry: {
          label: "Industry",
          color: "hsl(var(--chart-4))",
        },
      }}
    >
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <XAxis dataKey="name" tick={customXAxisTick} axisLine={{ stroke: '#444' }} />
          <YAxis tickFormatter={(value) => `${value}%`} domain={[-8, 12]} tick={customYAxisTick} axisLine={{ stroke: '#444' }} />
          <ReferenceLine y={0} stroke="#444" />
          <ChartTooltip
            content={
              <ChartTooltipContent hideLabel />
            }
            cursor={true}
          />
          <Bar dataKey="company" fill="hsl(var(--chart-2))" radius={2} fillOpacity={0.8} activeBar={<Rectangle fillOpacity={1} />} />
          <Bar dataKey="industry" fill="hsl(var(--chart-4))" radius={2} fillOpacity={0.8} activeBar={<Rectangle fillOpacity={1} />} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default DualBarCharts;