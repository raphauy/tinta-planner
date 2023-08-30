"use client"

import { LoadingSpinnerChico } from "@/components/LoadingSpinner"
import { Button } from "@/components/ui/button"
import { getBasePath, getSlug } from "@/lib/utils"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export default function Menu() {
    const path= usePathname()
    const session= useSession()

    const slug= getSlug(path)
    const basePath= getBasePath(path)

    const user= session?.data?.user
    
    if (!user || !slug || user.role !== "agency") return <div></div>

    return (
        <nav className="text-muted-foreground">
            <ul className="flex items-center">
                <li className={`flex items-center border-b-tinta-vino hover:border-b-tinta-vino hover:border-b-2 h-10 ${path.includes("social") && "border-b-2"}`}>
                    <Link href={`/${basePath}/${slug}/social`}><Button className="h-8 text-lg" variant="ghost">Social</Button></Link>
                </li>
                <li className={`flex items-center border-b-tinta-vino hover:border-b-tinta-vino hover:border-b-2 h-10 ${path.includes("crm") && "border-b-2"}`}>
                    <Link href={`/${basePath}/${slug}/crm`}><Button className="h-8 text-lg" variant="ghost">CRM</Button></Link>
                </li>
            </ul>
        </nav>
)
}


