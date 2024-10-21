import React from 'react';
import { ResponsiveContainer, AreaChart as RechartsAreaChart, XAxis, YAxis, Area } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface DataPoint {
  [key: string]: string | number;
}

interface AreaChartProps {
  data: DataPoint[];
  xDataKey: string;
  yDataKey: string;
  height?: number;
  areaColor?: string;
  formatXAxis?: (value: any) => string;
  formatTooltipDate: (value: string) => string;
  yAxisFormatter?: (value: number) => string;
}

const AreaChart = ({
  data,
  xDataKey,
  yDataKey,
  height = 180,
  areaColor = '#4ade80',
  formatXAxis = (value) => `${value}`,
  formatTooltipDate,
  yAxisFormatter = (value) => `${value}`,
}: AreaChartProps) => {
  return (
    <ChartContainer
      config={{
        [yDataKey]: {
          label: "Value",
          color: areaColor,
        },
      }}
    >
      <ResponsiveContainer width="100%" height={height}>
        <RechartsAreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={areaColor} stopOpacity={0.8}/>
              <stop offset="95%" stopColor={areaColor} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis 
            dataKey={xDataKey} 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#888', fontSize: 10 }}
            tickFormatter={formatXAxis}
            interval="preserveStartEnd"
            minTickGap={30}
            dy={10}
          />
          <YAxis 
            domain={['auto', 'auto']} 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#888', fontSize: 10 }}
            width={40}
            tickCount={6}
            tickFormatter={yAxisFormatter}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                className="w-[200px]"
                formatter={(value, name, props) => (
                  <>
                    <div
                      className="h-2.5 w-2.5 shrink-0 rounded-[2px] bg-[--color-bg]"
                      style={{
                        "--color-bg": areaColor,
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
          <Area 
            type="monotone" 
            dataKey={yDataKey} 
            stroke={areaColor} 
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorGradient)" 
            name="Value"
          />
        </RechartsAreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default AreaChart;