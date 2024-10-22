import React from 'react';
import ChartWrapper from '@/app/(protected)/_components/charts/ui/chart-wrapper';
import StackedBarChart from '@/app/(protected)/_components/charts/ui/stacked-bar-chart';

const EconomicEnterpriseValue = () => {
    const data = [
      { year: 2011, "Associates": 50000, "Net Debt": -100000, "Market Cap.": 500000, "Deferred Revenue": 10000, "Leasing Capitalized": 5000, "Minorities": 2000, "Financial Provisions": 1000, "Pension Obligations": 5000 },
      { year: 2013, "Associates": 60000, "Net Debt": -120000, "Market Cap.": 600000, "Deferred Revenue": 12000, "Leasing Capitalized": 6000, "Minorities": 2500, "Financial Provisions": 1200, "Pension Obligations": 6000 },
      { year: 2015, "Associates": 70000, "Net Debt": -140000, "Market Cap.": 800000, "Deferred Revenue": 15000, "Leasing Capitalized": 7000, "Minorities": 3000, "Financial Provisions": 1500, "Pension Obligations": 7000 },
      { year: 2017, "Associates": 80000, "Net Debt": -160000, "Market Cap.": 1200000, "Deferred Revenue": 18000, "Leasing Capitalized": 8000, "Minorities": 3500, "Financial Provisions": 1800, "Pension Obligations": 8000 },
      { year: 2019, "Associates": 90000, "Net Debt": -180000, "Market Cap.": 2000000, "Deferred Revenue": 22000, "Leasing Capitalized": 10000, "Minorities": 4000, "Financial Provisions": 2200, "Pension Obligations": 9000 },
      { year: 2021, "Associates": 100000, "Net Debt": -200000, "Market Cap.": 2800000, "Deferred Revenue": 26000, "Leasing Capitalized": 12000, "Minorities": 4500, "Financial Provisions": 2600, "Pension Obligations": 10000 },
      { year: 2023, "Associates": 110000, "Net Debt": -220000, "Market Cap.": 3200000, "Deferred Revenue": 30000, "Leasing Capitalized": 14000, "Minorities": 5000, "Financial Provisions": 3000, "Pension Obligations": 11000 },
      { year: "2025E", "Associates": 120000, "Net Debt": -240000, "Market Cap.": 3600000, "Deferred Revenue": 35000, "Leasing Capitalized": 16000, "Minorities": 5500, "Financial Provisions": 3500, "Pension Obligations": 12000 },
    ];
  
    const categories = [
      { name: "Associates", color: "hsl(var(--chart-1))" },
      { name: "Net Debt", color: "hsl(var(--chart-2))" },
      { name: "Market Cap.", color: "hsl(var(--chart-3))" },
      { name: "Deferred Revenue", color: "hsl(var(--chart-4))" },
      { name: "Leasing Capitalized", color: "hsl(var(--chart-5))" },
      { name: "Minorities", color: "hsl(var(--chart-6))" },
      { name: "Financial Provisions", color: "hsl(var(--chart-7))" },
      { name: "Pension Obligations", color: "hsl(var(--chart-8))" },
    ];
  
    return (
      <ChartWrapper
        title="Economic Enterprise Value (in M USD)"
        tooltipDescription="Breakdown of economic enterprise value components over time."
      >
        <StackedBarChart 
          data={data}
          categories={categories}
          width={500}
          height={300}
          showReferenceLine={true} 
        />
      </ChartWrapper>
    );
  };

export default EconomicEnterpriseValue;