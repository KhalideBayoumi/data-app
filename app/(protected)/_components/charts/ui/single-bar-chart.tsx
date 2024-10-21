import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Rectangle, ReferenceLine } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface SingleBarChartProps {
  data: any[];
  dataKey: string;
  color?: string;
  isPercentage?: boolean;
}

const SingleBarChart = ({ data, dataKey, color, isPercentage = false }: SingleBarChartProps) => {
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

  const formatTooltipDate = (label: string) => {
    return `Year ${label}`;
  };

  const yAxisFormatter = (value: number) => {
    return isPercentage ? `${value.toFixed(1)}%` : value.toLocaleString();
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
                formatter={(value, name, props) => (
                  <>
                    <div
                      className="h-2.5 w-2.5 shrink-0 rounded-[2px] bg-[--color-bg]"
                      style={{
                        "--color-bg": color || "hsl(var(--chart-2))",
                      } as React.CSSProperties}
                    />
                    {name}
                    <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                      {yAxisFormatter(value as number)}
                    </div>
                  </>
                )}
              />
            }
            labelFormatter={formatTooltipDate}
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