"use client"

import { Check, ChevronsUpDown } from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Search } from "lucide-react"
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation"


export type SelectorData={
    id: string,
    name: string
}

interface Props{
    selectors: SelectorData[]
}
export function InformeSelector({ selectors }: Props) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")
    const [searchValue, setSearchValue] = React.useState("")
    const router= useRouter()
    const path= usePathname()
    const searchParams= useSearchParams()

    React.useEffect(() => {
      const id= searchParams.get("id")
      if (!id) {
        if (selectors.length > 0) {
          const selector= selectors[0]
          setValue(selector.name)          
        }
      } else {
        const selector= selectors.find(selector => selector.id === id)
        if (!selector) return
        setValue(selector.name)  
      }
      
    }, [searchParams, selectors])
    
  
    const filteredValues = React.useMemo(() => {
      if (!searchValue) return selectors
      const lowerCaseSearchValue = searchValue.toLowerCase();
      return selectors.filter((line) => 
      line.name.toLowerCase().includes(lowerCaseSearchValue)
      )
    }, [selectors, searchValue])
  
    const customFilter = (searchValue: string, itemValue: string) => {      
      return itemValue.toLowerCase().includes(searchValue.toLowerCase()) ? searchValue.toLowerCase().length : 0
    }      
      
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value)
    }
  
    return (
      <div className="px-1">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="justify-between text-lg whitespace-nowrap"
            >
              {value
                ? selectors.find(selector => selector.name.toLowerCase() === value.toLowerCase())?.name
                : "Aún no hay informes"}
              <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[400px] p-0">
            <Command filter={customFilter} >
              <div className='flex items-center w-full gap-1 p-2 border border-gray-300 rounded-md shadow'>
                  <Search className="w-4 h-4 mx-1 opacity-50 shrink-0" />
                  <input placeholder="Buscar informe..." onInput={handleInputChange} value={searchValue} className="w-full bg-transparent focus:outline-none"/>
              </div>
              
              <CommandEmpty>Informe no encontrado</CommandEmpty>
              <CommandGroup>
                {filteredValues.map((informe) => (
                  <CommandItem
                    key={informe.id}
                    onSelect={(currentValue) => {
                      if (currentValue === value) {
                        setValue("")
                      } else {
                        setValue(currentValue)
                        router.push(`${path}?id=${informe.id}`)
                      }
                      setSearchValue("")
                      setOpen(false)
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value.toLowerCase() === informe.name.toLowerCase() ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {informe.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

    )
}
  
