"use client";

import React from 'react';
import AssetBaseBreakdown from '@/app/(protected)/_components/charts/asset-base-breakdown';
import EconomicLifeHistory from '@/app/(protected)/_components/charts/economic-life-history';
import DepreciableAssetChart from '@/app/(protected)/_components/charts/depreciable-asset-chart';

const EconomicLifePage = () => {
    const cardClasses = "overflow-auto w-full";
    
    return (
        <div>
            <div className="h-full flex flex-col md:flex-row gap-4 py-4">
                <div className="flex-1 flex">
                    <div className={`${cardClasses}`}>
                        <AssetBaseBreakdown />
                    </div>
                </div>

                <div className="flex-1 flex">
                    <div className={`${cardClasses}`}>
                        <EconomicLifeHistory />
                    </div>
                </div>

                <div className="flex-1 flex">
                    <div className={`${cardClasses}`}>
                        <DepreciableAssetChart />
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default EconomicLifePage;