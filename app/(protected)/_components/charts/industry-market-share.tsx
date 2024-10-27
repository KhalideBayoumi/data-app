import React from 'react';
import ChartWrapper from '@/app/(protected)/_components/charts/ui/chart-wrapper';
import StackedBarChart from '@/app/(protected)/_components/charts/ui/stacked-bar-chart';

const IndustryMarketShare = () => {
  const data = [
    { year: 2011, "AAPL US Sales": 100000, "Industry Total Sales ex. AAPL US": 550000 },
    { year: 2012, "AAPL US Sales": 150000, "Industry Total Sales ex. AAPL US": 580000 },
    { year: 2013, "AAPL US Sales": 170000, "Industry Total Sales ex. AAPL US": 680000 },
    { year: 2014, "AAPL US Sales": 180000, "Industry Total Sales ex. AAPL US": 600000 },
    { year: 2015, "AAPL US Sales": 240000, "Industry Total Sales ex. AAPL US": 610000 },
    { year: 2016, "AAPL US Sales": 210000, "Industry Total Sales ex. AAPL US": 630000 },
    { year: 2017, "AAPL US Sales": 220000, "Industry Total Sales ex. AAPL US": 700000 },
    { year: 2018, "AAPL US Sales": 250000, "Industry Total Sales ex. AAPL US": 750000 },
    { year: 2019, "AAPL US Sales": 260000, "Industry Total Sales ex. AAPL US": 760000 },
    { year: 2020, "AAPL US Sales": 280000, "Industry Total Sales ex. AAPL US": 800000 },
    { year: 2021, "AAPL US Sales": 370000, "Industry Total Sales ex. AAPL US": 850000 },
    { year: 2022, "AAPL US Sales": 390000, "Industry Total Sales ex. AAPL US": 880000 },
    { year: 2023, "AAPL US Sales": 380000, "Industry Total Sales ex. AAPL US": 800000 }
  ];

  const categories = [
    { name: "AAPL US Sales", color: "hsl(120, 100%, 35%)" },
    { name: "Industry Total Sales ex. AAPL US", color: "hsl(280, 100%, 50%)" }
  ];

  const dataWithPercentages = data.map(item => {
    const total = item["AAPL US Sales"] + item["Industry Total Sales ex. AAPL US"];
    const percentage = ((item["AAPL US Sales"] / total) * 100).toFixed(1);
    return {
      ...item,
      percentage: `${percentage}%`
    };
  });

  return (
    <ChartWrapper
      title="Industry Market Share - Technology Hardware, Storage (in M USD)"
      tooltipDescription="Revenue of the company for historical reported year and the corresponding total industry revenue.
The percentage number represents the revenue share of the company in its industry."
    >
      <div className="mt-6">
        <StackedBarChart 
          data={dataWithPercentages}
          categories={categories}
          width={800}
          height={400}
          showMarketShare={true}
        />
      </div>
    </ChartWrapper>
  );
};

export default IndustryMarketShare;