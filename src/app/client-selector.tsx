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
import { usePathname, useRouter } from "next/navigation"


export type SelectorData={
    slug: string,
    name: string
}

interface Props{
    selectors: SelectorData[]
}
export function ClientSelector({ selectors }: Props) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")
    const [searchValue, setSearchValue] = React.useState("")
    const router= useRouter()
    const path= usePathname()

    React.useEffect(() => {
      const slug= path.split('/')[2]
      
      const lineName= selectors.find(selector => selector.slug === slug)?.name
      lineName && setValue(lineName)
    
    }, [path, selectors])
    
  
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
      <div className="w-full px-1 mt-2 mb-4">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="justify-between w-full text-lg whitespace-nowrap"
            >
              {value
                ? selectors.find(selector => selector.name.toLowerCase() === value.toLowerCase())?.name
                : "Seleccionar línea..."}
              <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[270px] p-0">
            <Command filter={customFilter} >
              <div className='flex items-center w-full gap-1 p-2 border border-gray-300 rounded-md shadow'>
                  <Search className="w-4 h-4 mx-1 opacity-50 shrink-0" />
                  <input placeholder="Buscar línea..." onInput={handleInputChange} value={searchValue} className="w-full bg-transparent focus:outline-none"/>
              </div>
              
              <CommandEmpty>Línea no encontrada</CommandEmpty>
              <CommandGroup>
                {filteredValues.map((line) => (
                  <CommandItem
                    key={line.slug}
                    onSelect={(currentValue) => {
                      if (currentValue === value) {
                        setValue("")
                      } else {
                        setValue(currentValue)
                        const restOfPath = path.split('/').slice(3).join('/')
                        router.push(`/admin/${line.slug}/${restOfPath}`)
                      }
                      setSearchValue("")
                      setOpen(false)
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value.toLowerCase() === line.name.toLowerCase() ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {line.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

    )
  }
  