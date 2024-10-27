import React from 'react';
import MultiSemiCircleChart from './ui/multi-semi-circle-chart';

const AverageAssetLife = () => {
  const data = [
    { name: 'Machinery', value: 15, color: '#ff5722' },
    { name: 'Building', value: 25, color: '#2196f3' },
    { name: 'Other', value: 10, color: '#f44336' },
    { name: 'Natural Resources', value: 20, color: '#9c27b0' },
    { name: 'Leasehold Improvements', value: 12, color: '#4caf50' },
    { name: 'Intangibles', value: 8, color: '#3f51b5' },
    { name: 'Leasing', value: 5, color: '#ffc107' }
  ];

  return (
    <MultiSemiCircleChart
      data={data}
      title="Average Asset Life (years)"
      tooltipDescription="Average life span of different asset types as of FY2023"
    />
  );
};

export default MultiSemiCircleChart;