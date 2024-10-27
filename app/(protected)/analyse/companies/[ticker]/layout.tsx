"use client";

import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Scoring from "@/app/(protected)/_components/charts/scoring";
import CompanyDesc from "@/app/(protected)/_components/company/company-desc";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface CompanyPageProps {
    params: { ticker: string };
    children: React.ReactNode;
}

const companyData = [
    {
      name: "Apple Inc",
      code: "028050",
      ticker: "AAPL",
      sector: "Technology Hardware, Storage",
      logo: "https://app.dataguru.world/flags/us.svg",
      status: 'live',
      description: "Apple Inc. is a global technology company headquartered in the United States, known for its innovative consumer electronics, software, and services, including the iPhone, iPad, Mac, and Apple Watch. It operates in numerous countries, emphasizing design and user experience.",
      details: [
        { key: "country", value: "UNITED STATES" },
        { key: "currency", value: "USD" },
        { key: "market cap", value: "USD 3506.1 bn" },
        { key: "accounting standard", value: "US GAAP" },
        { key: "last fiscal year", value: "30/09/2023" },
        { key: "last update date", value: "30/08/2024" },
      ],
      adjustments: [
        { label: "Marketing & Advertising", description: "Advertising and Marketing are treated as expenses in traditional accounting. As they participate in building a company's competitive edge, through its brand and overall recognition, they are to be capitalized (as 'invisible capital invested') and added to its Economic Assets." },
        { label: "Deferred Revenues", description: "Deferred revenue, or unearned revenue, refers to advance payments for products or services that are to be delivered in the future. The recipient of such prepayment records unearned revenue as a liability on a balance sheet." },
        { label: "Goodwill Treatment", description: "Goodwill isn't an operating asset and doesn't produce any cash. It just underlines past acquisitions cumulated spreads. Therefore, it must be removed from a company's Economic Assets." },
        { label: "Inflation", description: "100 dollars today do not have the same purchasing power as that of n years ago. For this reason, operating assets need to be adjusted for inflation based on their estimated age and country." },
        { label: "Research & Development", description: "Research and Development are treated as expenses in traditional accounting. As they participate in building a company's competitive edge, through innovation, they are to be capitalized (as 'invisible capital invested') and added to its Economic Assets." },
      ],
    },
    {
      name: "Solar Applied Materials Technology Corp",
      code: "028048",
      ticker: "1785.TWO",
      sector: "Chemicals",
      logo: "https://app.dataguru.world/flags/tw.svg",
      status: 'off',
      description: "Solar Applied Materials Technology Corp. specializes in manufacturing and distributing high-purity metals and materials for electronic and optoelectronic industries, with a strong presence in Asia. Known for its innovative solutions in thin-film and sputtering targets.",
      details: [
        { key: "country", value: "TAIWAN" },
        { key: "currency", value: "TWD" },
        { key: "market cap", value: "No Data" },
        { key: "accounting standard", value: "IAS/IFRS" },
        { key: "last fiscal year", value: "31/12/2020" },
        { key: "last update date", value: "No Data" },
      ]
    },
    {
      name: "Golden Solar New Energy Technology Holdings Ltd",
      code: "028657",
      ticker: "1121.HK",
      sector: "Textiles, Apparel & Luxury Goods",
      logo: "https://app.dataguru.world/flags/cn.svg",
      status: 'pending',
      description: "Golden Solar New Energy Technology Holdings Ltd specializes in the development, manufacture, and sale of solar energy products, focusing on innovative and efficient solar panels and related technologies. It operates primarily in Asia, catering to both commercial and residential sectors.",
      details: [
        { key: "country", value: "CHINA" },
        { key: "currency", value: "CNY" },
        { key: "market cap", value: "USD 110.4 mn" },
        { key: "accounting standard", value: "IAS/IFRS" },
        { key: "last fiscal year", value: "31/12/2020" },
        { key: "last update date", value: "31/08/2012" },
      ]
    }
  ];

// "Pending" Status
const PendingStatus = () => (
    <Card className="border border-yellow-200">
        <CardHeader>
            <CardTitle>
                <span className="text-lg font-semibold">Company Status:</span>
            </CardTitle>
            <CardDescription>
                <span className="text-amber-300 font-semibold">Pending New Company Review</span>
            </CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-1">
            <p>The company has just been added to DataGuru&apos;s coverage, and is currently under review.</p>
            <p className='italic mt-2'>At this stage, no information is available for the company, but should be released in a timely manner.</p>
            <button className="mt-4 bg-yellow-600 text-white px-4 py-2 rounded text-sm uppercase">Ask to Initiate Coverage</button>
        </CardContent>
    </Card>
);

// "Off" Status
const OffStatus = () => (
    <Card className="border border-red-700">
        <CardHeader>
            <CardTitle>
                <span className="text-lg font-semibold">Company Status:</span>
            </CardTitle>
            <CardDescription>
                <span className="text-red-700 font-semibold">Status Not Identified</span>
            </CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-1">
            <p>The company&apos;s status is currently under review by our analysts.</p>
            <p className='italic mt-2'>No data will be available for the company.</p>
            <button className="mt-4 bg-red-600 text-white px-4 py-2 rounded text-sm uppercase">Ask to Initiate Coverage</button>
        </CardContent>
    </Card>
);

const CompanyPage = ({ params, children }: CompanyPageProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const currentTab = pathname.split('/').pop() || 'snapshot';

    const [companyStatus, setCompanyStatus] = useState<string>('live');

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
        const tab = tabs.find(t => t.value === value);
        if (!tab?.disabled) {
            router.push(`/analyse/companies/${params.ticker}/${value}`);
        }
    };

    useEffect(() => {
        const company = companyData.find(company => company.ticker === params.ticker);
        if (company) {
            setCompanyStatus(company.status);
        } else {
            setCompanyStatus('off'); // Default to 'off' if company not found
        }
    }, [params.ticker]);

    return ( 
        <main className="flex flex-1 flex-col gap-4 px-4 md:gap-8 md:px-8">
            <div className="space-y-2">
                <div className="grid gap-4 md:grid-cols-4">
                    <CompanyDesc ticker={params.ticker} />
                    {companyStatus === 'live' && <Scoring />}
                    {companyStatus === 'pending' && <PendingStatus />}
                    {companyStatus === 'off' && <OffStatus />}
                </div>
                {companyStatus === 'live' && 
                    <div className="w-full">
                       <Tabs value={currentTab} onValueChange={handleTabChange} className="space-y-4 py-4">
                            <TabsList className="w-full flex flex-wrap justify-between">
                                {tabs.map((tab) => (
                                    <TabsTrigger 
                                        key={tab.value}
                                        value={tab.value}
                                        disabled={tab.disabled}
                                        className={tab.disabled ? 'cursor-not-allowed opacity-50' : ''}
                                    >
                                        <span className="flex items-center">
                                            {tab.label}
                                            {tab.beta && (
                                                <span className="ml-1 text-xs font-normal text-muted-foreground">
                                                    (beta)
                                                </span>
                                            )}
                                        </span>
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </Tabs>
                        {children}
                    </div>
                }
            </div>
        </main>
     );
}

export default CompanyPage;
