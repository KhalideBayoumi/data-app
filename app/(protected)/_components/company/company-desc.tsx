import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BarChart2, BookOpen, Calendar, Clock, DollarSign, Globe, Info } from "lucide-react";
import ReusableTooltip from "@/app/(protected)/_components/reusable-tooltip";
import AvatarWithStatus, { ValidStatus, statusColors } from '@/app/(protected)/_components/company/avatar-with-status';

const companyData = [
  {
    name: "Apple Inc",
    code: "028050",
    ticker: "AAPL",
    sector: "Technology Hardware, Storage",
    logo: "https://app.dataguru.world/flags/us.svg",
    status: 'live' as ValidStatus,
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
    status: 'off' as ValidStatus,
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
    status: 'pending' as ValidStatus,
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

interface CompanyDescProps {
  ticker: string;
}

const getInitials = (company: string) => {
  return company.charAt(0).toUpperCase();
};

const CompanyDesc = ({ ticker }: CompanyDescProps) => {
  const company = companyData.find(c => c.ticker === ticker);

  if (!company) {
    return <Card className="md:col-span-3"><CardContent>Company not found</CardContent></Card>;
  }

  return (
    <Card className="md:col-span-3">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-4">
          <AvatarWithStatus
            status={company.status}
            logo={company.logo}
            name={company.name}
            initials={getInitials(company.name)}
            size="lg"
          />
          <div>
            <CardTitle className="text-2xl font-bold">
              {company.name} <span className="ml-1 text-sm font-bold text-muted-foreground">({company.ticker})</span>
            </CardTitle>
            <p className="text-sm text-muted-foreground">{company.sector}</p>
          </div>
        </div>
        <Badge variant="secondary" className="flex items-center space-x-1">
          <span className={`h-2 w-2 rounded-full ${statusColors[company.status]}`}></span>
          <span>{company.status.charAt(0).toUpperCase() + company.status.slice(1)}</span>
        </Badge>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-4">{company.description}</p>
        <Separator className="my-4" />
        <div className="grid grid-cols-6 gap-4 text-center mb-4">
          {company.details.map((detail, index) => (
            <div key={index}>
              <div className="flex items-center justify-center space-x-1 mb-1">
                {detail.key === "country" && <Globe className="h-3 w-3" />}
                {detail.key === "currency" && <DollarSign className="h-3 w-3" />}
                {detail.key === "market cap" && <BarChart2 className="h-3 w-3" />}
                {detail.key === "accounting standard" && <BookOpen className="h-3 w-3" />}
                {detail.key === "last fiscal year" && <Calendar className="h-3 w-3" />}
                {detail.key === "last update date" && <Clock className="h-3 w-3" />}
                <p className="text-xs font-medium">{detail.key.charAt(0).toUpperCase() + detail.key.slice(1)}</p>
              </div>
              <p className="text-xs text-muted-foreground">{detail.value}</p>
            </div>
          ))}
        </div>
        <Separator className="my-4" />
        {company.adjustments && (
          <div className="rounded-md p-2">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <ReusableTooltip
                  description="Examples of adjustments done for the company to switch from a pure accounting data framework, to our economic one."
                  trigger={<Info className="h-4 w-4 text-muted-foreground" />}
                />
                <h3 className="text-sm font-medium">Main Adjustments</h3>
              </div>
              <div className="flex-1 flex justify-between items-center">
                {company.adjustments.map((adjustment, index) => (
                  <ReusableTooltip
                    key={index}
                    description={adjustment.description}
                    trigger={<span className="text-xs font-medium text-green-500">{adjustment.label}</span>}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CompanyDesc;