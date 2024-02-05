"use client"

import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { Check, ChevronsUpDown, LayoutDashboard, PlusCircle, Search } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"

export type SelectorData={
    value: string,
    label: string
}

interface Props{
  slug: string
  selectors: SelectorData[]
}
export function EnvioSelector({ slug, selectors }: Props) {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")
    const [searchValue, setSearchValue] = useState("")
    const [search, setSearch] = useState("")
    const router= useRouter()
    const path= usePathname()
    const searchParams= useSearchParams()

    useEffect(() => {
      const envioId= searchParams.get("e")
      
      const name= selectors.find(selector => selector.value === envioId)?.label
      name ? setValue(name) : setValue("")

      const search= searchParams.toString()
      setSearch(search)
    
    }, [path, selectors, searchParams])
    
  
    const filteredValues = useMemo(() => {
      if (!searchValue) return selectors
      const lowerCaseSearchValue = searchValue.toLowerCase();
      return selectors.filter((item) => 
      item.label.toLowerCase().includes(lowerCaseSearchValue)
      )
    }, [selectors, searchValue])
  
    const customFilter = (searchValue: string, itemValue: string) => {      
      return itemValue.toLowerCase().includes(searchValue.toLowerCase()) ? searchValue.toLowerCase().length : 0
    }      
      
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value)
    }
  
    return (
      <div className="w-full px-1">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              role="combobox"
              aria-expanded={open}
              className="justify-between w-full text-lg whitespace-nowrap bg-intraprop-color min-w-[230px]"
            >
              {value
                ? selectors.find(selector => selector.label.toLowerCase() === value.toLowerCase())?.label
                : "Seleccionar envío"}
              <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="min-w-[230px] p-0">
            <Command filter={customFilter} >
              <div className='flex items-center w-full gap-1 p-2 border border-gray-300 rounded-md shadow'>
                  <Search className="w-4 h-4 mx-1 opacity-50 shrink-0" />
                  <input placeholder="Buscar envío..." onInput={handleInputChange} value={searchValue} className="w-full bg-transparent focus:outline-none"/>
              </div>
              
              <CommandEmpty>envío not found</CommandEmpty>
              <CommandGroup>
                {filteredValues.map((item) => (
                  <CommandItem
                    key={item.value}
                    onSelect={(currentValue) => {
                      if (currentValue === value) {
                        setValue("")
                      } else {
                        setValue(currentValue)
                        const envioId= selectors.find(selector => selector.label.toLowerCase() === currentValue.toLowerCase())?.value
                        router.push(`/agency/${slug}/newsletter/emails?e=${envioId}`)
                      }
                      setSearchValue("")
                      setOpen(false)
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value.toLowerCase() === item.label.toLowerCase() ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {item.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

    )
  }
  
