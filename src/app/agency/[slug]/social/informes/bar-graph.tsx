"use client"

import { DataToGraph } from "@/services/informeService"
import { useEffect, useState } from "react"
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { getDataToGraphAction } from "./gestionar/(crud)/actions"



interface Props {
    type: string
    dataIndicatorId: string
    clientId: number
}

export function BarGraph({ type, dataIndicatorId, clientId }: Props) {
  const color= type === "Instagram" ? "#E4405F" : type === "Facebook" ? "#3B5998" : type === "Linkedin" ? "#0077B5" : "#1DA1F2"   

  const [data, setData] = useState<DataToGraph[]>([])

  useEffect(() => {
    async function getData() {
      const data= await getDataToGraphAction(dataIndicatorId, clientId)
      setData(data)
    }
    getData()
    
  }, [clientId, dataIndicatorId])
  
  return (
    <ResponsiveContainer width="100%" height={180}>
      {/** @ts-ignore */}
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}          
        />        
        {/** @ts-ignore */}
        <Tooltip />        
        {/** @ts-ignore */}
        <Bar dataKey="valor" fill={color} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}