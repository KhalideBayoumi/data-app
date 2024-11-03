import React from 'react';
import { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Cross2Icon } from "@radix-ui/react-icons";
import DataTableFacetedFilter from './data-table-faceted-filter';
import DataTableViewOptions from './data-table-view-options';

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  filterColumn: string
  filterPlaceholder?: string
  facetedFilters?: {
    column: string
    title: string
    options: {
      label: string
      value: string
      icon?: React.ComponentType<{ className?: string }>
    }[]
  }[]
}

const DataTableToolbar = <TData,>({
  table,
  filterColumn,
  filterPlaceholder = "Filter...",
  facetedFilters = [],
}: DataTableToolbarProps<TData>) => {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <>
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                <Input
                placeholder={filterPlaceholder}
                value={(table.getColumn(filterColumn)?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                    table.getColumn(filterColumn)?.setFilterValue(event.target.value)
                }
                className="h-8 w-[150px] lg:w-[250px]"
                />
                {facetedFilters.map((filter, index) => (
                <DataTableFacetedFilter
                    key={index}
                    column={table.getColumn(filter.column)}
                    title={filter.title}
                    options={filter.options}
                />
                ))}
                {isFiltered && (
                <Button
                    variant="ghost"
                    onClick={() => table.resetColumnFilters()}
                    className="h-8 px-2 lg:px-3"
                >
                    Reset
                    <Cross2Icon className="ml-2 h-4 w-4" />
                </Button>
                )}
            </div>
        </div>
    </>

  )
}

export default DataTableToolbar;