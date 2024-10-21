"use client";

import React from 'react';
import ChartWrapper from '@/app/(protected)/_components/charts/ui/chart-wrapper';
import InvisibleCapital from '@/app/(protected)/_components/charts/invisible-capital';
import CapitalizedBreakdown from '@/app/(protected)/_components/charts/capitalized-breakdown';
import InvisibleCapexChart from '@/app/(protected)/_components/charts/invisible-capex';

const InvisibleCapitalPage = () => {
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <InvisibleCapexChart />        
        <InvisibleCapital 
            data={[
                { name: 'R&D Life', value: 40, color: 'hsl(var(--chart-1))' },
                { name: 'Advertising Life', value: 30, color: 'hsl(var(--chart-5))' },
                { name: 'Other', value: 30, color: 'hsl(var(--chart-6))' },
            ]}
        />
        
        <CapitalizedBreakdown />
      </div>
    </div>
  );
};  

export default InvisibleCapitalPage;