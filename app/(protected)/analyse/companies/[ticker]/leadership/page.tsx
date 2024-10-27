"use client";

import React from 'react';
import IndustryMarketShare from "@/app/(protected)/_components/charts/industry-market-share";
import MarginVsIndustry from "@/app/(protected)/_components/charts/margin-vs-industry";

const LeadershipPage = () => {
    const cardClasses = "overflow-auto w-full";
    
    return (
        <div>
            <div className="h-full flex flex-col md:flex-row gap-4 py-4">
                <div className="flex-1 flex">
                    <div className={`${cardClasses}`}>
                        <IndustryMarketShare />
                    </div>
                </div>
                <div className="flex-1 flex">
                    <div className={`${cardClasses}`}>
                        <MarginVsIndustry />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LeadershipPage;