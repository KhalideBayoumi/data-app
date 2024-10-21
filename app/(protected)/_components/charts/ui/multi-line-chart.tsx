import React, { ReactNode } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

type DataPoint = {
  [key: string]: number | string;
};

type LineConfig = {
  dataKey: string;
  name: string;
  color: string;
  dashArray?: string;
  dot?: boolean | object;
};

type YAxisDomain = [number | string | Function, number | string | Function];

type GenericMultiLineChartProps = {
  data: DataPoint[];
  lines: LineConfig[];
  xAxisKey: string;
  yAxisDomain?: YAxisDomain;
  yAxisTickFormatter?: (value: number) => string;
  height?: number;
  children?: ReactNode;
};

const MultiLineChart = ({ 
  data, 
  lines, 
  xAxisKey, 
  yAxisDomain = [0, 'dataMax + 2'], 
  yAxisTickFormatter = (value: number) => `${value.toFixed(1)}`,
  height = 300,
  children
}: GenericMultiLineChartProps) => {
  return (
    <div style={{ width: '100%', height: `${height}px` }}>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <XAxis dataKey={xAxisKey} />
          <YAxis 
            domain={yAxisDomain} 
            tickFormatter={yAxisTickFormatter}
          />
          {children}
          {lines.map((line, index) => (
            <Line 
              key={index}
              type="monotone" 
              dataKey={line.dataKey} 
              name={line.name}
              stroke={line.color}
              strokeDasharray={line.dashArray}
              dot={line.dot !== false ? { r: 3 } : false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MultiLineChart;