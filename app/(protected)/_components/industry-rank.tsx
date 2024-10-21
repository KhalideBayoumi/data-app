"use client";

import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChartWrapper from './charts/ui/chart-wrapper';

type DataItem = {
    rank: number;
    company: string;
    value: string;
};

type DataType = {
    assetMultiple: DataItem[];
    earningsYield: DataItem[];
    roi: DataItem[];
    valuation: DataItem[];
};

type MetricType = keyof DataType;
  
const data: DataType = {
  assetMultiple: [
    { rank: 1, company: "Konica Minolta Inc", value: "0.4 x" },
    { rank: 2, company: "Seiko Epson Corp", value: "0.6 x" },
    { rank: 3, company: "Brother Industries Ltd", value: "0.7 x" },
    { rank: 4, company: "Ricoh Co Ltd", value: "0.7 x" },
    { rank: 5, company: "Compal Electronics Inc", value: "0.8 x" },
    { rank: 6, company: "Samsung Electronics Co Ltd", value: "0.8 x" },
    { rank: 7, company: "Lenovo Group Ltd", value: "0.9 x" },
    { rank: 8, company: "Canon Inc", value: "1.0 x" },
    { rank: 9, company: "HP Inc", value: "1.1 x" },
    { rank: 10, company: "Apple Inc", value: "1.2 x" }
  ],
  earningsYield: [
    { rank: 1, company: "Apple Inc", value: "15.2%" },
    { rank: 2, company: "HP Inc", value: "14.8%" },
    { rank: 3, company: "Lenovo Group Ltd", value: "13.5%" },
    { rank: 4, company: "Canon Inc", value: "12.9%" },
    { rank: 5, company: "Samsung Electronics Co Ltd", value: "12.1%" },
    { rank: 6, company: "Ricoh Co Ltd", value: "11.7%" },
    { rank: 7, company: "Brother Industries Ltd", value: "11.2%" },
    { rank: 8, company: "Seiko Epson Corp", value: "10.8%" },
    { rank: 9, company: "Konica Minolta Inc", value: "10.3%" },
    { rank: 10, company: "Compal Electronics Inc", value: "9.8%" },
  ],
  roi: [
    { rank: 1, company: "Samsung Electronics Co Ltd", value: "22.5%" },
    { rank: 2, company: "Apple Inc", value: "21.8%" },
    { rank: 3, company: "HP Inc", value: "20.3%" },
    { rank: 4, company: "Canon Inc", value: "19.7%" },
    { rank: 5, company: "Lenovo Group Ltd", value: "18.9%" },
    { rank: 6, company: "Brother Industries Ltd", value: "17.6%" },
    { rank: 7, company: "Ricoh Co Ltd", value: "16.8%" },
    { rank: 8, company: "Seiko Epson Corp", value: "15.9%" },
    { rank: 9, company: "Konica Minolta Inc", value: "15.2%" },
    { rank: 10, company: "Compal Electronics Inc", value: "14.7%" },
  ],
  valuation: [
    { rank: 1, company: "Compal Electronics Inc", value: "8.2x" },
    { rank: 2, company: "Konica Minolta Inc", value: "8.7x" },
    { rank: 3, company: "Seiko Epson Corp", value: "9.1x" },
    { rank: 4, company: "Ricoh Co Ltd", value: "9.6x" },
    { rank: 5, company: "Brother Industries Ltd", value: "10.2x" },
    { rank: 6, company: "Lenovo Group Ltd", value: "10.8x" },
    { rank: 7, company: "Canon Inc", value: "11.5x" },
    { rank: 8, company: "HP Inc", value: "12.3x" },
    { rank: 9, company: "Samsung Electronics Co Ltd", value: "13.1x" },
    { rank: 10, company: "Apple Inc", value: "14.7x" },
  ],
};

const IndustryRank = () => {
  const [selectedMetric, setSelectedMetric] = useState<MetricType>('assetMultiple');

  const handleCompanyClick = (company: string) => {
      console.log(`Clicked on company: ${company}`);
  };

  const metricLabels = {
      assetMultiple: "Asset Multiple",
      roi: "ROI",
      earningsYield: "Earnings Yield",
      valuation: "Valuation",
  };

  const headerContent = (
      <Select onValueChange={(value: MetricType) => setSelectedMetric(value)} value={selectedMetric}>
          <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select metric" />
          </SelectTrigger>
          <SelectContent>
              <SelectItem value="assetMultiple">Asset Multiple</SelectItem>
              <SelectItem value="roi">ROI</SelectItem>
              <SelectItem value="earningsYield">Earnings Yield</SelectItem>
              <SelectItem value="valuation">Valuation</SelectItem>
          </SelectContent>
      </Select>
  );

  return (
      <ChartWrapper
          title="Industry Rank"
          tooltipDescription={
              'Defined as of the company\'s last calculation date, within its ' +
              'assigned industry ("GICS Industry"). Calculated for its ' +
              'Economic ROI, asset multiple and price to earning (earning\'s ' +
              'yield).'
          }
          headerContent={headerContent}
          showMaximizeIcon={false}
      >
          <ScrollArea>
              <Table>
                  <TableHeader>
                      <TableRow>
                          <TableHead className="w-[100px] sticky top-0 bg-background z-10">Rank</TableHead>
                          <TableHead className="sticky top-0 bg-background z-10">Company</TableHead>
                          <TableHead className="text-right sticky top-0 bg-background z-10">{metricLabels[selectedMetric]}</TableHead>
                      </TableRow>
                  </TableHeader>
                  <TableBody>
                      {data[selectedMetric].map((item) => (
                          <TableRow key={item.rank}>
                              <TableCell className="font-medium">{item.rank}</TableCell>
                              <TableCell>
                                  <button
                                      onClick={() => handleCompanyClick(item.company)}
                                      className="hover:underline focus:outline-none"
                                  >
                                      {item.company}
                                  </button>
                              </TableCell>
                              <TableCell className="text-right">{item.value}</TableCell>
                          </TableRow>
                      ))}
                  </TableBody>
              </Table>
          </ScrollArea>
      </ChartWrapper>
  );
};

export default IndustryRank;