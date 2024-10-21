import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DualBarCharts from '@/app/(protected)/_components/charts/ui/dual-bar-chart';
import ChartWrapper from './ui/chart-wrapper';

const mockData = [
  { name: "2011", Economic: 12000, MarketImplied: 8000 },
  { name: "2013", Economic: 25000, MarketImplied: 15000 },
  { name: "2015", Economic: 35000, MarketImplied: 28000 },
  { name: "2017", Economic: 42000, MarketImplied: 41000 },
  { name: "2019", Economic: 38000, MarketImplied: 72000 },
  { name: "2021", Economic: 65000, MarketImplied: 132000 },
  { name: "2023", Economic: 62000, MarketImplied: 180000 },
  { name: "2025E", Economic: 70000, MarketImplied: 168000 },
];

const EconomicValueChart = () => {

  return (
    <ChartWrapper
      title="Economic Value Created (in M USD)"
      tooltipDescription="The Market-Implied comparable is associated with the Market-Value of the company and is measured as (Economic Debt - Economic Assets)*Cost of Capital"
    >
      <DualBarCharts
        data={mockData}
        bar1={{
          dataKey: "Economic",
          label: "Economic",
          color: "hsl(var(--chart-3))",
        }}
        bar2={{
          dataKey: "MarketImplied",
          label: "Market Implied",
          color: "hsl(var(--chart-6))",
        }}
        yAxisDomain={[0, 200000]}
      />
    </ChartWrapper>
  );
};

export default EconomicValueChart;