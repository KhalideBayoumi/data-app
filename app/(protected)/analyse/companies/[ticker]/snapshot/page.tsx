import SpotMetrics from "@/app/(protected)/_components/charts/spot-metrics";
import IndustryRank from "@/app/(protected)/_components/company/industry-rank";
import GrowthMetrics from "@/app/(protected)/_components/charts/growth-metrics";
import SharePrice from "@/app/(protected)/_components/charts/share-price";

const growthMetricsData = {
    "Eco. Cash-Flow": [
        { name: "5y", company: 5, industry: 1 },
        { name: "3y", company: 10, industry: 3 },
        { name: "1y", company: -2, industry: -3 },
        { name: "1y Fwd", company: 3, industry: 5 },
        { name: "2y Fwd", company: 5, industry: 4 }
    ],
    "Eco. Revenues": [
        { name: "5y", company: 7, industry: 2 },
        { name: "3y", company: 12, industry: 2 },
        { name: "1y", company: -3, industry: -4 },
        { name: "1y Fwd", company: 2, industry: 6 },
        { name: "2y Fwd", company: 4, industry: 4 }
    ],
    "Accounting EPS": [
        { name: "5y", company: 6, industry: 3 },
        { name: "3y", company: 11, industry: 4 },
        { name: "1y", company: -1, industry: -2 },
        { name: "1y Fwd", company: 4, industry: 7 },
        { name: "2y Fwd", company: 6, industry: 5 }
    ]
};

const SnapshotPage = () => {
    return ( 
        <div className="w-full">
            <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/3 pr-4">
                    <SpotMetrics />
                </div>
                <div className="w-full md:w-1/3 px-2">
                    <IndustryRank />
                </div>
                <div className="w-full md:w-1/3 pl-4 flex flex-col">
                    <div className="h-1/2 mb-4">
                        <GrowthMetrics data={growthMetricsData} />
                    </div>
                    <div className="h-1/2 pt-3">
                        <SharePrice />
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default SnapshotPage;