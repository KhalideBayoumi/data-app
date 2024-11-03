import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  TooltipProps
} from 'recharts';
import ChartWrapper from './ui/chart-wrapper';

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg bg-background/95 p-3 shadow-md border border-border">
      <p className="mb-2 font-medium">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 text-sm">
          <div 
            className="h-2.5 w-2.5 shrink-0 rounded-[2px]" 
            style={{ 
              backgroundColor: entry.color 
            }} 
          />
          <span className="flex-1">{entry.name}</span>
          <span className="ml-auto font-mono font-medium tabular-nums">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

const CustomLegendContent = (props: any) => {
  const { payload } = props;
  
  return (
    <div className="flex justify-center gap-6 pt-4">
      {payload.map((entry: any) => (
        <div key={entry.value} className="flex items-center gap-2">
          <div 
            className="h-2.5 w-2.5 shrink-0 rounded-[2px]" 
            style={{ backgroundColor: entry.color }} 
          />
          <span className="text-sm text-muted-foreground">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

const economicData = [
  { year: 2000, company: 9.5, industryMedian: 11.8 },
  { year: 2001, company: 9.8, industryMedian: 11.5 },
  { year: 2002, company: 10.2, industryMedian: 11.9 },
  { year: 2003, company: 9.7, industryMedian: 12.1 },
  { year: 2004, company: 10.3, industryMedian: 12.3 },
  { year: 2005, company: 10.5, industryMedian: 12.2 },
  { year: 2006, company: 10.1, industryMedian: 11.7 },
  { year: 2007, company: 9.9, industryMedian: 11.8 },
  { year: 2008, company: 10.4, industryMedian: 12.4 },
  { year: 2009, company: 10.2, industryMedian: 12.1 },
  { year: 2010, company: 9.8, industryMedian: 11.9 },
  { year: 2011, company: 10, industryMedian: 12 },
  { year: 2012, company: 10, industryMedian: 12 },
  { year: 2013, company: 10, industryMedian: 12 },
  { year: 2014, company: 10, industryMedian: 12 },
  { year: 2015, company: 10, industryMedian: 12 },
  { year: 2016, company: 11, industryMedian: 12 },
  { year: 2017, company: 11, industryMedian: 12 },
  { year: 2018, company: 11, industryMedian: 12 },
  { year: 2019, company: 11, industryMedian: 13 },
  { year: 2020, company: 11, industryMedian: 12 },
  { year: 2021, company: 10, industryMedian: 12 },
  { year: 2022, company: 10, industryMedian: 12 },
  { year: 2023, company: 10, industryMedian: 12 }
];

const EconomicLifeHistory = () => {
  return (
    <ChartWrapper
      title="Economic Life History (in years)"
      tooltipDescription="Looking at the overall company's asset life historically, and comparing it to its sector.
This both depends on the evolution of its asset base break-down, as well as the lives assigned to each of its assets.
It is then used to compute the company's Economic ROI, through an Internal Rate of Return calculation over its lifespan"
    >
      <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={economicData}
            margin={{
              top: 20,
              right: 15,
              left: 10,
              bottom: 10
            }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#333" 
              horizontal={true}
              vertical={false}
            />
            <XAxis
              dataKey="year"
              stroke="#666"
              tick={{ fill: '#666' }}
              axisLine={false}
              tickLine={false}
              padding={{ left: 0, right: 0 }}
              dy={10}
            />
            <YAxis
              domain={[8, 16]}
              ticks={[8, 10, 12, 14, 16]}
              stroke="#666"
              tick={{ fill: '#666' }}
              axisLine={false}
              tickLine={false}
              tickCount={5}
              width={30}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegendContent />} />
            <Line
              type="monotone"
              dataKey="company"
              name="Apple Inc"
              stroke="#4ade80"
              strokeWidth={2}
              dot={{ r: 4, fill: '#4ade80' }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="industryMedian"
              name="Industry Median"
              stroke="#a855f7"
              strokeWidth={2}
              dot={{ r: 4, fill: '#a855f7' }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </ChartWrapper>
  );
};

export default EconomicLifeHistory;