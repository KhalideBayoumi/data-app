import React, { ReactNode } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ReusableTooltipProps {
    label?: string;
    description: string;
    trigger: ReactNode;
    className?: string;
    tooltipWidth?: string;
  }

  
const ReusableTooltip = ({ 
    label, 
    description, 
    trigger, 
    className = '', 
    tooltipWidth = 'max-w-xs' 
}: ReusableTooltipProps) => (
  <TooltipProvider delayDuration={1} skipDelayDuration={1}>
    <Tooltip>
      <TooltipTrigger asChild>
        <div className={`cursor-pointer ${className}`}>
          {trigger}
        </div>
      </TooltipTrigger>
      <TooltipContent className={tooltipWidth}>
        {label && <p className="text-sm font-medium mb-1">{label}</p>}
        <p className="text-xs break-words">{description}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export default ReusableTooltip;