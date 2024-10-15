"use client"

import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";

interface SelectCellProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label: string;
}

const SelectCell = ({ checked, onCheckedChange, label }: SelectCellProps) => {
  return (
    <div className="relative w-6 h-6">
      <Checkbox
        checked={checked}
        onCheckedChange={onCheckedChange}
        aria-label={label}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4"
      />
    </div>
  );
}

export default SelectCell;