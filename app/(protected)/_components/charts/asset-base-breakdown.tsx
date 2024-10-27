import React, { useState } from 'react';

import TreemapChart from './ui/tree-map-chart';
import ChartWrapper from './ui/chart-wrapper';

const getAssetColor = (name: string): string => {
  switch(name) {
    case 'Machinery':
      return '#f97316';
    case 'Buildings':
      return '#0ea5e9';
    case 'Other':
      return '#ef4444';
    case 'Leasehold Improvement':
      return '#22c55e';
    default:
      return '#gray';
  }
};

const assetData = [
  { name: 'Machinery', size: 950 },
  { name: 'Buildings', size: 200 },
  { name: 'Other', size: 150 },
  { name: 'Leasehold Improvement', size: 800 }
];

const AssetBreakdown = () => {
  return (
    <ChartWrapper 
      title="Asset Base Breakdown (%) - as of FY 2023"
      tooltipDescription="
      Examples of assets capitalized :

      Buildings: non-current or long-term asset account which shows the cost of a building (excluding the cost of the land)
      Leasehold Improvements: modifications made to a leased space or leased asset to make it more useful to, or to fit the particular needs of, the tenant
      Operational Lease: contract that permits the use of an asset without transferring the ownership rights of said asset
      Machinery: tools and implements used in the operation of the business. For a service company, these can include computers, copiers, telephone systems, and any electronic gear. For a manufacturing company, they include such things as drill presses, lathe machines, sanders, and other large tools.
      Natural Resources: inventories of raw materials that can be consumed (exhausted) through extraction or removal from their natural setting. Oil and gas reserves, mineral deposits, thermal energy sources, and standing timber are just a few examples of natural resource assets that a firm may own.
      "
      >
      <TreemapChart
        data={assetData}
        getColor={getAssetColor}
      />
    </ChartWrapper>
  );
};

export default AssetBreakdown; 