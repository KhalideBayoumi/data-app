"use client"

import React from 'react';
import ChartWrapper from '@/app/(protected)/_components/charts/ui/chart-wrapper';
import StackedBarChart from '@/app/(protected)/_components/charts/ui/stacked-bar-chart';

const CapitalizedBreakdown = () => {
  const data = [
    { year: 2011, "Capitalized R&D": 4000, "Capitalized Advertising": 5000 },
    { year: 2013, "Capitalized R&D": 5000, "Capitalized Advertising": 6000 },
    { year: 2015, "Capitalized R&D": 7000, "Capitalized Advertising": 8000 },
    { year: 2017, "Capitalized R&D": 12000, "Capitalized Advertising": 10000 },
    { year: 2019, "Capitalized R&D": 20000, "Capitalized Advertising": 12000 },
    { year: 2021, "Capitalized R&D": 32000, "Capitalized Advertising": 14000 },
    { year: 2023, "Capitalized R&D": 48000, "Capitalized Advertising": 12000 },
  ];

  const categories = [
    { name: "Capitalized R&D", color: "hsl(var(--chart-1))" },
    { name: "Capitalized Advertising", color: "hsl(var(--chart-5))" },
  ];

  return (
    <ChartWrapper
      title="Capitalized Breakdown"
      tooltipDescription="Economically capitalized intangible assets such as investments in advertising, R&D and human capital."
    >
      <div className="mt-6">
        <StackedBarChart 
          data={data}
          categories={categories}
          width={500}
          height={300}
        />
      </div>
    </ChartWrapper>
  );
};

export default CapitalizedBreakdown;