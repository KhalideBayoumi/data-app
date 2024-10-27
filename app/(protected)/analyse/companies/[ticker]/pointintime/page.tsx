"use client"

import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { useParams } from "next/navigation";
import ChartWrapper from "@/app/(protected)/_components/charts/ui/chart-wrapper";
import ScatterPlotChart from "@/app/(protected)/_components/charts/ui/scatter-plot-chart";
import DataTable from "@/app/(protected)/_components/datatable/data-table";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

interface FinancialData {
  Company: string;
  Ticker: string;
  "Economic ROI": string;
  "Economic Asset Multiple": string;
  "Market Cap": string;
}

interface Column {
  accessorKey: string;
  header: string;
  cell?: (props: any) => JSX.Element;
}

interface TransformedData {
    name: string;
    ticker: string;
    'Economic ROI': number;
    'Economic Asset Multiple': number;
    'Market Cap': number;
    color: string;
    radius: number;
    [key: string]: string | number;  // Ajout de l'index signature
  }

const historicalData: { [key: string]: FinancialData[] } = {
    "2024/09/23": [
      {
        "Company": "Apple Inc",
        "Ticker": "AAPL",
        "Economic ROI": "41.8%",
        "Economic Asset Multiple": "20.0x",
        "Market Cap": "3,525.8"
      },
      {
        "Company": "Samsung Electronics",
        "Ticker": "005935.KS",
        "Economic ROI": "5.1%",
        "Economic Asset Multiple": "0.6x",
        "Market Cap": "279.3"
      },
      {
        "Company": "Dell Technologies",
        "Ticker": "DELL",
        "Economic ROI": "18.3%",
        "Economic Asset Multiple": "3.8x",
        "Market Cap": "84.3"
      },
      {
        "Company": "Xiaomi Corp",
        "Ticker": "1810.HK",
        "Economic ROI": "30.5%",
        "Economic Asset Multiple": "3.8x",
        "Market Cap": "72.3"
      },
      {
        "Company": "Canon Inc",
        "Ticker": "7751.T",
        "Economic ROI": "6.6%",
        "Economic Asset Multiple": "1.2x",
        "Market Cap": "43.7"
      },
      {
        "Company": "HP Inc",
        "Ticker": "HPQ",
        "Economic ROI": "15.8%",
        "Economic Asset Multiple": "2.9x",
        "Market Cap": "34.6"
      },
      {
        "Company": "Quanta Computer Inc",
        "Ticker": "2382.TW",
        "Economic ROI": "16.8%",
        "Economic Asset Multiple": "3.0x",
        "Market Cap": "32.2"
      },
      {
        "Company": "FUJIFILM Holdings",
        "Ticker": "4901.T",
        "Economic ROI": "5.0%",
        "Economic Asset Multiple": "1.6x",
        "Market Cap": "31.9"
      },
      {
        "Company": "Hewlett Packard",
        "Ticker": "HPE",
        "Economic ROI": "13.7%",
        "Economic Asset Multiple": "1.5x",
        "Market Cap": "30.0"
      },
      {
        "Company": "Industry Median",
        "Ticker": "Technology Hardware, Storage & Peripherals	",
        "Economic ROI": "13.3%",
        "Economic Asset Multiple": "1.6x",
        "Market Cap": "11.0"
      }
    ],
    "2024/09/16": [
      {
        "Company": "Apple Inc",
        "Ticker": "AAPL",
        "Economic ROI": "40.5%",
        "Economic Asset Multiple": "19.5x",
        "Market Cap": "3,498.2"
      },
      {
        "Company": "Samsung Electronics",
        "Ticker": "005935.KS",
        "Economic ROI": "5.3%",
        "Economic Asset Multiple": "0.7x",
        "Market Cap": "282.1"
      },
      {
        "Company": "Dell Technologies",
        "Ticker": "DELL",
        "Economic ROI": "17.9%",
        "Economic Asset Multiple": "3.6x",
        "Market Cap": "83.1"
      },
      {
        "Company": "Xiaomi Corp",
        "Ticker": "1810.HK",
        "Economic ROI": "29.8%",
        "Economic Asset Multiple": "3.7x",
        "Market Cap": "71.5"
      },
      {
        "Company": "Canon Inc",
        "Ticker": "7751.T",
        "Economic ROI": "6.8%",
        "Economic Asset Multiple": "1.3x",
        "Market Cap": "44.2"
      },
      {
        "Company": "HP Inc",
        "Ticker": "HPQ",
        "Economic ROI": "15.5%",
        "Economic Asset Multiple": "2.8x",
        "Market Cap": "34.1"
      },
      {
        "Company": "Quanta Computer Inc",
        "Ticker": "2382.TW",
        "Economic ROI": "16.5%",
        "Economic Asset Multiple": "2.9x",
        "Market Cap": "31.8"
      },
      {
        "Company": "FUJIFILM Holdings",
        "Ticker": "4901.T",
        "Economic ROI": "5.2%",
        "Economic Asset Multiple": "1.7x",
        "Market Cap": "32.3"
      },
      {
        "Company": "Hewlett Packard",
        "Ticker": "HPE",
        "Economic ROI": "13.4%",
        "Economic Asset Multiple": "1.4x",
        "Market Cap": "29.5"
      },
      {
        "Company": "Industry Median",
        "Ticker": "Technology Hardware, Storage & Peripherals	",
        "Economic ROI": "13.3%",
        "Economic Asset Multiple": "1.6x",
        "Market Cap": "11.0"
      }
    ],
    "2024/09/09": [
      {
        "Company": "Apple Inc",
        "Ticker": "AAPL",
        "Economic ROI": "42.1%",
        "Economic Asset Multiple": "20.2x",
        "Market Cap": "3,550.4"
      },
      {
        "Company": "Samsung Electronics",
        "Ticker": "005935.KS",
        "Economic ROI": "4.9%",
        "Economic Asset Multiple": "0.5x",
        "Market Cap": "277.8"
      },
      {
        "Company": "Dell Technologies",
        "Ticker": "DELL",
        "Economic ROI": "18.6%",
        "Economic Asset Multiple": "3.9x",
        "Market Cap": "85.2"
      },
      {
        "Company": "Xiaomi Corp",
        "Ticker": "1810.HK",
        "Economic ROI": "31.2%",
        "Economic Asset Multiple": "3.9x",
        "Market Cap": "73.1"
      },
      {
        "Company": "Canon Inc",
        "Ticker": "7751.T",
        "Economic ROI": "6.4%",
        "Economic Asset Multiple": "1.1x",
        "Market Cap": "43.2"
      },
      {
        "Company": "HP Inc",
        "Ticker": "HPQ",
        "Economic ROI": "16.1%",
        "Economic Asset Multiple": "3.0x",
        "Market Cap": "35.0"
      },
      {
        "Company": "Quanta Computer Inc",
        "Ticker": "2382.TW",
        "Economic ROI": "17.1%",
        "Economic Asset Multiple": "3.1x",
        "Market Cap": "32.6"
      },
      {
        "Company": "FUJIFILM Holdings",
        "Ticker": "4901.T",
        "Economic ROI": "4.8%",
        "Economic Asset Multiple": "1.5x",
        "Market Cap": "31.5"
      },
      {
        "Company": "Hewlett Packard",
        "Ticker": "HPE",
        "Economic ROI": "14.0%",
        "Economic Asset Multiple": "1.6x",
        "Market Cap": "30.5"
      },
      {
        "Company": "Industry Median",
        "Ticker": "Technology Hardware, Storage & Peripherals	",
        "Economic ROI": "13.3%",
        "Economic Asset Multiple": "1.6x",
        "Market Cap": "11.0"
      }
    ],
    "2024/09/02": [
      {
        "Company": "Apple Inc",
        "Ticker": "AAPL",
        "Economic ROI": "41.3%",
        "Economic Asset Multiple": "19.8x",
        "Market Cap": "3,510.6"
      },
      {
        "Company": "Samsung Electronics",
        "Ticker": "005935.KS",
        "Economic ROI": "5.2%",
        "Economic Asset Multiple": "0.6x",
        "Market Cap": "280.5"
      },
      {
        "Company": "Dell Technologies",
        "Ticker": "DELL",
        "Economic ROI": "18.0%",
        "Economic Asset Multiple": "3.7x",
        "Market Cap": "83.7"
      },
      {
        "Company": "Xiaomi Corp",
        "Ticker": "1810.HK",
        "Economic ROI": "30.1%",
        "Economic Asset Multiple": "3.7x",
        "Market Cap": "71.8"
      },
      {
        "Company": "Canon Inc",
        "Ticker": "7751.T",
        "Economic ROI": "6.7%",
        "Economic Asset Multiple": "1.2x",
        "Market Cap": "43.9"
      },
      {
        "Company": "HP Inc",
        "Ticker": "HPQ",
        "Economic ROI": "15.6%",
        "Economic Asset Multiple": "2.8x",
        "Market Cap": "34.3"
      },
      {
        "Company": "Quanta Computer Inc",
        "Ticker": "2382.TW",
        "Economic ROI": "16.6%",
        "Economic Asset Multiple": "2.9x",
        "Market Cap": "31.9"
      },
      {
        "Company": "FUJIFILM Holdings",
        "Ticker": "4901.T",
        "Economic ROI": "5.1%",
        "Economic Asset Multiple": "1.6x",
        "Market Cap": "32.0"
      },
      {
        "Company": "Hewlett Packard",
        "Ticker": "HPE",
        "Economic ROI": "13.5%",
        "Economic Asset Multiple": "1.4x",
        "Market Cap": "29.7"
      },
      {
        "Company": "Industry Median",
        "Ticker": "Technology Hardware, Storage & Peripherals	",
        "Economic ROI": "13.3%",
        "Economic Asset Multiple": "1.6x",
        "Market Cap": "11.0"
      }
    ]
  };

