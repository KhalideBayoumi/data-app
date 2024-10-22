import React from 'react';
import ChartWrapper from '@/app/(protected)/_components/charts/ui/chart-wrapper';
import StackedBarChart from '@/app/(protected)/_components/charts/ui/stacked-bar-chart';

const EconomicAssets = () => {
    const data = [
      { year: 2011, "Net Working Capital": -5000, "Net Tangible & Intangible Assets": 20000, "Other Long-Term Assets": 5000, "Capitalized Invisible CAPEX": 2000, "Capitalized Leasing": 1000 },
      { year: 2013, "Net Working Capital": -10000, "Net Tangible & Intangible Assets": 30000, "Other Long-Term Assets": 8000, "Capitalized Invisible CAPEX": 4000, "Capitalized Leasing": 2000 },
      { year: 2015, "Net Working Capital": -15000, "Net Tangible & Intangible Assets": 45000, "Other Long-Term Assets": 12000, "Capitalized Invisible CAPEX": 7000, "Capitalized Leasing": 3000 },
      { year: 2017, "Net Working Capital": -20000, "Net Tangible & Intangible Assets": 60000, "Other Long-Term Assets": 18000, "Capitalized Invisible CAPEX": 11000, "Capitalized Leasing": 5000 },
      { year: 2019, "Net Working Capital": -25000, "Net Tangible & Intangible Assets": 80000, "Other Long-Term Assets": 25000, "Capitalized Invisible CAPEX": 16000, "Capitalized Leasing": 7000 },
      { year: 2021, "Net Working Capital": -30000, "Net Tangible & Intangible Assets": 100000, "Other Long-Term Assets": 35000, "Capitalized Invisible CAPEX": 22000, "Capitalized Leasing": 10000 },
      { year: 2023, "Net Working Capital": -35000, "Net Tangible & Intangible Assets": 120000, "Other Long-Term Assets": 45000, "Capitalized Invisible CAPEX": 30000, "Capitalized Leasing": 13000 },
      { year: "2025E", "Net Working Capital": -40000, "Net Tangible & Intangible Assets": 140000, "Other Long-Term Assets": 55000, "Capitalized Invisible CAPEX": 40000, "Capitalized Leasing": 17000 },
    ];
  
    const categories = [
      { name: "Net Working Capital", color: "hsl(var(--chart-1))" },
      { name: "Net Tangible & Intangible Assets", color: "hsl(var(--chart-2))" },
      { name: "Other Long-Term Assets", color: "hsl(var(--chart-3))" },
      { name: "Capitalized Invisible CAPEX", color: "hsl(var(--chart-4))" },
      { name: "Capitalized Leasing", color: "hsl(var(--chart-5))" },
    ];
  
    return (
      <ChartWrapper
        title="Economic Assets (in M USD)"
        tooltipDescription="Breakdown of economic assets over time."
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

export default EconomicAssets;