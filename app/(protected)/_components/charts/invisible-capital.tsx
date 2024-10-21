"use client"

import React from 'react';
import ChartWrapper from '@/app/(protected)/_components/charts/ui/chart-wrapper';
import SemiCircleChart from '@/app/(protected)/_components/charts/ui/semi-circle-chart';
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

interface DataItem {
  name: string;
  value: number;
  color: string;
}

interface InvisibleCapitalProps {
  data: DataItem[];
}

const InvisibleCapital: React.FC<InvisibleCapitalProps> = ({ data }) => {
  const chartConfig: ChartConfig = data.reduce((config, item) => ({
    ...config,
    [item.name.toLowerCase().replace(' ', '')]: {
      label: item.name,
      color: item.color,
    },
  }), {});

  return (
    <ChartWrapper
      title="Invisible Capital Invested (Lives)"
      tooltipDescription="Number of years used to estimate how long it will take for the invisible assets to get fully depreciated.
It is assigned by sub-sector, but can be refined depending on the company's business model and profile."
    >
      <ChartContainer config={chartConfig} className="mx-auto aspect-square w-full max-w-[250px]">
        <SemiCircleChart data={data} />
      </ChartContainer>
      <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm">
        {data.map((item, index) => (
          <div key={index} className="flex items-center">
            <div 
              className="w-3 h-3 rounded-full mr-1" 
              style={{ backgroundColor: item.color }}
            />
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </ChartWrapper>
  );
};

export default InvisibleCapital;