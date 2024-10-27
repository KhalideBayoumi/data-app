import React, { useState } from 'react';
import { Treemap, ResponsiveContainer, Tooltip } from 'recharts';

interface TreemapItem {
  name: string;
  size: number;
  color?: string;
}

interface TreemapProps {
  data: TreemapItem[];
  getColor?: (name: string) => string;
  height?: string;
  aspectRatio?: number;
}

const TreemapChart = ({
  data,
  getColor = () => '#gray',
  height = '26rem',
  aspectRatio = 4/3,
}: TreemapProps) => {
  const [activeBlock, setActiveBlock] = useState<string | null>(null);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length > 0) {
      const data = payload[0].payload;
      const color = getColor(data.name);
      
      return (
        <div className="bg-popover p-3 rounded-lg shadow-lg">
          <div className="flex items-baseline gap-2 text-base">
            <div 
              className="h-2.5 w-2.5 shrink-0 rounded-[2px]" 
              style={{ backgroundColor: color }}
            />
            <span className="text-foreground">{data.name}</span>
            <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
              {data.size}
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomContent = (props) => {
    if (!props) return null;
    
    const { x, y, width, height, name, size } = props;
    const isActive = activeBlock === name;
    const opacity = activeBlock ? (isActive ? 1 : 0.3) : 1;
    
    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          rx={4}
          fill={getColor(name)}
          style={{ opacity }}
          onMouseEnter={() => setActiveBlock(name)}
          onMouseLeave={() => setActiveBlock(null)}
        />
        {
          width > 30 && height > 30 && name && (
            <text
              x={x + width/2}
              y={y + height/2}
              fill="hsl(var(--primary))"
              className="text-sm"
              textAnchor="middle"
              dominantBaseline="middle"
              style={{ 
                pointerEvents: 'none',
                stroke: 'none'
              }}
            >
              {name}
            </text>
          )
        }
      </g>
    );
  };

  const formattedData = [{
    children: data
  }];

  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <Treemap
          data={formattedData}
          dataKey="size"
          stroke="hsl(var(--background))"
          strokeWidth={1}
          aspectRatio={aspectRatio}
          animationDuration={0}
          isAnimationActive={false}
          content={CustomContent}
        >
          <Tooltip 
            content={<CustomTooltip />}
            wrapperStyle={{ outline: 'none' }}
          />
        </Treemap>
      </ResponsiveContainer>
    </div>
  );
};

export default TreemapChart;