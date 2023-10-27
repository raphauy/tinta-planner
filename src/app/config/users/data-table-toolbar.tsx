"use client"

import { Table } from "@tanstack/react-table"
import { X } from "lucide-react"

import { DataTableFacetedFilter } from "@/components/data-table/data-table-faceted-filter"
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  roles: string[]
}

export function DataTableToolbar<TData>({ table, roles }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex gap-1 dark:text-white">
        <Input className="max-w-xs" placeholder="Filtrar por nombre..."
            value={(table.getColumn("nombre")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("nombre")?.setFilterValue(event.target.value)}                
        />
        <Input className="max-w-xs" placeholder="Filtrar por email..."
            value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("email")?.setFilterValue(event.target.value)}                
        />
        <Input className="max-w-xs" placeholder="Filtrar por cliente..."
            value={(table.getColumn("clientsCSV")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("clientsCSV")?.setFilterValue(event.target.value)}                
        />
        {table.getColumn("rol") && (
          <DataTableFacetedFilter
            column={table.getColumn("rol")}
            title="Rol"
            options={roles}
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
        <div className="flex-1 ">
          <DataTableViewOptions table={table}/>
        </div>
    </div>
  )
}