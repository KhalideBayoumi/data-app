import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Rectangle, ReferenceLine } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface BarConfig {
  dataKey: string;
  label: string;
  color: string;
}

interface DualBarChartsProps {
  data: any[];
  bar1: BarConfig;
  bar2: BarConfig;
  yAxisDomain?: [number, number];
}

const DualBarCharts = ({ data, bar1, bar2, yAxisDomain = [-8, 12] }: DualBarChartsProps) => {
  const customYAxisTick = ({ x, y, payload }: any) => (
    <text x={x} y={y} dy={3} textAnchor="end" fill="#888" fontSize="12">
      {`${payload.value}%`}
    </text>
  );

  const customXAxisTick = ({ x, y, payload }: any) => (
    <text x={x} y={y} dy={10} textAnchor="middle" fill="#888" fontSize="12">
      {payload.value}
    </text>
  );

  return (
    <ChartContainer
      config={{
        [bar1.dataKey]: {
          label: bar1.label,
          color: bar1.color,
        },
        [bar2.dataKey]: {
          label: bar2.label,
          color: bar2.color,
        },
      }}
    >
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <XAxis dataKey="name" tick={customXAxisTick} axisLine={{ stroke: '#444' }} />
          <YAxis tickFormatter={(value) => `${value}%`} domain={yAxisDomain} tick={customYAxisTick} axisLine={{ stroke: '#444' }} />
          <ReferenceLine y={0} stroke="#444" />
          <ChartTooltip
            content={
              <ChartTooltipContent
                hideLabel
                className="w-[180px]"
                formatter={(value, name, props) => (
                  <>
                    <div
                      className="h-2.5 w-2.5 shrink-0 rounded-[2px] bg-[--color-bg]"
                      style={{
                        "--color-bg": name === bar1.dataKey ? bar1.color : bar2.color,
                      } as React.CSSProperties}
                    />
                    {name === bar1.dataKey ? bar1.label : bar2.label}
                    <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                      {typeof value === 'number' ? value.toFixed(1) : value}
                      <span className="font-normal text-muted-foreground">
                        %
                      </span>
                    </div>
                  </>
                )}
              />
            }
            cursor={true}
          />
          <Bar dataKey={bar1.dataKey} fill={bar1.color} radius={2} fillOpacity={0.8} activeBar={<Rectangle fillOpacity={1} />} />
          <Bar dataKey={bar2.dataKey} fill={bar2.color} radius={2} fillOpacity={0.8} activeBar={<Rectangle fillOpacity={1} />} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default DualBarCharts;