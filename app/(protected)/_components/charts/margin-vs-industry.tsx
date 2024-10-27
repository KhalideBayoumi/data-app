"use client";

import React, { useState } from 'react';
import ChartWrapper from '@/app/(protected)/_components/charts/ui/chart-wrapper';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import {
  ChartTooltip,
  ChartTooltipContent,
  ChartContainer,
} from "@/components/ui/chart";

type MarginType = 'Economic' | 'Operational';

const MarginVsIndustry = () => {
  const [selectedMargin, setSelectedMargin] = useState<MarginType>('Economic');

  const data = {
    Economic: [
      { year: 2011, margin: 29, firstQuartile: 6, median: 14, thirdQuartile: 27 },
      { year: 2012, margin: 31, firstQuartile: 7, median: 15, thirdQuartile: 26 },
      { year: 2013, margin: 29, firstQuartile: 7, median: 17, thirdQuartile: 26 },
      { year: 2014, margin: 30, firstQuartile: 8, median: 17, thirdQuartile: 26 },
      { year: 2015, margin: 32, firstQuartile: 7, median: 13, thirdQuartile: 25 },
      { year: 2016, margin: 32, firstQuartile: 7, median: 14, thirdQuartile: 27 },
      { year: 2017, margin: 31, firstQuartile: 8, median: 14, thirdQuartile: 23 },
      { year: 2018, margin: 33, firstQuartile: 8, median: 14, thirdQuartile: 23 },
      { year: 2019, margin: 33, firstQuartile: 9, median: 16, thirdQuartile: 22 },
      { year: 2020, margin: 33, firstQuartile: 8, median: 15, thirdQuartile: 27 },
      { year: 2021, margin: 36, firstQuartile: 7, median: 14, thirdQuartile: 24 },
      { year: 2022, margin: 36, firstQuartile: 8, median: 14, thirdQuartile: 22 },
      { year: 2023, margin: 37, firstQuartile: 9, median: 14, thirdQuartile: 22 },
    ],
    Operational: [
      { year: 2011, margin: 30, firstQuartile: 3, median: 8, thirdQuartile: 17 },
      { year: 2012, margin: 32, firstQuartile: 3, median: 8, thirdQuartile: 17 },
      { year: 2013, margin: 31, firstQuartile: 4, median: 11, thirdQuartile: 17 },
      { year: 2014, margin: 30, firstQuartile: 3, median: 11, thirdQuartile: 17 },
      { year: 2015, margin: 29, firstQuartile: 3, median: 9, thirdQuartile: 17 },
      { year: 2016, margin: 32, firstQuartile: 3, median: 10, thirdQuartile: 18 },
      { year: 2017, margin: 28, firstQuartile: 3, median: 10, thirdQuartile: 17 },
      { year: 2018, margin: 27, firstQuartile: 4, median: 10, thirdQuartile: 15 },
      { year: 2019, margin: 26, firstQuartile: 5, median: 10, thirdQuartile: 15 },
      { year: 2020, margin: 26, firstQuartile: 6, median: 10, thirdQuartile: 16 },
      { year: 2021, margin: 32, firstQuartile: 5, median: 9, thirdQuartile: 16 },
      { year: 2022, margin: 31, firstQuartile: 4, median: 9, thirdQuartile: 15 },
      { year: 2023, margin: 31, firstQuartile: 5, median: 9, thirdQuartile: 15 },
    ]
  };

  const chartConfig = {
    margin: { label: `${selectedMargin} Margin`, color: 'hsl(120, 100%, 35%)' },
    firstQuartile: { label: '1st Quartile', color: 'hsl(280, 100%, 50%)' },
    median: { label: 'Median', color: 'hsl(280, 100%, 50%)' },
    thirdQuartile: { label: '3rd Quartile', color: 'hsl(280, 100%, 50%)' },
  };

  const formatTooltipValue = (value: number) => `${value}%`;

  const headerContent = (
    <div className="flex items-center gap-2">
        <Select value={selectedMargin} onValueChange={(value: MarginType) => setSelectedMargin(value)}>
        <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select margin type" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="Economic">Economic Margin</SelectItem>
            <SelectItem value="Operational">Operational Margin</SelectItem>
        </SelectContent>
        </Select>
    </div>
  );

  return (
    <ChartWrapper
      title="Margin vs. Industry"
      tooltipDescription="Comparison of company margin against industry quartiles"
      headerContent={headerContent}
    >
      <div className="w-full mt-4">
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data[selectedMargin]} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="year"
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tickFormatter={(value) => `${value}%`}
                domain={[0, 'auto']}
                tickLine={false}
                axisLine={false}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[200px]"
                  />
                }
              />
              <Line
                type="monotone"
                dataKey="margin"
                stroke="hsl(120, 100%, 35%)"
                dot={false}
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="thirdQuartile"
                stroke="hsl(280, 100%, 50%)"
                strokeDasharray="5 5"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="median"
                stroke="hsl(280, 100%, 50%)"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="firstQuartile"
                stroke="hsl(280, 100%, 50%)"
                strokeDasharray="5 5"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </ChartWrapper>
  );
};

export default MarginVsIndustry;