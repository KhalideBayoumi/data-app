import React from 'react';
import SpotMetrics from "@/app/(protected)/_components/charts/spot-metrics";
import IndustryRank from "@/app/(protected)/_components/industry-rank";
import GrowthMetrics from "@/app/(protected)/_components/charts/growth-metrics";
import SharePrice from "@/app/(protected)/_components/charts/share-price";

const SnapshotPage = () => {
    return ( 
        <div className="w-full h-[calc(100vh-4rem)] flex flex-col">
            <div className="flex-grow flex flex-col md:flex-row">
                <div className="w-full md:w-1/3 p-4 flex flex-col">
                    <div className="flex-grow bg-card rounded-lg shadow-md overflow-auto">
                        <SpotMetrics />
                    </div>
                </div>
                <div className="w-full md:w-1/3 p-4 flex flex-col max-h-[calc(100vh-4rem)]">
                    <div className="flex-grow bg-card rounded-lg shadow-md overflow-y-auto">
                        <IndustryRank />
                    </div>
                </div>
                <div className="w-full md:w-1/3 p-4 flex flex-col">
                    <div className="flex-grow bg-card rounded-lg shadow-md overflow-auto mb-4">
                        <GrowthMetrics />
                    </div>
                    <div className="flex-grow bg-card rounded-lg shadow-md overflow-auto">
                        <SharePrice />
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default SnapshotPage;