import React from 'react';
import MultiSemiCircleChart from './ui/multi-semi-circle-chart';
import ChartWrapper from '@/app/(protected)/_components/charts/ui/chart-wrapper';
import { ChartConfig } from '@/components/ui/chart';

const AverageAssetLife = () => {
  const chartConfig = {
    years: {
      label: "Years",
    },
    Machinery: {
      label: "Machinery",
      color: "hsl(var(--chart-1))",
    },
    Building: {
      label: "Building",
      color: "hsl(var(--chart-2))",
    },
    Other: {
      label: "Other",
      color: "hsl(var(--chart-3))",
    },
    'Natural Resources': {
      label: "Natural Resources",
      color: "hsl(var(--chart-4))",
    },
    'Leasehold Improvements': {
      label: "Leasehold Improvements", 
      color: "hsl(var(--chart-5))",
    },
    Intangibles: {
      label: "Intangibles",
      color: "hsl(var(--chart-6))",
    },
    Leasing: {
      label: "Leasing",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  const chartData = [
    { asset: "Machinery", years: 15, fill: "hsl(var(--chart-1))" },
    { asset: "Building", years: 25, fill: "hsl(var(--chart-2))" },
    { asset: "Other", years: 10, fill: "hsl(var(--chart-3))" },
    { asset: "Natural Resources", years: 20, fill: "hsl(var(--chart-4))" },
    { asset: "Leasehold Improvements", years: 12, fill: "hsl(var(--chart-5))" },
    { asset: "Intangibles", years: 8, fill: "hsl(var(--chart-6))" },
    { asset: "Leasing", years: 5, fill: "hsl(var(--chart-1))" }
  ];

  return (
    <ChartWrapper 
      title="Average Asset Life (years) - as of FY 2023"
      tooltipDescription="This depends on the asset and is a consensus used per sector"
    >
      <MultiSemiCircleChart 
        data={chartData}
        config={chartConfig}
      />
    </ChartWrapper>
  );
};

export default AverageAssetLife;