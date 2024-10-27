import React from 'react';
import ChartWrapper from '@/app/(protected)/_components/charts/ui/chart-wrapper';
import StackedBarChart from '@/app/(protected)/_components/charts/ui/stacked-bar-chart';

const EconomicCashFlow = () => {
    const data = [
      { year: 2011, "Income Tax Expense": -8000, "Economic Revenue": 95000, "Op. Cost": -65000, "Invisible CAPEX": -4000, "Income Tax Shield": 2500, "Leasing CAPEX": -1500 },
      { year: 2013, "Income Tax Expense": -12000, "Economic Revenue": 130000, "Op. Cost": -85000, "Invisible CAPEX": -6000, "Income Tax Shield": 3500, "Leasing CAPEX": -2500 },
      { year: 2015, "Income Tax Expense": -18000, "Economic Revenue": 180000, "Op. Cost": -110000, "Invisible CAPEX": -9000, "Income Tax Shield": 5000, "Leasing CAPEX": -3500 },
      { year: 2017, "Income Tax Expense": -22000, "Economic Revenue": 220000, "Op. Cost": -140000, "Invisible CAPEX": -11000, "Income Tax Shield": 6000, "Leasing CAPEX": -4500 },
      { year: 2019, "Income Tax Expense": -28000, "Economic Revenue": 280000, "Op. Cost": -170000, "Invisible CAPEX": -14000, "Income Tax Shield": 7500, "Leasing CAPEX": -5500 },
      { year: 2021, "Income Tax Expense": -32000, "Economic Revenue": 320000, "Op. Cost": -200000, "Invisible CAPEX": -16000, "Income Tax Shield": 8500, "Leasing CAPEX": -6500 },
      { year: 2023, "Income Tax Expense": -38000, "Economic Revenue": 380000, "Op. Cost": -230000, "Invisible CAPEX": -19000, "Income Tax Shield": 9500, "Leasing CAPEX": -7500 },
      { year: "2025E", "Income Tax Expense": -42000, "Economic Revenue": 420000, "Op. Cost": -260000, "Invisible CAPEX": -21000, "Income Tax Shield": 10500, "Leasing CAPEX": -8500 },
    ];

  const categories = [
    { name: "Income Tax Expense", color: "hsl(var(--chart-1))" },
    { name: "Economic Revenue", color: "hsl(var(--chart-2))" },
    { name: "Op. Cost", color: "hsl(var(--chart-3))" },
    { name: "Invisible CAPEX", color: "hsl(var(--chart-4))" },
    { name: "Income Tax Shield", color: "hsl(var(--chart-5))" },
    { name: "Leasing CAPEX", color: "hsl(var(--chart-6))" },
  ];

  return (
    <ChartWrapper
      title="Economic Cash-Flow (in M USD)"
      tooltipDescription="Breakdown of economic cash flow components over time."
    >
      <StackedBarChart 
        data={data}
        categories={categories}
        width={500}
        height={320}
        showReferenceLine={true} 
      />
    </ChartWrapper>
  );
};

export default EconomicCashFlow;