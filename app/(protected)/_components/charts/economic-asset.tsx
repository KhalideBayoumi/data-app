import React from 'react';
import GenericMultiLineChart from '@/app/(protected)/_components/charts/ui/multi-line-chart';
import ChartWrapper from '@/app/(protected)/_components/charts/ui/chart-wrapper';
import { ChartContainer } from "@/components/ui/chart";
import { Tooltip, TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

type DataPoint = {
  year: number;
  ecoAM: number;
  ecoAMLow: number;
  ecoAMHigh: number;
  ecoCR: number;
};

const mockData: DataPoint[] = [
  { year: 2011, ecoAM: 9.2, ecoAMLow: 7.0, ecoAMHigh: 11.5, ecoCR: 13.5 },
  { year: 2013, ecoAM: 8.0, ecoAMLow: 6.0, ecoAMHigh: 12.5, ecoCR: 12.5 },
  { year: 2015, ecoAM: 11.2, ecoAMLow: 8.5, ecoAMHigh: 12.8, ecoCR: 13.8 },
  { year: 2017, ecoAM: 8.0, ecoAMLow: 6.2, ecoAMHigh: 10.0, ecoCR: 9.0 },
  { year: 2019, ecoAM: 7.4, ecoAMLow: 5.6, ecoAMHigh: 9.5, ecoCR: 7.5 },
  { year: 2021, ecoAM: 18.5, ecoAMLow: 15.8, ecoAMHigh: 22.0, ecoCR: 10.0 },
  { year: 2023, ecoAM: 16.5, ecoAMLow: 13.0, ecoAMHigh: 19.5, ecoCR: 9.5 },
  { year: 2025, ecoAM: 15.0, ecoAMLow: 12.0, ecoAMHigh: 17.0, ecoCR: 7.8 },
];

const EconomicAsset = () => {
  const lines = [
    { dataKey: 'ecoAM', name: 'Eco A.M.', color: '#ff69b4' },
    { dataKey: 'ecoAMLow', name: 'Eco A.M. Low', color: '#ff69b4', dashArray: '5 5', dot: false },
    { dataKey: 'ecoAMHigh', name: 'Eco A.M. High', color: '#ff69b4', dashArray: '5 5', dot: false },
    { dataKey: 'ecoCR', name: 'Eco C.R.', color: '#ffffff' },
  ];

  const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded p-2 shadow-md">
          <p className="font-bold">{`${label}`}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                <div
                  className="h-2.5 w-2.5 mr-2 rounded-[2px]"
                  style={{ backgroundColor: entry.color }}
                />
                <span>{entry.name}</span>
              </div>
              <span className="ml-4 font-mono">
                {typeof entry.value === 'number' ? entry.value.toFixed(1) : entry.value}
                <span className="text-muted-foreground">x</span>
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <ChartWrapper
      title="Economic Asset Multiple vs Relative Cash Return"
      tooltipDescription="Economic Asset Multiple is formed by a company's Economic Assets divided by its Economic Enterprise Value. Relative Cash Return corresponds to the Economic ROI / Cost of Capital, and is expressed as a multiple."
    >
      <div className="flex justify-start gap-4 mt-1 text-xs mb-4">
        {lines.map((line, index) => (
          <div key={index} className="flex items-center">
            <div 
              className="w-2 h-2 rounded-full mr-1" 
              style={{ 
                backgroundColor: line.color,
                borderStyle: line.dashArray ? 'dashed' : 'solid',
                borderWidth: line.dashArray ? '1px' : '0',
              }}
            />
            <span>{line.name}</span>
          </div>
        ))}
      </div>
      <ChartContainer
        config={{
          ecoAM: { label: 'Eco A.M.', color: '#ff69b4' },
          ecoAMLow: { label: 'Eco A.M. Low', color: '#ff69b4' },
          ecoAMHigh: { label: 'Eco A.M. High', color: '#ff69b4' },
          ecoCR: { label: 'Eco C.R.', color: '#ffffff' },
        }}
      >
        <GenericMultiLineChart 
          data={mockData} 
          lines={lines}
          xAxisKey="year"
          yAxisDomain={[0, 'dataMax + 2']}
          yAxisTickFormatter={(value: number) => `${value.toFixed(1)}x`}
          height={300}
        >
          <Tooltip content={<CustomTooltip />} />
        </GenericMultiLineChart>
      </ChartContainer>
    </ChartWrapper>
  );
};

export default EconomicAsset;