"use client"

import { Table } from "@tanstack/react-table"
import { X } from "lucide-react"

import { DataTableFacetedFilter } from "@/components/data-table/data-table-faceted-filter"
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex gap-1 dark:text-white">
        <Input className="max-w-xs" placeholder="Filtrar instituto..."
            value={(table.getColumn("institute")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("institute")?.setFilterValue(event.target.value)}                
        />
        <Input className="max-w-xs" placeholder="Filtrar location..."
            value={(table.getColumn("location")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("location")?.setFilterValue(event.target.value)}                
        />
        <Input className="max-w-xs" placeholder="Filtrar email..."
            value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("email")?.setFilterValue(event.target.value)}                
        />
        <Input className="max-w-xs" placeholder="Filtrar website..."
            value={(table.getColumn("website")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("website")?.setFilterValue(event.target.value)}                
        />
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
        <div className="flex-1 ">
          <DataTableViewOptions table={table}/>
        </div>
    </div>
  )
}