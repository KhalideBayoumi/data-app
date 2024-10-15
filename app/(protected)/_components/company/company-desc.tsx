import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BarChart2, BookOpen, Calendar, Clock, DollarSign, Globe, Info } from "lucide-react";
import ReusableTooltip from "@/app/(protected)/_components/reusable-tooltip";

const companyData = {
  name: "Apple Inc",
  code: "AAPL",
  ticker: "028050",
  sector: "Technology Hardware, Storage",
  logoSrc: "https://app.dataguru.world/flags/us.svg",
  initials: "A",
  status: "Live",
  description: "Apple Inc. is a global technology company headquartered in the United States, known for its innovative consumer electronics, software, and services, including the iPhone, iPad, Mac, and Apple Watch. It operates in numerous countries, emphasizing design and user experience.",
  details: [
    { icon: Globe, label: "Country", value: "UNITED STATES" },
    { icon: DollarSign, label: "Currency", value: "USD" },
    { icon: BarChart2, label: "Market Cap", value: "USD 3506.1 bn" },
    { icon: BookOpen, label: "Accounting Standard", value: "US GAAP" },
    { icon: Calendar, label: "Last Fiscal Year", value: "30/09/2023" },
    { icon: Clock, label: "Last Update Date", value: "30/08/2024" },
  ],
  adjustments: [
    { label: "Marketing & Advertising", description: "Advertising and Marketing are treated as expenses in traditional accounting. As they participate in building a company's competitive edge, through its brand and overall recognition, they are to be capitalized (as 'invisible capital invested') and added to its Economic Assets." },
    { label: "Deferred Revenues", description: "Deferred revenue, or unearned revenue, refers to advance payments for products or services that are to be delivered in the future. The recipient of such prepayment records unearned revenue as a liability on a balance sheet." },
    { label: "Goodwill Treatment", description: "Goodwill isn't an operating asset and doesn't produce any cash. It just underlines past acquisitions cumulated spreads. Therefore, it must be removed from a company's Economic Assets." },
    { label: "Inflation", description: "100 dollars today do not have the same purchasing power as that of n years ago. For this reason, operating assets need to be adjusted for inflation based on their estimated age and country." },
    { label: "Research & Development", description: "Research and Development are treated as expenses in traditional accounting. As they participate in building a company's competitive edge, through innovation, they are to be capitalized (as 'invisible capital invested') and added to its Economic Assets." },
  ],
};

const CompanyDesc = () => {
  const isLive = companyData.status.toLowerCase() === "live";
  return (
    <Card className="md:col-span-3">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-4">
        <div className={`rounded-full ${isLive ? 'p-0.5 bg-green-500' : 'bg-gray-500'}`}>
          <Avatar className={`h-12 w-12 ${isLive ? 'border-1 border-green-500' : 'bg-gray-500'}`}>
            <AvatarImage 
              src={companyData.logoSrc} 
              alt={companyData.name} 
              className="brightness-50"
            />
            <div className="absolute inset-0 flex items-center justify-center text-white text-lg font-semibold">
              {companyData.initials}
            </div>
            <AvatarFallback>{companyData.initials}</AvatarFallback>
          </Avatar>
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">
              {companyData.name} <span className="ml-1 text-sm font-bold text-muted-foreground">({companyData.code})</span>
            </CardTitle>
            <p className="text-sm text-muted-foreground">{companyData.sector}</p>
          </div>
        </div>
        <Badge variant="secondary" className="flex items-center space-x-1">
        <span className={`h-2 w-2 rounded-full ${isLive ? 'bg-green-500' : 'bg-gray-500'}`}></span>
        <span>{companyData.status}</span>
        </Badge>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-4">{companyData.description}</p>
        <Separator className="my-4" />
        <div className="grid grid-cols-6 gap-4 text-center mb-4">
          {companyData.details.map((detail, index) => (
            <div key={index}>
              <div className="flex items-center justify-center space-x-1 mb-1">
                <detail.icon className="h-3 w-3" />
                <p className="text-xs font-medium">{detail.label}</p>
              </div>
              <p className="text-xs text-muted-foreground">{detail.value}</p>
            </div>
          ))}
        </div>
        <Separator className="my-4" />
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
              {companyData.adjustments.map((adjustment, index) => (
                <ReusableTooltip
                  key={index}
                  description={adjustment.description}
                  trigger={<span className="text-xs font-medium text-green-500">{adjustment.label}</span>}
                />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyDesc;