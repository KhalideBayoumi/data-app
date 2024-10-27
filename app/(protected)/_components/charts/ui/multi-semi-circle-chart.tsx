import React from 'react';
import ChartWrapper from './chart-wrapper';

interface SemiCircleItem {
  name: string;
  value: number;
  color: string;
}

const MultiSemiCircleChart = ({ 
  data,
  title,
  tooltipDescription 
}: {
  data: SemiCircleItem[];
  title: string;
  tooltipDescription?: string;
}) => {
  return (
    <ChartWrapper 
      title={title}
      tooltipDescription={tooltipDescription}
    >
      <div className="w-full h-64 flex items-center justify-center">
        <div className="relative w-full h-full">
          <svg viewBox="0 0 100 50" className="w-full h-full">
            {data.map((item, index) => {
              const radius = 40;
              const arcWidth = 180 / data.length;
              const startAngle = -90 + (index * arcWidth);
              const endAngle = startAngle + (arcWidth * 0.8); // 0.8 to create gaps
              
              const start = {
                x: 50 + radius * Math.cos((startAngle * Math.PI) / 180),
                y: 45 + radius * Math.sin((startAngle * Math.PI) / 180)
              };
              
              const end = {
                x: 50 + radius * Math.cos((endAngle * Math.PI) / 180),
                y: 45 + radius * Math.sin((endAngle * Math.PI) / 180)
              };

              return (
                <path
                  key={item.name}
                  d={`M ${start.x} ${start.y} A ${radius} ${radius} 0 0 1 ${end.x} ${end.y}`}
                  fill="none"
                  stroke={item.color}
                  strokeWidth="4"
                />
              );
            })}
          </svg>
          
          <div className="absolute bottom-0 left-0 right-0 flex flex-wrap justify-center gap-2 text-xs">
            {data.map((item) => (
              <div key={item.name} className="flex items-center gap-1">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span>{item.name}</span>
                {item.value > 0 && <span>({item.value}y)</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </ChartWrapper>
  );
};

export default MultiSemiCircleChart;