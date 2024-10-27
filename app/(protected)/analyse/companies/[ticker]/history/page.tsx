"use client";

import React, { useState } from 'react';
import SingleBarChart from '@/app/(protected)/_components/charts/ui/single-bar-chart';
import ChartWrapper from '@/app/(protected)/_components/charts/ui/chart-wrapper';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HistoricalFinancialTable from '@/app/(protected)/_components/historical-financial-table';
import EconomicValueChart from '@/app/(protected)/_components/charts/economic-value';
import EconomicAsset from '@/app/(protected)/_components/charts/economic-asset';

type ViewType = 'chart' | 'table';

const HistoricalPage = () => {
  const [activeView, setActiveView] = useState<ViewType>("chart");

  const handleViewChange = (value: string) => {
    if (value === 'chart' || value === 'table') {
        setActiveView(value);
    }
  };

  const chartConfigs = [
    {
      title: "Economic ROI (in %)",
      dataKey: "value",
      color: "hsl(var(--chart-5))",
      isPercentage: true,
      tooltipDescription: "Real cash profitability on the Economic Assets deployed, calculated as an internal rate of return of inflation-adjusted capital invested and Economic Cash-Flow over the average economic life of depreciable assets.",
      data: [
        { year: 2011, value: 74.0 },
        { year: 2012, value: 85.2 },
        { year: 2013, value: 71.1 },
        { year: 2014, value: 67.1 },
        { year: 2015, value: 76.0 },
        { year: 2016, value: 70.0 },
        { year: 2017, value: 65.0 },
        { year: 2018, value: 60.0 },
        { year: 2019, value: 55.0 },
        { year: 2020, value: 50.0 },
        { year: 2021, value: 45.0 },
        { year: 2022, value: 40.0 },
        { year: 2023, value: 42.0 },
        { year: 2024, value: 44.0 },
        { year: 2025, value: 46.0 },
      ]
    },
    {
      title: "Economic Cash Flow (in M USD)",
      dataKey: "value",
      color: "hsl(var(--chart-4))",
      tooltipDescription: "Computed post-tax operational cash-flow, working out noise stemming from exceptional & non-cash elements, dealing with tax fallacies, and accounting for invisible capital invested (R&D, advertising, human capital)",
      data: [
        { year: 2011, value: 31208 },
        { year: 2012, value: 49720 },
        { year: 2013, value: 49195 },
        { year: 2014, value: 54715 },
        { year: 2015, value: 74579 },
        { year: 2016, value: 80000 },
        { year: 2017, value: 85000 },
        { year: 2018, value: 90000 },
        { year: 2019, value: 95000 },
        { year: 2020, value: 100000 },
        { year: 2021, value: 105000 },
        { year: 2022, value: 110000 },
        { year: 2023, value: 115000 },
        { year: 2024, value: 120000 },
        { year: 2025, value: 125000 },
      ]
    },
    {
      title: "Economic Assets (in M USD)",
      dataKey: "value",
      color: "hsl(var(--chart-2))",
      tooltipDescription: "Economic replacement value of a company's inflation-adjusted operational assets, including off-balance sheet elements and invisible CAPEX. It can be considered as the Economic equivalent of the Accounting Book Value.",
      data: [
        { year: 2011, value: 27077 },
        { year: 2012, value: 40100 },
        { year: 2013, value: 42637 },
        { year: 2014, value: 45086 },
        { year: 2015, value: 52112 },
        { year: 2016, value: 60000 },
        { year: 2017, value: 70000 },
        { year: 2018, value: 80000 },
        { year: 2019, value: 90000 },
        { year: 2020, value: 100000 },
        { year: 2021, value: 110000 },
        { year: 2022, value: 120000 },
        { year: 2023, value: 130000 },
        { year: 2024, value: 140000 },
        { year: 2025, value: 150000 },
      ]
    },
    {
      title: "Economic Enterprise Value (in M USD)",
      dataKey: "value",
      color: "hsl(var(--chart-1))",
      tooltipDescription: "True financial leverage, gathering all (on and off) balance-sheet liabilities. It can be considered as the Economic equivalent of the Accounting Enterprise Value.",
      data: [
        { year: 2011, value: 31963 },
        { year: 2012, value: 49661 },
        { year: 2013, value: 45722 },
        { year: 2014, value: 52597 },
        { year: 2015, value: 74833 },
        { year: 2016, value: 80000 },
        { year: 2017, value: 90000 },
        { year: 2018, value: 100000 },
        { year: 2019, value: 110000 },
        { year: 2020, value: 120000 },
        { year: 2021, value: 130000 },
        { year: 2022, value: 140000 },
        { year: 2023, value: 150000 },
        { year: 2024, value: 160000 },
        { year: 2025, value: 170000 },
      ]
    }
  ];

  return (
    <div className="pb-4">
      <div className="flex items-center justify-end mb-4">
        <Tabs value={activeView} onValueChange={handleViewChange}>
          <TabsList>
            <TabsTrigger value="chart">Chart View</TabsTrigger>
            <TabsTrigger value="table">Table View</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {activeView === "chart" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {chartConfigs.map((config, index) => (
            <ChartWrapper key={index} title={config.title} tooltipDescription={config.tooltipDescription}>
              <SingleBarChart 
                data={config.data}
                dataKey={config.dataKey}
                color={config.color}
                isPercentage={config.isPercentage}
              />
            </ChartWrapper>
          ))}
          <EconomicValueChart />
          <EconomicAsset />
        </div>
      ) : (
        <HistoricalFinancialTable />
      )}
    </div>
  );
};

export default HistoricalPage;