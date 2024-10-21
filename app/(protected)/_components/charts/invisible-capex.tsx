"use client";

import React, { useState } from 'react';
import { Line, XAxis, YAxis, Legend, ResponsiveContainer, Bar, ComposedChart } from 'recharts';
import ChartWrapper from './ui/chart-wrapper';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const dataSales = [
  { year: '2011', rdInvested: 2.2, adInvested: 0.8, industryMedianRD: 3.0, industryMedianAd: 0.9 },
  { year: '2012', rdInvested: 2.1, adInvested: 0.7, industryMedianRD: 3.1, industryMedianAd: 0.8 },
  { year: '2013', rdInvested: 2.6, adInvested: 0.8, industryMedianRD: 3.5, industryMedianAd: 0.9 },
  { year: '2014', rdInvested: 3.2, adInvested: 0.8, industryMedianRD: 3.8, industryMedianAd: 0.9 },
  { year: '2015', rdInvested: 3.3, adInvested: 0.7, industryMedianRD: 3.7, industryMedianAd: 0.8 },
  { year: '2016', rdInvested: 4.7, adInvested: 0.8, industryMedianRD: 4.3, industryMedianAd: 1.3 },
  { year: '2017', rdInvested: 4.9, adInvested: 0.8, industryMedianRD: 4.2, industryMedianAd: 0.9 },
  { year: '2018', rdInvested: 5.2, adInvested: 0.8, industryMedianRD: 4.5, industryMedianAd: 0.9 },
  { year: '2019', rdInvested: 6.1, adInvested: 0.9, industryMedianRD: 4.3, industryMedianAd: 1.0 },
  { year: '2020', rdInvested: 6.8, adInvested: 0.9, industryMedianRD: 4.2, industryMedianAd: 0.9 },
  { year: '2021', rdInvested: 5.9, adInvested: 0.8, industryMedianRD: 4.0, industryMedianAd: 0.9 },
  { year: '2022', rdInvested: 6.6, adInvested: 0.7, industryMedianRD: 4.3, industryMedianAd: 0.9 },
  { year: '2023', rdInvested: 7.7, adInvested: 0.7, industryMedianRD: 5.2, industryMedianAd: 1.1 },
];

const dataOpExpenses = [
  { year: '2011', rdInvested: 3.3, adInvested: 1.2, industryMedianRD: 4.5, industryMedianAd: 1.4 },
  { year: '2012', rdInvested: 3.2, adInvested: 1.1, industryMedianRD: 4.7, industryMedianAd: 1.2 },
  { year: '2013', rdInvested: 3.9, adInvested: 1.2, industryMedianRD: 5.3, industryMedianAd: 1.4 },
  { year: '2014', rdInvested: 4.8, adInvested: 1.2, industryMedianRD: 5.7, industryMedianAd: 1.4 },
  { year: '2015', rdInvested: 5.0, adInvested: 1.1, industryMedianRD: 5.6, industryMedianAd: 1.2 },
  { year: '2016', rdInvested: 7.1, adInvested: 1.2, industryMedianRD: 6.5, industryMedianAd: 2.0 },
  { year: '2017', rdInvested: 7.4, adInvested: 1.2, industryMedianRD: 6.3, industryMedianAd: 1.4 },
  { year: '2018', rdInvested: 7.8, adInvested: 1.2, industryMedianRD: 6.8, industryMedianAd: 1.4 },
  { year: '2019', rdInvested: 9.2, adInvested: 1.4, industryMedianRD: 6.5, industryMedianAd: 1.5 },
  { year: '2020', rdInvested: 10.2, adInvested: 1.4, industryMedianRD: 6.3, industryMedianAd: 1.4 },
  { year: '2021', rdInvested: 8.9, adInvested: 1.2, industryMedianRD: 6.0, industryMedianAd: 1.4 },
  { year: '2022', rdInvested: 9.9, adInvested: 1.1, industryMedianRD: 6.5, industryMedianAd: 1.4 },
  { year: '2023', rdInvested: 11.6, adInvested: 1.1, industryMedianRD: 7.8, industryMedianAd: 1.7 },
];
const InvisibleCapexChart = () => {
    const [comparison, setComparison] = useState('vs. Sales');
  
    const handleTabChange = (value: string) => {
      setComparison(value);
    };
  
    const headerContent = (
      <div className="flex items-center space-x-2">
        <Tabs value={comparison} onValueChange={handleTabChange}>
          <TabsList>
            <TabsTrigger value="vs. Sales">vs. Sales</TabsTrigger>
            <TabsTrigger value="vs Op. Expenses">vs Op. Expenses</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    );
  
    const formatTooltipDate = (label: string) => `${label}`;
    const yAxisFormatter = (value: number) => `${value.toFixed(1)}%`;
  
    const currentData = comparison === 'vs. Sales' ? dataSales : dataOpExpenses;
  
    const dataKeyMap = {
      rdInvested: "R&D Invested",
      adInvested: "Advertising Invested",
      industryMedianRD: "Industry Median R&D",
      industryMedianAd: "Industry Median Advertising"
    };
  
    return (
      <ChartWrapper
        title="Invisible CAPEX"
        tooltipDescription="We display:
Bar elements corresponding to the percentage of sales or operating expenses we capitalize each year for R&D or Advertising.
Line elements corresponding to the industry median percentage of R&D or Advertising capitalized each year."
        showMaximizeIcon={false}
        headerContent={headerContent}
      >
        <ChartContainer
          key={comparison}
          config={{
            rdInvested: { label: dataKeyMap.rdInvested, color: "#3b82f6" },
            adInvested: { label: dataKeyMap.adInvested, color: "#ec4899" },
            industryMedianRD: { label: dataKeyMap.industryMedianRD, color: "#3b82f6" },
            industryMedianAd: { label: dataKeyMap.industryMedianAd, color: "#ec4899" },
          }}
        >
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={currentData} margin={{ top: 35, right: 30, left: 0, bottom: -40 }}>
              <Legend />
              <XAxis dataKey="year" />
              <YAxis tickFormatter={yAxisFormatter} />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[200px]"
                    formatter={(value, name, props) => (
                      <>
                        <div
                          className="h-2.5 w-2.5 shrink-0 rounded-[2px] bg-[--color-bg]"
                          style={{
                            "--color-bg": props.color,
                          } as React.CSSProperties}
                        />
                        {dataKeyMap[name as keyof typeof dataKeyMap] || name}
                        <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                          {yAxisFormatter(value as number)}
                        </div>
                      </>
                    )}
                  />
                }
                labelFormatter={formatTooltipDate}
              />
              
              <Bar dataKey="rdInvested" name={dataKeyMap.rdInvested} fill="#3b82f6" />
              <Bar dataKey="adInvested" name={dataKeyMap.adInvested} fill="#ec4899" />
              <Line type="monotone" dataKey="industryMedianRD" name={dataKeyMap.industryMedianRD} stroke="#3b82f6" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="industryMedianAd" name={dataKeyMap.industryMedianAd} stroke="#ec4899" strokeWidth={2} dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartContainer>
      </ChartWrapper>
    );
  };
  
  export default InvisibleCapexChart;