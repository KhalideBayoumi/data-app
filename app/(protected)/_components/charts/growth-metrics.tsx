"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Info } from "lucide-react";
import ReusableTooltip from '../reusable-tooltip';
import DualBarCharts from '@/app/(protected)/_components/charts/ui/dual-bar-chart';

const GrowthMetrics: React.FC<{ data: any }> = ({ data }) => {
  const [selectedMetric, setSelectedMetric] = useState("Eco. Cash-Flow");

  return (
    <Card className="w-full h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="flex justify-between items-center text-lg">
          <ReusableTooltip
            description={
                "Growth Metrics"
            }
            trigger={
                <span className="flex items-center cursor-pointer">
                <Info className="h-3 w-3 inline-block mr-1" />
                <span className="flex flex-col">
                  <span>Growth Metrics</span>
                  <span className="text-sm font-normal text-muted-foreground">
                    CAGR FY 2022
                  </span>
                </span>
              </span>
            }
          />
        </CardTitle>
        <Select value={selectedMetric} onValueChange={setSelectedMetric}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select metric" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Eco. Cash-Flow">Eco. Cash-Flow</SelectItem>
            <SelectItem value="Eco. Revenues">Eco. Revenues</SelectItem>
            <SelectItem value="Accounting EPS">Accounting EPS</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <DualBarCharts data={data[selectedMetric]} />
      </CardContent>
    </Card>
  );
};

export default GrowthMetrics;