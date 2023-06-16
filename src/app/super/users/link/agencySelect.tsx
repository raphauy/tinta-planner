"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { useRouter } from "next/navigation"
import { Agency, User } from "@prisma/client"
import { useEffect, useState } from "react"
import { getAgencys } from "@/app/(server-side)/services/agencyService"
import Button from "@/components/form/Button"
import { getUser } from "@/app/(server-side)/services/userService"
import { Link2 } from "lucide-react"


interface Props{
  userId: string
  onSelected: (agencyId: number, userId: string) => void
}

export function AgencySelect({ userId, onSelected }: Props) {
  const [agencies, setAgencies] = useState<Agency[]>([])
  const [agencyId, setAgencyId] = useState("Select Agency")

  const router= useRouter()

  useEffect(() => {
    async function fetch() {
      const agencies= await getAgencys()
      setAgencies(agencies)
    }
    fetch()
  
  }, [])
  

  async function onSubmit(){
    onSelected(parseInt(agencyId), userId)
    router.push(`/super/users?refresh=${new Date().getMilliseconds()}`)
  }

  return (
    <>
      <select 
        value={agencyId}
        onChange={(e) => setAgencyId(e.target.value)}
        className="px-1 py-1 my-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
        {agencies.map(agency => (
          <option
            className="text-gray-800"
            key={agency.id} 
            value={agency.id}
          >
            {agency.name}
          </option>
          ))
        }
      </select>
      <Button onClick={onSubmit}>Connect</Button>
    </>
)
}