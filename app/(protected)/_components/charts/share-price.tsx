"use client";

import React from 'react';
import ChartWrapper from '@/app/(protected)/_components/charts/ui/chart-wrapper';
import AreaChart from '@/app/(protected)/_components/charts/ui/area-chart';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const generateDailyData = () => {
  const end = new Date('2024-09-27');
  const start = new Date('2023-12-01');
  const data = [];
  let currentDate = new Date(start);
  let basePrice = 180;

  while (currentDate <= end) {
    basePrice += (Math.random() - 0.5) * 2;
    data.push({
      date: currentDate.toISOString().split('T')[0],
      price: Number(basePrice.toFixed(2))
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return data;
};

const data = generateDailyData();

const formatXAxis = (tickItem: string) => {
  const date = new Date(tickItem);
  return months[date.getMonth()];
};

const formatTooltipDate = (value: string) => {
  const date = new Date(value);
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

const SharePrice: React.FC = () => {
  return (
    <ChartWrapper
      title="Share Price (in USD)"
      tooltipDescription="The evolution of the market capitalisation of the company as observed in the market over the last 6 months. It is displayed in USD."
    >
      <AreaChart
        data={data}
        xDataKey="date"
        yDataKey="price"
        formatXAxis={formatXAxis}
        formatTooltipDate={formatTooltipDate}
        yAxisFormatter={(value) => `$${value.toFixed(2)}`}
        height={300}
      />
    </ChartWrapper>
  );
};

export default SharePrice;