"use client";

import React, { useState, useEffect } from 'react';
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
});

const MobileWarning = () => {
  const [showWarning, setShowWarning] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const checkWindowSize = () => {
      const isTooSmall = window.innerWidth < 1512 || window.innerHeight < 414;
      
      if (!initialLoad) {
        if (isTooSmall) {
          // Only show warning if it hasn't been manually dismissed
          if (!isDismissed) {
            setShowWarning(true);
          }
        } else {
          // Reset dismiss state and hide warning when window is large enough
          setIsDismissed(false);
          setShowWarning(false);
        }
      }
    };

    // Mark the end of initial loading
    setInitialLoad(false);

    // Add resize event listener
    window.addEventListener('resize', checkWindowSize);

    // Cleanup event listener
    return () => window.removeEventListener('resize', checkWindowSize);
  }, [initialLoad, isDismissed]);

  if (!showWarning) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
      <div className="space-y-6 text-center bg-card p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex items-center justify-center space-x-2">
          <AlertTriangle className="h-10 w-10 text-[hsl(var(--chart-3))]" />
          <h1 className={cn(
            "text-3xl font-semibold text-primary",
            font.className
          )}>
            Warning
          </h1>
        </div>
        <p className="text-muted-foreground">
          For optimal viewing experience, this application requires a minimum window size of 1512 x 414 pixels.
        </p>
        <div className="pt-4">
          <Button
            onClick={() => {
              setShowWarning(false);
              setIsDismissed(true);
            }}
            variant="secondary"
            className="w-full"
          >
            Continue Anyway
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileWarning;