import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { IndicatorValue } from "./gestionar/(crud)/actions"

import * as LucideIcons from "lucide-react"
import { ArrowUpRight } from "lucide-react"
import React from "react"
import { BarGraph } from "./bar-graph"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface Props {
    type: string
    indicators: IndicatorValue[]
    notes: string | null
    clientId: number
}
  
export default function SocialBox({ type, indicators, notes, clientId }: Props) {
    if (indicators.length===0) return <div></div>

    const borderColor= type === "Instagram" ? "border-Instagram" : type === "Facebook" ? "border-Facebook" : "border-Linkedin"
    const textColor= type === "Instagram" ? "text-Instagram" : type === "Facebook" ? "text-Facebook" : "text-Linkedin"
    
    // @ts-ignore
    const socialIcon= LucideIcons[type]


    return (
        <div className={cn("flex flex-col w-full gap-5 p-3 mt-10 border-l-8 rounded-l-lg", borderColor)}>
            {React.createElement(socialIcon, { className: `w-10 h-10 ${textColor}`})}
            <TooltipProvider>

            
            {
                indicators.map((indicator, index) => {                    
                    const valueDiff= indicator.value - indicator.previousValue
                    let percentageDiff= 0
                    if (indicator.previousValue !== 0) {
                        percentageDiff= (valueDiff / indicator.previousValue) * 100
                    }
                    const sign= valueDiff > 0 ? "+" : ""
                    const diffColor= valueDiff > 0 ? "text-green-600" : valueDiff < 0 ? "text-red-500" : "text-gray-500"
                
                    // @ts-ignore
                    const iconComponent= LucideIcons[indicator.icon]                    

                    return (
                        <div key={index} className="grid items-center self-center justify-center w-full grid-cols-1 gap-6 p-2 mb-2 border-b md:grid-cols-2 lg:gap-10">
                            <Tooltip>
                                <TooltipTrigger disabled={indicator.description === null}>
                                    <Card className="h-32 w-72">
                                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                            <CardTitle className="text-sm font-medium">{indicator.name}</CardTitle>
                                            {React.createElement(iconComponent, { className: "text-gray-500", size: "20"})}
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-3xl font-bold text-left">
                                                {indicator.value} 
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-1 text-xs">
                                                    <p className={cn(diffColor, "font-bold")}>{sign}{percentageDiff.toFixed(0)}%</p>
                                                    <p> respecto al mes anterior</p>
                                                </div>
                                                <p className={diffColor}>
                                                    {valueDiff > 0 && <ArrowUpRight size={18}/>}
                                                    {valueDiff < 0 && <LucideIcons.ArrowDownLeft size={18}/>}
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TooltipTrigger>
                                {
                                    indicator.description &&
                                    <TooltipContent>
                                        <p>{indicator.description}</p>
                                    </TooltipContent>
                                }
                            </Tooltip>

                            <div className="w-full">
                                <BarGraph type={type} dataIndicatorId={indicator.indicatorId} clientId={clientId}/>
                            </div>
                        </div>
                    )
                }
                )
            }
            {notes && <p className={cn("px-2 mb-3 font-bold py-4 border rounded-md text-muted-foreground", borderColor)}>{notes}</p>}
            </TooltipProvider>

        </div>
    )
}
