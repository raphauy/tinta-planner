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
  wineNames: string[]
  regions: string[]
  vintages: string[]
}

export function DataTableToolbar<TData>({
  table,
  wineNames,
  regions,
  vintages,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex flex-col gap-1">

      <div className="flex justify-between w-full">
        {table.getColumn("wine") && (
          <DataTableFacetedFilter
            column={table.getColumn("wine")}
            title="Vino"
            options={wineNames}
          />
        )}
        {table.getColumn("vintage") && (
          <DataTableFacetedFilter
            column={table.getColumn("vintage")}
            title="Añada"
            options={vintages}
          />
        )}
        {table.getColumn("region") && (
          <DataTableFacetedFilter
            column={table.getColumn("region")}
            title="Región"
            options={regions}
          />
        )}
        {table.getColumn("style") && (
          <DataTableFacetedFilter
            column={table.getColumn("style")}
            title="Estilo"
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
      <div className="grid w-full grid-cols-3 gap-1">
        <Input className="" placeholder="Filtrar cepas..."
            value={(table.getColumn("grapes")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("grapes")?.setFilterValue(event.target.value)}                
        />
        <Input className="" placeholder="Filtrar notas de cata..."
            value={(table.getColumn("notes")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("notes")?.setFilterValue(event.target.value)}                
        />
      </div>
   </div>
  )
}