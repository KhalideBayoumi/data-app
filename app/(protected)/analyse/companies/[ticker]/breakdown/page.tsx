"use client";

import React from 'react';
import EconomicAssets from "@/app/(protected)/_components/charts/economic-assets";
import EconomicCashFlow from "@/app/(protected)/_components/charts/economic-cash-flow";
import EconomicEnterpriseValue from "@/app/(protected)/_components/charts/economic-enterprise-value";

const BreakdownPage = () => {
    const cardClasses = "overflow-auto w-full h-[400px]";
    
    return (
        <div>
            <div className="h-full flex flex-col md:flex-row gap-4 py-4">
                <div className="flex-1 flex">
                    <div className={`${cardClasses}`}>
                        <EconomicCashFlow />
                    </div>
                </div>

                <div className="flex-1 flex">
                    <div className={`${cardClasses}`}>
                        <EconomicAssets />
                    </div>
                </div>

                <div className="flex-1 flex">
                    <div className={`${cardClasses}`}>
                        <EconomicEnterpriseValue />
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default BreakdownPage;