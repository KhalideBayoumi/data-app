import React from 'react';
import ChartWrapper from '@/app/(protected)/_components/charts/ui/chart-wrapper';
import StackedBarChart from '@/app/(protected)/_components/charts/ui/stacked-bar-chart';

const DepreciableAssetChart = () => {
  const data = [
    { year: 2011, "Gross Assets Raw": 15000, "Inflation Adjustment": 2000 },
    { year: 2013, "Gross Assets Raw": 25000, "Inflation Adjustment": 3000 },
    { year: 2015, "Gross Assets Raw": 45000, "Inflation Adjustment": 5000 },
    { year: 2017, "Gross Assets Raw": 65000, "Inflation Adjustment": 8000 },
    { year: 2019, "Gross Assets Raw": 85000, "Inflation Adjustment": 10000 },
    { year: 2021, "Gross Assets Raw": 110000, "Inflation Adjustment": 12000 },
    { year: 2023, "Gross Assets Raw": 122000, "Inflation Adjustment": 25000 }
  ];

  const categories = [
    { name: "Gross Assets Raw", color: "hsl(15, 100%, 55%)" },
    { name: "Inflation Adjustment", color: "hsl(200, 100%, 50%)" }
  ];

  return (
    <ChartWrapper
      title="Depreciable Asset Inflation Adjustment (in M USD)"
      tooltipDescription="Gross asset unadjusted for inflation and the adjustment made to match the inflation evolution during the asset base historic life."
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

export default DepreciableAssetChart;