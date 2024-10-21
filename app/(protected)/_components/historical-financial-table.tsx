import React from 'react';
import { ColumnDef } from "@tanstack/react-table";
import DataTable from '@/app/(protected)/_components/datatable/data-table';
import DataTableColumnHeader from '@/app/(protected)/_components/datatable/data-table-column-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type FinancialData = {
  year: string;
  economicAssets: string;
  bookValue: string;
  economicDebt: string;
  marketCap: string;
  economicAssetMultiple: string;
  economicAssetMultipleLow: string;
  economicAssetMultipleHigh: string;
  accountingPB: string;
  economicCashFlow: string;
  economicROI: string;
  returnOnEquity: string;
  economicPE: string;
  accountingPE: string;
};

const data: FinancialData[] = [
  { year: '2021', economicAssets: '122,470', bookValue: '63,090', economicDebt: '2,234,645', marketCap: '2,256,198', economicAssetMultiple: '18.2', economicAssetMultipleLow: '15.4', economicAssetMultipleHigh: '21.5', accountingPB: '35.8', economicCashFlow: '130,287', economicROI: '55.6', returnOnEquity: '150.1', economicPE: '32.8', accountingPE: '23.8' },
  { year: '2022', economicAssets: '129,553', bookValue: '50,672', economicDebt: '2,626,197', marketCap: '2,631,800', economicAssetMultiple: '20.3', economicAssetMultipleLow: '16.5', economicAssetMultipleHigh: '23.7', accountingPB: '51.9', economicCashFlow: '140,283', economicROI: '55.9', returnOnEquity: '197.0', economicPE: '36.3', accountingPE: '26.4' },
  { year: '2023', economicAssets: '146,513', bookValue: '62,146', economicDebt: '2,589,768', marketCap: '2,596,646', economicAssetMultiple: '17.7', economicAssetMultipleLow: '13.9', economicAssetMultipleHigh: '21.3', accountingPB: '41.8', economicCashFlow: '141,658', economicROI: '51.0', returnOnEquity: '156.1', economicPE: '34.7', accountingPE: '26.8' },
  { year: '2024E', economicAssets: '166,116', bookValue: '91,885', economicDebt: '3,473,998', marketCap: '3,506,074', economicAssetMultiple: '20.9', economicAssetMultipleLow: 'N/A', economicAssetMultipleHigh: 'N/A', accountingPB: '38.2', economicCashFlow: '141,093', economicROI: '44.9', returnOnEquity: '112.3', economicPE: '46.6', accountingPE: '34.0' },
  { year: '2025E', economicAssets: '176,546', bookValue: '187,787', economicDebt: '3,374,790', marketCap: '3,506,074', economicAssetMultiple: '19.1', economicAssetMultipleLow: 'N/A', economicAssetMultipleHigh: 'N/A', accountingPB: '18.7', economicCashFlow: '153,539', economicROI: '45.4', returnOnEquity: '59.5', economicPE: '42.1', accountingPE: '31.4' },
  { year: '2026E', economicAssets: '187,849', bookValue: '291,479', economicDebt: '3,267,230', marketCap: '3,506,074', economicAssetMultiple: '17.4', economicAssetMultipleLow: 'N/A', economicAssetMultipleHigh: 'N/A', accountingPB: '12.0', economicCashFlow: '166,039', economicROI: '45.6', returnOnEquity: '41.3', economicPE: '38.1', accountingPE: '29.1' },
];

const columns: ColumnDef<FinancialData>[] = [
    {
      accessorKey: "year",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Year" />
      ),
    },
    {
      accessorKey: "economicAssets",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Economic Assets" />
      ),
    },
    {
      accessorKey: "bookValue",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Book Value" />
      ),
    },
    {
      accessorKey: "economicDebt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Economic Debt" />
      ),
    },
    {
      accessorKey: "marketCap",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Market Cap." />
      ),
    },
    {
      accessorKey: "economicAssetMultiple",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Economic Asset Multiple" />
      ),
    },
    {
      accessorKey: "economicAssetMultipleLow",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Economic Asset Multiple Low" />
      ),
    },
    {
      accessorKey: "economicAssetMultipleHigh",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Economic Asset Multiple High" />
      ),
    },
    {
      accessorKey: "accountingPB",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Accounting P/B" />
      ),
    },
    {
      accessorKey: "economicCashFlow",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Economic Cash-Flow" />
      ),
    },
    {
      accessorKey: "economicROI",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Economic ROI" />
      ),
    },
    {
      accessorKey: "returnOnEquity",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Return on Equity" />
      ),
    },
    {
      accessorKey: "economicPE",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Economic P/E" />
      ),
    },
    {
      accessorKey: "accountingPE",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Accounting P/E" />
      ),
    },
  ];
  
  const columnGroups = [
    {
      title: "Basic Info",
      columns: ["year"],
    },
    {
      title: "Assets",
      columns: ["economicAssets", "bookValue"],
    },
    {
      title: "Liabilities",
      columns: ["economicDebt", "marketCap"],
    },
    {
      title: "Asset Multiples",
      columns: ["economicAssetMultiple", "economicAssetMultipleLow", "economicAssetMultipleHigh", "accountingPB"],
    },
    {
      title: "Profitability",
      columns: ["economicCashFlow", "economicROI", "returnOnEquity"],
    },
    {
      title: "Valuation",
      columns: ["economicPE", "accountingPE"],
    },
  ];
  
  const HistoricalFinancialTable = () => {
    return (

    <Card>
      <CardHeader></CardHeader>
      <CardContent>
        <DataTable
            columns={columns}
            data={data}
            filterColumn="year"
            filterPlaceholder="Filter years..."
            pageSizeOptions={[5, 10, 25, 50, 100]}
            columnGroups={columnGroups}
        />
      </CardContent>
    </Card>
    );
  }
  
  export default HistoricalFinancialTable;