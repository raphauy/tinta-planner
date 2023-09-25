"use client"


import { Button } from "@/components/ui/button"

import { LoadingSpinnerChico } from "@/components/LoadingSpinner"
import { useState } from "react"
import { IndicatorValue } from "./actions"

import { useParams } from "next/navigation"
import "react-datepicker/dist/react-datepicker.css"

interface Props{
  indicators: IndicatorValue[]
  update: (slug: string, json: string) => void
  closeDialog: () => void
}

export function IngresarForm({ indicators, update, closeDialog }: Props) {
  const params= useParams()
  const slug= params.slug.toString()
  const [loading, setLoading] = useState(false) 

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const data= new FormData(e.currentTarget)
    const json= Object.fromEntries(data.entries())
    update(slug, JSON.stringify(json))
    closeDialog()
    setLoading(false)
  }

 
  return (
      <form onSubmit={handleSubmit} className="py-4 space-y-8 bg-white">
        <div className="grid grid-cols-2 gap-5">

        
        {
          // iterate over indicators and create a form field for each one
          indicators.map((indicator, index) => {
            return (
              <div className="flex flex-col space-y-2" key={index}>
                <label className="text-sm font-semibold text-gray-600">{indicator.name}</label>
                <input name={indicator.id} defaultValue={indicator.value} type="text" className="flex w-full h-10 px-3 py-2 text-sm bg-transparent border rounded-md border-input ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
              </div>
          )})
        }
        </div>

        <div className="flex justify-end">
          <Button onClick={() => closeDialog && closeDialog()} type="button" variant={"secondary"} className="w-32">Cancelar</Button>
          <Button type="submit" className="w-32 ml-2" >{loading ? <LoadingSpinnerChico /> : <p>Guardar</p>}</Button>
        </div>
      </form>
  )
}

