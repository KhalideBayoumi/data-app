import React from 'react';
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>
  columnGroups?: {
    title: string
    columns: string[]
  }[]
}

const DataTableViewOptions = <TData,>({
  table,
  columnGroups,
}: DataTableViewOptionsProps<TData>) => {
  const getColumnLabel = (columnId: string) => {
    const column = table.getColumn(columnId);
    if (column && typeof column.columnDef.header === 'function') {
        const headerContent = column.columnDef.header({ column } as any);
        if (React.isValidElement(headerContent) && 'props' in headerContent) {
            return (headerContent.props as any).title || columnId;
        }
    }
    return columnId;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
        >
          <MixerHorizontalIcon className="mr-2 h-4 w-4" />
          View columns
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <ScrollArea className="h-[300px]">
          {columnGroups ? (
            columnGroups.map((group) => (
              <React.Fragment key={group.title}>
                <DropdownMenuLabel>{group.title}</DropdownMenuLabel>
                {group.columns.map((columnId) => {
                  const column = table.getColumn(columnId);
                  return column ? (
                    <DropdownMenuCheckboxItem
                      key={columnId}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    >
                      {getColumnLabel(columnId)}
                    </DropdownMenuCheckboxItem>
                  ) : null;
                })}
                <DropdownMenuSeparator />
              </React.Fragment>
            ))
          ) : (
            table.getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {getColumnLabel(column.id)}
                </DropdownMenuCheckboxItem>
              ))
          )}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DataTableViewOptions;