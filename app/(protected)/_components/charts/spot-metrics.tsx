"use client"

import React, { useState } from 'react';
import { Bar, BarChart, XAxis, YAxis, LabelList } from "recharts";
import { Info } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReusableTooltip from '@/app/(protected)/_components/reusable-tooltip';
import { ChartContainer } from "@/components/ui/chart";
import ChartWrapper from './ui/chart-wrapper';

const generateChartData = {
    'Last FY': {
      eco: {
        roi: {
          rcr_perc: 40.0,
          rcr_perc_sub_industry_median: 11.0,
          rcr_perc_region_median: 9.5
        },
        asset: {
          fev_to_eci: 19.5,
          fev_to_eci_sub_industry_median: 1.5,
          fev_to_eci_region_median: 2.0
        },
        valuation: {
          economic_pe: 42.0,
          economic_pe_sub_industry_median: 13.0,
          economic_pe_region_median: 22.0
        }
      },
      acc: {
        roi: {
          accounting_roe: 38.0,
          accounting_roe_sub_industry_median: 10.0,
          accounting_roe_region_median: 8.5
        },
        asset: {
          accounting_pb: 18.5,
          accounting_pb_sub_industry_median: 1.4,
          accounting_pb_region_median: 1.9
        },
        valuation: {
          accounting_pe: 40.0,
          accounting_pe_sub_industry_median: 12.0,
          accounting_pe_region_median: 21.0
        },
      }
    },
    'Today': {
      eco: {
        roi: {
          rcr_perc: 45.3,
          rcr_perc_sub_industry_median: 12.3,
          rcr_perc_region_median: 10.2
        },
        asset: {
          fev_to_eci: 21.1,
          fev_to_eci_sub_industry_median: 1.6,
          fev_to_eci_region_median: 2.2
        },
        valuation: {
          economic_pe: 46.6,
          economic_pe_sub_industry_median: 14.1,
          economic_pe_region_median: 23.7
        }
      },
      acc: {
        roi: {
          accounting_roe: 43.3,
          accounting_roe_sub_industry_median: 11.3,
          accounting_roe_region_median: 9.2
        },
        asset: {
          accounting_pb: 20.1,
          accounting_pb_sub_industry_median: 1.5,
          accounting_pb_region_median: 2.1
        },
        valuation: {
          accounting_pe: 44.6,
          accounting_pe_sub_industry_median: 13.1,
          accounting_pe_region_median: 22.7
        }
      }
    },
    'Next FY': {
      eco: {
        roi: {
          rcr_perc: 55.0,
          rcr_perc_sub_industry_median: 15.0,
          rcr_perc_region_median: 13.0
        },
        asset: {
          fev_to_eci: 25.0,
          fev_to_eci_sub_industry_median: 2.0,
          fev_to_eci_region_median: 2.5
        },
        valuation: {
          economic_pe: 60.0,
          economic_pe_sub_industry_median: 18.0,
          economic_pe_region_median: 28.0
        }
      },
      acc: {
        roi: {
          accounting_roe: 53.0,
          accounting_roe_sub_industry_median: 14.0,
          accounting_roe_region_median: 12.0
        },
        asset: {
          accounting_pb: 24.0,
          accounting_pb_sub_industry_median: 1.9,
          accounting_pb_region_median: 2.4
        },
        valuation: {
          accounting_pe: 58.0,
          accounting_pe_sub_industry_median: 17.0,
          accounting_pe_region_median: 27.0
        }
      }
    },
    '1y Forward': {
      eco: {
        roi: {
          rcr_perc: 34.0,
          rcr_perc_sub_industry_median: 29.0,
          rcr_perc_region_median: 10.0
        },
        asset: {
          fev_to_eci: 64.0,
          fev_to_eci_sub_industry_median: 9.0,
          fev_to_eci_region_median: 1.6
        },
        valuation: {
          economic_pe: 55.0,
          economic_pe_sub_industry_median: 48.0,
          economic_pe_region_median: 78.0
        }
      },
      acc: {
        roi: {
          accounting_roe: 29.5,
          accounting_roe_sub_industry_median: 25.5,
          accounting_roe_region_median: 8.5
        },
        asset: {
          accounting_pb: 58.0,
          accounting_pb_sub_industry_median: 7.5,
          accounting_pb_region_median: 1.4
        },
        valuation: {
          accounting_pe: 48.0,
          accounting_pe_sub_industry_median: 42.0,
          accounting_pe_region_median: 70.0
        }
      }
    }
  };

