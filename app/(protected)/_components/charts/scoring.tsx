import React, { useState } from "react";
import ChartWrapper from "./ui/chart-wrapper";
import RadarDotsChart from "./ui/radar-dots";

type TabType = 'all' | 'industry' | 'region';

const Scoring = () => {
    const [activeTab, setActiveTab] = useState<TabType>('all');
  
    const TABS: { label: string; value: TabType }[] = [
      { label: 'All', value: 'all' },
      { label: 'Industry', value: 'industry' },
      { label: 'Region', value: 'region' },
    ];
  
    const chartColors: Record<TabType, string> = {
      all: "hsl(var(--chart-2))",
      industry: "hsl(var(--chart-4))",
      region: "hsl(var(--chart-1))"
    };
  
    const generateRandomData = () => {
      const metrics = ['Eco.ROI', 'Eco. Asset Multiple', 'Eco. P/E', 'Eco. Margin', 'Invisible CAPEX / Eco. Assets', 'Eco. Cash-Flow Growth'];
      return metrics.map(metric => ({
        metric,
        value: Math.floor(Math.random() * 100)
      }));
    };
  
    const allData = generateRandomData();
    const industryData = generateRandomData();
    const regionData = generateRandomData();
  
    const getDataForTab = (tab: TabType) => {
      switch(tab) {
        case 'all':
          return allData;
        case 'industry':
          return industryData;
        case 'region':
          return regionData;
      }
    };
  
    return (
      <ChartWrapper 
        title="Scoring"
        tooltipDescription="Overview of the company's main output metrics based on a centile score ranging from 1 to 100."
        >
        <RadarDotsChart 
          data={getDataForTab(activeTab)} 
          color={chartColors[activeTab]} 
        />
        <div className="flex justify-end w-full mt-2 space-x-1">
          {TABS.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setActiveTab(value)}
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
    );
  };

export default Scoring;