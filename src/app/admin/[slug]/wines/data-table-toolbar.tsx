"use client"

import { Table } from "@tanstack/react-table"
import { ArrowUpCircle, CheckCircle2, Circle, HelpCircle, X, XCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "./data-table-view-options"

import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import { wineStyles } from "./add/wineForm"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex flex-col gap-1">
      <div className="grid w-full grid-cols-3 gap-1">
        <Input className="max-w-xs" placeholder="Winery filter..."
            value={(table.getColumn("winery")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("winery")?.setFilterValue(event.target.value)}                
        />
        <Input className="max-w-xs" placeholder="Wine filter..."
            value={(table.getColumn("wine")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("wine")?.setFilterValue(event.target.value)}                
        />
        <Input className="max-w-xs" placeholder="Region filter..." 
            value={(table.getColumn("region")?.getFilterValue() as string ?? "")}
            onChange={(event) => table.getColumn("region")?.setFilterValue(event.target.value)}
        />
        <Input className="max-w-xs" placeholder="Vintage filter..." 
            value={(table.getColumn("vintage")?.getFilterValue() as string ?? "")}
            onChange={(event) => table.getColumn("vintage")?.setFilterValue(event.target.value)}
        />
        <Input className="max-w-xs" placeholder="Grapes filter..."
            value={(table.getColumn("grapes")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("grapes")?.setFilterValue(event.target.value)}                
        />
      </div>

      <div className="flex justify-between w-full">
        {table.getColumn("style") && (
          <DataTableFacetedFilter
            column={table.getColumn("style")}
            title="Wine Style"
            options={wineStyles}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="w-4 h-4 ml-2" />
          </Button>
        )}
        <DataTableViewOptions table={table}/>
      </div>
    </div>
  )
}