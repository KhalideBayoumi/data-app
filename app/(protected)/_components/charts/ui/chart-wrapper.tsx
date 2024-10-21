"use client"

import React, { ReactNode, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Maximize2, Info } from "lucide-react";
import ReusableTooltip from "@/app/(protected)/_components/reusable-tooltip";

interface ChartWrapperProps {
  title: string;
  children: ReactNode;
  tooltipDescription?: string;
  showMaximizeIcon?: boolean;
  headerContent?: ReactNode;
}

const ChartWrapper = ({ 
  title, 
  children, 
  tooltipDescription, 
  showMaximizeIcon = true,
  headerContent 
}: ChartWrapperProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const renderContent = (isDialog: boolean) => (
    <Card className={`w-full h-full flex flex-col ${isDialog ? 'h-full' : 'max-w-xl mx-auto'}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            {tooltipDescription && (
              <ReusableTooltip
                description={tooltipDescription}
                trigger={<Info className="h-4 w-4 text-muted-foreground" />}
              />
            )}
            <CardTitle>{title}</CardTitle>
          </div>
          {headerContent}
          {!isDialog && showMaximizeIcon && (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <button className="p-2 hover:bg-secondary rounded">
                  <Maximize2 className="w-4 h-4" />
                </button>
              </DialogTrigger>
              <DialogContent className="p-0 scale-150 border-0">
                {renderContent(true)}
              </DialogContent>
            </Dialog>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-grow overflow-auto">
        {children}
      </CardContent>
    </Card>
  );

  return renderContent(false);
};

export default ChartWrapper;