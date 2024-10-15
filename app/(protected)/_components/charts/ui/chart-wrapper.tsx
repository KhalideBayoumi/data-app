"use client"

import React, { ReactNode, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Maximize2 } from "lucide-react";

interface ChartWrapperProps {
  title: string;
  children: ReactNode;
}

const ChartWrapper = ({ title, children }: ChartWrapperProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const renderContent = (isDialog: boolean) => (
    <Card className={`w-full ${isDialog ? 'h-full' : 'max-w-xl mx-auto'}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>{title}</CardTitle>
          {!isDialog && (
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
      <CardContent className={`${isDialog ? 'flex-grow' : ''}`}>
        {children}
      </CardContent>
    </Card>
  );

  return renderContent(false);
};

export default ChartWrapper;