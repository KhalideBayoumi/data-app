"use client";

import React from 'react';
import InvisibleCapital from '@/app/(protected)/_components/charts/invisible-capital';
import CapitalizedBreakdown from '@/app/(protected)/_components/charts/capitalized-breakdown';
import InvisibleCapexChart from '@/app/(protected)/_components/charts/invisible-capex';

const InvisibleCapitalPage = () => {
    const cardClasses = "overflow-auto w-full";
    
    return (
        <div>
            <div className="h-full flex flex-col md:flex-row gap-4 py-4">
                <div className="flex-1 flex">
                    <div className={`${cardClasses}`}>
                        <InvisibleCapexChart />
                    </div>
                </div>

                <div className="flex-1 flex">
                    <div className={`${cardClasses}`}>
                        <InvisibleCapital 
                            data={[
                                { name: 'R&D Life', value: 40, color: 'hsl(var(--chart-1))' },
                                { name: 'Advertising Life', value: 30, color: 'hsl(var(--chart-5))' },
                                { name: 'Other', value: 30, color: 'hsl(var(--chart-6))' },
                            ]}
                        />
                    </div>
                </div>

                <div className="flex-1 flex">
                    <div className={`${cardClasses}`}>
                        <CapitalizedBreakdown />
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default InvisibleCapitalPage;