const colors = {
  Company: "hsl(var(--chart-2))",
  "Industry Median": "hsl(var(--chart-4))",
  "Region Median": "hsl(var(--chart-1))",
};

export const SpotMetrics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Today');
  const [activeTab, setActiveTab] = useState('eco');

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handlePeriodChange = (value: string) => {
    if (Object.keys(generateChartData).includes(value)) {
        setSelectedPeriod(value as keyof typeof generateChartData);
      }
  };

  const headerContent = (
    <div className="flex items-center space-x-2">
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList>
          <TabsTrigger value="eco">Eco.</TabsTrigger>
          <TabsTrigger value="acc">Acc.</TabsTrigger>
        </TabsList>
      </Tabs>
      <Select onValueChange={handlePeriodChange} value={selectedPeriod}>
        <SelectTrigger>
          <SelectValue placeholder="Select period" />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(generateChartData).map((period) => (
            <SelectItem key={period} value={period}>{period}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );

  const renderCharts = () => {
    const periodData = (generateChartData as any)[selectedPeriod][activeTab];
    if (!periodData) return null;

    return Object.entries(periodData).map(([title, data]) => {
      const chartData = [
        { 
          activity: "Company",
          value: (Object.values(data as any) as any[])[0],
          label: `${((Object.values(data as any) as any[])[0] as number).toFixed(1)}%`,
          fill: colors.Company,
        },
        { 
            activity: "Industry Median",
            value: (Object.values(data as any) as any[])[2],
            label: `${((Object.values(data as any) as any[])[2] as number).toFixed(1)}%`,
            fill: colors["Industry Median"],
        },
        { 
          activity: "Region Median",
          value: (Object.values(data as any) as any[])[1],
          label: `${((Object.values(data as any) as any[])[1] as number).toFixed(1)}%`,
          fill: colors["Region Median"],
        }
      ];

      const tooltipInfo = {
        roi: { label: "ROI", description: "Economic ROI measures total cash generated by invested capital over the life of assets. Accounting ROI equates Return on Equity, which measures net income earned on net assets (year end)." },
        asset: { label: "Asset Multiple", description: "As an investor : which price do I pay for the assets I am acquiring ? The economic one corresponds to DataGuru's proprietary normalized version, while the accounting one is the usual Price-to-Book." },
        valuation: { label: "Valuation", description: "As an investor : which price do I pay for the income a company generates ? The economic one corresponds to DataGuru's proprietary normalized version, while the accounting one is the usual Price/Earnings." },
      };

      return (
        <div key={title}>
          <h3 className="text-sm font-semibold mb-1 flex items-center">
            <ReusableTooltip
              description={(tooltipInfo as any)[title]?.description}
              trigger={
                <span className="flex items-center cursor-pointer">
                  <Info className="h-3 w-3 inline-block mr-1" />
                </span>
              }
            />
            {(tooltipInfo as any)[title]?.label || title.charAt(0).toUpperCase() + title.slice(1)}
          </h3>
          <ChartContainer
            config={{
              company: {
                label: "Company",
                color: colors.Company,
              },
              industry: {
                label: "Industry Median",
                color: colors["Industry Median"],
              },
              region: {
                label: "Region Median",
                color: colors["Region Median"],
              },
            }}
            className="h-[140px] w-full"
          >
            <BarChart
              layout="vertical"
              data={chartData}
              margin={{
                left: 0,
                right: 0,
                top: 0,
                bottom: 10,
              }}
              barSize={32}
              barGap={2}
            >
              <XAxis type="number" dataKey="value" hide />
              <YAxis dataKey="activity" type="category" hide />
              <Bar dataKey="value" radius={2}>
                <LabelList
                  dataKey="label"
                  position="insideLeft"
                  fill="white"
                  offset={8}
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </div>
      );
    });
  };

  return (
    <ChartWrapper
          title="Spot Metrics"
          tooltipDescription={
            '"Last FY" = Last Fiscal Year (LFY)\n' +
            '"Next FY" = LFY+1 using consensus estimates and year-to-date data\n' +
            '"Today" = interpolated value between LFY and LFY+1\n' +
            '"1Y Forward" = interpolated value between LFY+1 and LFY+2'
          }
          showMaximizeIcon={false}
          headerContent={headerContent}
        >
          <div className="flex justify-start gap-4 mt-1 text-xs mb-4">
            {Object.entries(colors).map(([name, color]) => (
              <div key={name} className="flex items-center">
                <div className="w-2 h-2 rounded-full mr-1" style={{backgroundColor: color}}></div>
                <span>{name}</span>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            {renderCharts()}
          </div>
    </ChartWrapper>
  );
};

export default SpotMetrics;