const stringToColor = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = (hash & 0x00FFFFFF).toString(16).toUpperCase();
  return "#" + "00000".substring(0, 6 - color.length) + color;
};

const calculateMedian = (numbers: number[]): number => {
  if (!numbers || numbers.length === 0) return 0;
  const sorted = [...numbers].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  }
  return sorted[middle];
};

const PointInTimePage = () => {
  const params = useParams();
  const selectedTicker = params?.ticker as string;
  const [selectedDate, setSelectedDate] = useState<Date>(new Date('2024/09/23'));
  const [currentData, setCurrentData] = useState<FinancialData[]>([]);
  const [chartData, setChartData] = useState<TransformedData[]>([]);
  const [referenceLines, setReferenceLines] = useState<any[]>([]);

  const transformData = (data: FinancialData[]): TransformedData[] => {
    if (!data.length) return [];
  
    const maxMarketCap = Math.max(...data.map(item => 
      parseFloat(item['Market Cap'].replace(',', ''))
    ));
  
    return data.map(item => {
      const marketCap = parseFloat(item['Market Cap'].replace(',', ''));
      const radius = Math.max(5, Math.sqrt(marketCap / maxMarketCap) * 30);
  
      return {
        name: item.Company,
        ticker: item.Ticker,
        'Economic ROI': parseFloat(item['Economic ROI'].replace('%', '')),
        'Economic Asset Multiple': parseFloat(item['Economic Asset Multiple'].replace('x', '')),
        'Market Cap': marketCap,
        color: item.Ticker === selectedTicker 
          ? 'hsl(var(--chart-2))' 
          : item.Company === 'Industry Median'
            ? 'hsl(var(--chart-4))'
            : stringToColor(item.Company),
        radius
      };
    });
  };

  const columns: Column[] = [
    {
      accessorKey: "Ticker",
      header: "Ticker",
      cell: ({ row }) => (
        <span className={
          row.original.Ticker === selectedTicker 
            ? 'text-[hsl(var(--chart-2))]' 
            : row.original.Company === 'Industry Median' 
              ? 'text-[hsl(var(--chart-4))]'
              : ''
        }>
          {row.original.Ticker}
        </span>
      )
    },
    {
      accessorKey: "Company",
      header: "Company",
      cell: ({ row }) => (
        <span className={
          row.original.Ticker === selectedTicker 
            ? 'text-[hsl(var(--chart-2))]' 
            : row.original.Company === 'Industry Median' 
              ? 'text-[hsl(var(--chart-4))]'
              : ''
        }>
          {row.original.Company}
        </span>
      )
    },
    {
      accessorKey: "Economic ROI",
      header: "Economic ROI",
      cell: ({ row }) => (
        <span className={
          row.original.Ticker === selectedTicker 
            ? 'text-[hsl(var(--chart-2))]' 
            : row.original.Company === 'Industry Median' 
              ? 'text-[hsl(var(--chart-4))]'
              : ''
        }>
          {row.original["Economic ROI"]}
        </span>
      )
    },
    {
      accessorKey: "Economic Asset Multiple",
      header: "Economic Asset Multiple",
      cell: ({ row }) => (
        <span className={
          row.original.Ticker === selectedTicker 
            ? 'text-[hsl(var(--chart-2))]' 
            : row.original.Company === 'Industry Median' 
              ? 'text-[hsl(var(--chart-4))]'
              : ''
        }>
          {row.original["Economic Asset Multiple"]}
        </span>
      )
    },
    {
      accessorKey: "Market Cap",
      header: "Market Cap (in bn USD)",
      cell: ({ row }) => (
        <span className={
          row.original.Ticker === selectedTicker 
            ? 'text-[hsl(var(--chart-2))]' 
            : row.original.Company === 'Industry Median' 
              ? 'text-[hsl(var(--chart-4))]'
              : ''
        }>
          {row.original["Market Cap"]}
        </span>
      )
    }
  ];

  useEffect(() => {
    const dateKey = format(selectedDate, 'yyyy/MM/dd');
    const newData = historicalData[dateKey] || [];
    setCurrentData(newData);
    const transformedData = transformData(newData);
    setChartData(transformedData);

    if (transformedData.length > 0) {
      const rois = transformedData.map(item => item['Economic ROI']);
      const multiples = transformedData.map(item => item['Economic Asset Multiple']);
      
      const medianROI = calculateMedian(rois);
      const medianMultiple = calculateMedian(multiples);

      setReferenceLines([
        {
          x: medianROI,
          strokeDasharray: '5 5',
          stroke: '#666666',
          strokeWidth: 2
        },
        {
          y: medianMultiple,
          strokeDasharray: '5 5',
          stroke: '#666666',
          strokeWidth: 2
        }
      ]);
    }
  }, [selectedDate, selectedTicker]);

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const availableDates = Object.keys(historicalData).map(date => new Date(date));

  const cardClasses = "overflow-auto w-full";
    
    return (
        <div>
            <div className="h-full flex flex-col md:flex-row gap-4 py-4">
                <div className="flex-1 flex">
                    <div className={`${cardClasses}`}>
                        <ChartWrapper
            title="Market Data Table"
            tooltipDescription="R&D, Advertising and Human Capital that can be economically capitalized expressed as percentage of the company's sales."
            headerContent={
            <Popover>
                <PopoverTrigger asChild>
                <Button variant="outline" className="flex gap-2 items-center">
                    <CalendarIcon className="h-4 w-4" />
                    {format(selectedDate, 'yyyy/MM/dd')}
                </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateSelect}
                    initialFocus
                    disabled={(date) => 
                    !availableDates.some(d => 
                        format(d, 'yyyy/MM/dd') === format(date, 'yyyy/MM/dd')
                    )
                    }
                />
                </PopoverContent>
            </Popover>
            }
            showMaximizeIcon={false}
        >
            <DataTable
            columns={columns}
            data={currentData}
            filterColumn="Company"
            filterPlaceholder="Filter companies..."
            />
                        </ChartWrapper>
                    </div>
                </div>
                <div className="flex-1 flex">
                    <div className={`${cardClasses}`}>
                        <ChartWrapper
            title="Economic Asset Multiple vs. Economic ROI"
            tooltipDescription="Here we analyze the relationship between how much the investor pays for the economic asset he purchases (Economic Asset Multiple) and how much he gets in terms of profitability (Economic Profitability).
    Each bubble corresponds to a company in the industry, and is proportional to its market cap. size.
    For relevance purposes, only positive Asset Multiple and Profitability are shown."
        >
            <div className="h-[500px]">
            <ScatterPlotChart
                data={chartData}
                xDataKey="Economic ROI"
                yDataKey="Economic Asset Multiple"
                xAxisLabel="Economic ROI (%)"
                yAxisLabel="Economic Asset Multiple (x)"
                radiusDataKey="Market Cap"
                xAxisDomain={[0, 60]}
                yAxisDomain={[0, 24]}
                radiusScale={0.3}
                colors={chartData.map(item => item.color)}
                xAxisTickFormatter={(value) => `${value}%`}
                yAxisTickFormatter={(value) => `${value}x`}
                referenceLines={referenceLines}
            />
            </div>
                        </ChartWrapper>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PointInTimePage;