import React, { useState } from 'react';
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import ChartWrapper from './ui/chart-wrapper';

type TabType = 'all' | 'industry' | 'region';

const generateRandomData = () => {
  const metrics = ['Eco.ROI', 'Eco. Asset Multiple', 'Eco. P/E', 'Eco. Margin', 'Invisible CAPEX / Eco. Assets', 'Eco. Cash-Flow Growth'];
  return metrics.map(metric => ({
    metric,
    value: Math.floor(Math.random() * 100)
  }));
};

const TABS: { label: string; value: TabType }[] = [
    { label: 'All', value: 'all' },
    { label: 'Industry', value: 'industry' },
    { label: 'Region', value: 'region' },
  ];

const allData = generateRandomData();
const industryData = generateRandomData();
const regionData = generateRandomData();

const chartColors: Record<TabType, string> = {
  all: "hsl(var(--chart-2))",
  industry: "hsl(var(--chart-4))",
  region: "hsl(var(--chart-1))"
};
  
export const RadarDots: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [chartData, setChartData] = useState(allData);

  const chartConfig = {
    value: {
      label: "Value",
      color: chartColors[activeTab],
    },
  } satisfies ChartConfig;

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    switch(tab) {
      case 'all':
        setChartData(allData);
        break;
      case 'industry':
        setChartData(industryData);
        break;
      case 'region':
        setChartData(regionData);
        break;
    }
  };

  const averageScore = Math.floor(chartData.reduce((sum, item) => sum + item.value, 0) / chartData.length);

  return (
    <ChartWrapper title="Scoring">
      <div className="relative">
        <ChartContainer
          config={chartConfig}
          className="w-full aspect-square max-h-[200px]"
        >
          <RadarChart data={chartData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="metric" tick={{ fontSize: 10 }} />
            <PolarGrid />
            <Radar
              dataKey="value"
              fill={chartColors[activeTab]}
              fillOpacity={0.6}
              dot={{
                r: 3,
                fillOpacity: 1,
              }}
            />
          </RadarChart>
        </ChartContainer>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="border bg-black opacity-70 border-border rounded-md p-1 shadow-md">
                <div className="text-xl font-bold text-center">{averageScore}</div>
            </div>
        </div>
      </div>
      <div className="flex justify-end w-full mt-2 space-x-1">
        {TABS.map(({ label, value }) => (
            <button
            key={value}
            onClick={() => handleTabChange(value)}
            className={`text-xs px-2 py-1 rounded ${
                activeTab === value
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground'
            }`}
            >
            {label}
            </button>
        ))}
      </div>
    </ChartWrapper>
  )
}