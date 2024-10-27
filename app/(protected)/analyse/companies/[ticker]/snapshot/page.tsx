import React from 'react';
import SpotMetrics from "@/app/(protected)/_components/charts/spot-metrics";
import IndustryRank from "@/app/(protected)/_components/industry-rank";
import GrowthMetrics from "@/app/(protected)/_components/charts/growth-metrics";
import SharePrice from "@/app/(protected)/_components/charts/share-price";

const SnapshotPage = () => {
    const cardClasses = " w-full overflow-auto";
    
    return ( 
        <div>
            <div className="h-full flex flex-col md:flex-row gap-4 py-4">
                <div className="flex-1 flex">
                    <div className={`${cardClasses}`}>
                        <SpotMetrics />
                    </div>
                </div>

                <div className="flex-1 flex">
                    <div className={`${cardClasses}`}>
                        <IndustryRank />
                    </div>
                </div>

                <div className="flex-1 flex flex-col gap-4">
                    <div className={cardClasses}>
                        <GrowthMetrics />
                    </div>
                    <div className={cardClasses}>
                        <SharePrice />
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default SnapshotPage;