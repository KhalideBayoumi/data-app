"use client";

import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { RadarDots } from "@/app/(protected)/_components/charts/radar-dots";
import CompanyDesc from "@/app/(protected)/_components/company/company-desc";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CompanyPageProps {
    params: { ticker: string };
    children: React.ReactNode;
}

const CompanyPage = ({ params, children }: CompanyPageProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const currentTab = pathname.split('/').pop() || 'snapshot';

    const tabs = [
        { value: "snapshot", label: "Snapshot" },
        { value: "history", label: "Historical Infos" },
        { value: "invisiblecapital", label: "Invisible Capital" },
        { value: "breakdown", label: "Breakdown" },
        { value: "economiclife", label: "Economic Life" },
        { value: "leadership", label: "Leadership" },
        { value: "pointintime", label: "Point in Time" },
        { value: "impliedpricing", label: "Implied Pricing", disabled: true, beta: true },
        { value: "valuecreation", label: "Value Creation", disabled: true },
        { value: "scoring", label: "Scoring", disabled: true }
    ];

    const handleTabChange = (value: string) => {
        router.push(`/analyse/companies/${params.ticker}/${value}`);
    };

    return ( 
        <main className="flex flex-1 flex-col gap-4 px-4 pb-4 md:gap-8 md:px-8 md:pb-8">
            <div className="space-y-2">
                <div className="grid gap-4 md:grid-cols-4">
                    <CompanyDesc />
                    <RadarDots />
                </div>
                <div className="w-full">
                    <Tabs value={currentTab} onValueChange={handleTabChange} className="space-y-4 py-4">
                        <TabsList className="w-full flex flex-wrap justify-between">
                            {tabs.map((tab) => (
                                <TabsTrigger 
                                    key={tab.value}
                                    value={tab.value}
                                    disabled={tab.disabled}
                                    asChild
                                >
                                    <Link href={`/analyse/companies/${params.ticker}/${tab.value}`}>
                                        {tab.label}
                                        {tab.beta && <span className="ml-1 text-xs font-normal text-muted-foreground">(beta)</span>}
                                    </Link>
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </Tabs>
                    {children}
                </div>
            </div>
        </main>
     );
}
 
export default CompanyPage;