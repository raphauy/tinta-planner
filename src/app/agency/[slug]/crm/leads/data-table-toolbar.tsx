"use client"

import { Table } from "@tanstack/react-table"
import { X } from "lucide-react"

import { DataTableFacetedFilter } from "@/components/data-table/data-table-faceted-filter"
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

const statuses= ["Potencial", "Calificado", "Propuesta", "Negociación", "En Curso", "Cerrado", "Perdido"]

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  services: string[]
}

export function DataTableToolbar<TData>({ table, services }: DataTableToolbarProps<TData>) {
  const [service, setService] = useState("")
  const [status, setStatus] = useState("")

  const isFiltered = table.getState().columnFilters.length > 0

  async function setServiceFilterValues(filterValues: string[]) {
    if (filterValues === undefined)
      setService("")
    else setService(filterValues.join(","))
  }

  async function setStatusFilterValues(filterValues: string[]) {
    if (filterValues === undefined)
      setStatus("")
    else setStatus(filterValues.join(","))
  }

  return (
    <div className="flex gap-1 dark:text-white">
        <div className="flex flex-col gap-1">
          <div className="flex gap-1">
            {table.getColumn("serviceName") && (
              <DataTableFacetedFilter
                column={table.getColumn("serviceName")}
                title="Servicio"
                options={services}
                setFilterValues={setServiceFilterValues}
              />
            )}

            {table.getColumn("status") && (
              <DataTableFacetedFilter
                column={table.getColumn("status")}
                title="Estado"
                options={statuses}
                setFilterValues={setStatusFilterValues}
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
          </div>
          <div className="flex gap-1">
            <Input className="max-w-xs" placeholder="Filtrar compañía..."
                value={(table.getColumn("company")?.getFilterValue() as string) ?? ""}
                onChange={(event) => table.getColumn("company")?.setFilterValue(event.target.value)}                
            />
            <Input className="max-w-xs" placeholder="Filtrar nombre del contacto..."
                value={(table.getColumn("contactName")?.getFilterValue() as string) ?? ""}
                onChange={(event) => table.getColumn("contactName")?.setFilterValue(event.target.value)}                
            />
            <Input className="max-w-xs" placeholder="Filtrar email del contacto..."
                value={(table.getColumn("contactEmail")?.getFilterValue() as string) ?? ""}
                onChange={(event) => table.getColumn("contactEmail")?.setFilterValue(event.target.value)}                
            />

          </div>

        </div>
        <div className="flex-1 ">
          <DataTableViewOptions table={table}/>
        </div>
    </div>
  )
}