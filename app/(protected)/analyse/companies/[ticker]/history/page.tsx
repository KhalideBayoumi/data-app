"use client";

import React, { useState } from 'react';
import SingleBarChart from '@/app/(protected)/_components/charts/ui/single-bar-chart';
import ChartWrapper from '@/app/(protected)/_components/charts/ui/chart-wrapper';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import HistoricalFinancialTable from '@/app/(protected)/_components/historical-financial-table';

const economicData = [
    { year: 2011, economicROI: 74.0, economicCashFlow: 31208, economicAssets: 27077, economicEnterpriseValue: 319635, economicValueCreated: 20000, economicAssetMultiple: 9.2, relativeAssetMultiple: 6.9 },
    { year: 2012, economicROI: 85.2, economicCashFlow: 49720, economicAssets: 40100, economicEnterpriseValue: 496641, economicValueCreated: 25000, economicAssetMultiple: 9.8, relativeAssetMultiple: 5.9 },
    { year: 2013, economicROI: 71.1, economicCashFlow: 49195, economicAssets: 42637, economicEnterpriseValue: 457822, economicValueCreated: 30000, economicAssetMultiple: 8.1, relativeAssetMultiple: 6.1 },
    { year: 2014, economicROI: 67.1, economicCashFlow: 54715, economicAssets: 45086, economicEnterpriseValue: 529597, economicValueCreated: 35000, economicAssetMultiple: 9.5, relativeAssetMultiple: 7.7 },
    { year: 2015, economicROI: 76.0, economicCashFlow: 74579, economicAssets: 52112, economicEnterpriseValue: 704833, economicValueCreated: 40000, economicAssetMultiple: 11.3, relativeAssetMultiple: 9.2 },
    { year: 2016, economicROI: 70.0, economicCashFlow: 80000, economicAssets: 60000, economicEnterpriseValue: 800000, economicValueCreated: 45000, economicAssetMultiple: 10.5, relativeAssetMultiple: 8.5 },
    { year: 2017, economicROI: 65.0, economicCashFlow: 85000, economicAssets: 70000, economicEnterpriseValue: 900000, economicValueCreated: 50000, economicAssetMultiple: 9.8, relativeAssetMultiple: 7.8 },
    { year: 2018, economicROI: 60.0, economicCashFlow: 90000, economicAssets: 80000, economicEnterpriseValue: 1000000, economicValueCreated: 55000, economicAssetMultiple: 9.2, relativeAssetMultiple: 7.2 },
    { year: 2019, economicROI: 55.0, economicCashFlow: 95000, economicAssets: 90000, economicEnterpriseValue: 1100000, economicValueCreated: 60000, economicAssetMultiple: 8.7, relativeAssetMultiple: 6.7 },
    { year: 2020, economicROI: 50.0, economicCashFlow: 100000, economicAssets: 100000, economicEnterpriseValue: 1200000, economicValueCreated: 65000, economicAssetMultiple: 8.2, relativeAssetMultiple: 6.2 },
    { year: 2021, economicROI: 45.0, economicCashFlow: 105000, economicAssets: 110000, economicEnterpriseValue: 1300000, economicValueCreated: 70000, economicAssetMultiple: 7.8, relativeAssetMultiple: 5.8 },
    { year: 2022, economicROI: 40.0, economicCashFlow: 110000, economicAssets: 120000, economicEnterpriseValue: 1400000, economicValueCreated: 75000, economicAssetMultiple: 7.5, relativeAssetMultiple: 5.5 },
    { year: 2023, economicROI: 42.0, economicCashFlow: 115000, economicAssets: 130000, economicEnterpriseValue: 1500000, economicValueCreated: 80000, economicAssetMultiple: 7.2, relativeAssetMultiple: 5.2 },
    { year: 2024, economicROI: 44.0, economicCashFlow: 120000, economicAssets: 140000, economicEnterpriseValue: 1600000, economicValueCreated: 85000, economicAssetMultiple: 7.0, relativeAssetMultiple: 5.0 },
    { year: 2025, economicROI: 46.0, economicCashFlow: 125000, economicAssets: 150000, economicEnterpriseValue: 1700000, economicValueCreated: 90000, economicAssetMultiple: 6.8, relativeAssetMultiple: 4.8 },
  ];

type ViewType = 'chart' | 'table';

const HistoricalPage = () => {
  const [activeView, setActiveView] = useState<ViewType>("chart");

  const handleViewChange = (value: string) => {
    if (value === 'chart' || value === 'table') {
        setActiveView(value);
    }
  };

  return (
    <div className="p-4">
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
            <ChartWrapper title="Economic ROI (in %)">
                <SingleBarChart 
                data={economicData} 
                dataKey="economicROI" 
                color="hsl(var(--chart-1))" 
                />
            </ChartWrapper>
            <ChartWrapper title="Economic Cash Flow (in USD)">
                <SingleBarChart 
                data={economicData} 
                dataKey="economicCashFlow" 
                color="hsl(var(--chart-2))" 
                />
            </ChartWrapper>
            <ChartWrapper title="Economic Assets (in USD)">
                <SingleBarChart 
                data={economicData} 
                dataKey="economicAssets" 
                color="hsl(var(--chart-3))" 
                />
            </ChartWrapper>
            <ChartWrapper title="Economic Enterprise Value (in USD)">
                <SingleBarChart 
                data={economicData} 
                dataKey="economicEnterpriseValue" 
                color="hsl(var(--chart-4))" 
                />
            </ChartWrapper>
            <ChartWrapper title="Economic Value Created (in USD)">
                <SingleBarChart 
                data={economicData} 
                dataKey="economicValueCreated" 
                color="hsl(var(--chart-5))" 
                />
            </ChartWrapper>
        </div>
      ) : (
        <HistoricalFinancialTable />
      )}
    </div>
  );
};

export default HistoricalPage;