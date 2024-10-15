"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ChartContainer } from "@/components/ui/chart";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import ReusableTooltip from '../reusable-tooltip';

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

const formatXAxis = (tickItem: number) => {
  const date = new Date(tickItem);
  return months[date.getMonth()];
};

const formatTooltipDate = (value: number) => {
  const date = new Date(value);
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

interface ChartColors {
  area?: string;
}

export interface ChartConfig {
  [key: string]: any;  // This allows for any string-indexed properties
  colors?: ChartColors;
}

interface ChartContainerProps {
  config: ChartConfig;
  children: React.ReactNode;
}

const chartConfig: ChartConfig = {
  // Minimal configuration to prevent errors
  colors: {
    area: '#4ade80',
  },
};

const SharePrice = () => {
  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader className="pb-2">
        <CardTitle className="font-medium flex items-center text-lg">
          <ReusableTooltip
              description={
               "Share Price"
              }
              trigger={
                  <div className="flex items-center cursor-pointer">
                    <Info className="h-3 w-3 inline-block mr-1" />
                    <div className="flex flex-col">
                      <div>
                        Share Price
                        <span className="text-sm font-normal text-muted-foreground ml-2">
                          (in USD)
                        </span>
                      </div>
                      
                    </div>
                  </div>
              }
            />
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4ade80" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#4ade80" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="date" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#888', fontSize: 10 }}
                  tickFormatter={formatXAxis}
                  interval="preserveStartEnd"
                  minTickGap={30}
                  dy={10}
                />
                <YAxis 
                  domain={['dataMin - 10', 'dataMax + 10']} 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#888', fontSize: 10 }}
                  width={40}
                  tickCount={6}
                />
                <Tooltip 
                  labelFormatter={formatTooltipDate}
                  formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
                />
                <Area 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#4ade80" 
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorPrice)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SharePrice;