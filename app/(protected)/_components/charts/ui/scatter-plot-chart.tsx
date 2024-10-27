import React from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  ReferenceLine
} from 'recharts';

interface DataPoint {
  name: string;
  ticker: string;
  [key: string]: string | number;
}

interface ScatterPlotChartProps<T extends DataPoint> {
  data: T[];
  xDataKey: string;
  yDataKey: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  radiusDataKey?: string;
  xAxisTickFormatter?: (value: any) => string;
  yAxisTickFormatter?: (value: any) => string;
  tooltipFormatter?: (value: any, name: string, item: any) => [string, string];
  colors?: string[];
  radiusScale?: number;
  xAxisDomain?: [number, number];
  yAxisDomain?: [number, number];
  referenceLines?: any[];
}

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const data = payload[0].payload;
  
  return (
    <div className="rounded-lg bg-background/95 p-3 shadow-md border border-border">
      <p className="mb-2 font-medium">{`${data.name} (${data.ticker})`}</p>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-sm">
          <div 
            className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
            style={{ backgroundColor: data.fill }}
          />
          <span>{`ROI: ${data['Economic ROI']}%`}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div 
            className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
            style={{ backgroundColor: data.fill }}
          />
          <span>{`Asset Multiple: ${data['Economic Asset Multiple']}x`}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div 
            className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
            style={{ backgroundColor: data.fill }}
          />
          <span>{`Market Cap: $${data['Market Cap'].toFixed(1)}B`}</span>
        </div>
      </div>
    </div>
  );
};

const CustomShape = (props: any) => {
  const { cx, cy, fill, radius } = props;
  return (
    <circle 
      cx={cx} 
      cy={cy} 
      r={radius ? radius * 3 : 18}
      fill={fill}
      opacity={0.7}
    />
  );
};

const ScatterPlotChart = <T extends DataPoint>({
  data,
  xDataKey,
  yDataKey,
  radiusDataKey,
  xAxisTickFormatter = (value) => `${value}`,
  yAxisTickFormatter = (value) => `${value}`,
  tooltipFormatter = (value, name) => [value.toString(), name],
  colors = [],
  radiusScale = 1,
  xAxisDomain = [0, 60],
  yAxisDomain = [0, 24]
}: ScatterPlotChartProps<T>): JSX.Element => {
  const getRadius = (dataPoint: T) => {
    if (!radiusDataKey) return 6;
    const value = parseFloat(String(dataPoint[radiusDataKey]).replace(/[^\d.-]/g, ''));
    return Math.sqrt(value) * radiusScale;
  };

  const preparedData = data.map((entry, index) => ({
    ...entry,
    radius: getRadius(entry),
    fill: colors[index] || `#${Math.floor(Math.random()*16777215).toString(16)}`
  }));

  // Points de la ligne de tendance
  const trendLineData = [
    { x: 0, y: 0 },    // Point de départ
    { x: 60, y: 24 }   // Point d'arrivée
  ];

  return (
    <div className="flex flex-col w-full h-full">
      <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 10, bottom: 20, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              dataKey={xDataKey}
              type="number"
              domain={xAxisDomain}
              tickFormatter={xAxisTickFormatter}
              stroke="#9CA3AF"
            />
            <YAxis
              dataKey={yDataKey}
              type="number"
              domain={yAxisDomain}
              tickFormatter={yAxisTickFormatter}
              stroke="#9CA3AF"
            />
            
            <Tooltip content={<CustomTooltip />} />

            {/* Ligne diagonale */}
            <ReferenceLine
              segment={[{ x: 0, y: 0 }, { x: 60, y: 24 }]}
              stroke="hsl(var(--chart-6))"
              strokeDasharray="5 5"
              strokeWidth={2}
              ifOverflow="visible"
            />

            <Scatter
              data={preparedData}
              shape={<CustomShape />}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex flex-wrap gap-4 justify-center mt-8 mb-4">
        {data.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-full opacity-70"
              style={{ backgroundColor: colors[index] || `#${Math.floor(Math.random()*16777215).toString(16)}` }}
            />
            <span className="text-sm text-gray-300">{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScatterPlotChart;