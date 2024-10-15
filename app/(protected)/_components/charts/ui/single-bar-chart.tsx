import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Rectangle, ReferenceLine } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const SingleBarChart = ({ data, dataKey, color }: any) => {
  const isPercentage = dataKey === "economicROI";

  const customYAxisTick = ({ x, y, payload }: any) => {
    const value = isPercentage ? `${payload.value}%` : payload.value.toLocaleString();
    return (
      <text x={x} y={y} dy={3} textAnchor="end" fill="#888" fontSize="12">
        {value}
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

  const getYAxisDomain = () => {
    const values = data.map((item: any) => item[dataKey]);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    return [minValue < 0 ? minValue : 0, maxValue];
  };

  return (
    <ChartContainer
      config={{
        [dataKey]: {
          label: dataKey.replace(/([A-Z])/g, ' $1').trim(),
          color: color || "hsl(var(--chart-2))",
        },
      }}
    >
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <XAxis dataKey="year" tick={customXAxisTick} axisLine={{ stroke: '#444' }} />
          <YAxis 
            domain={getYAxisDomain()} 
            tick={customYAxisTick} 
            axisLine={{ stroke: '#444' }} 
          />
          <ReferenceLine y={0} stroke="#444" />
          <ChartTooltip
            content={
              <ChartTooltipContent 
                formatter={(value) => isPercentage ? `${value}%` : value.toLocaleString()}
              />
            }
            cursor={true}
          />
          <Bar 
            dataKey={dataKey} 
            fill={color || "hsl(var(--chart-2))"} 
            radius={2} 
            fillOpacity={0.8} 
            activeBar={<Rectangle fillOpacity={1} />} 
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default SingleBarChart;