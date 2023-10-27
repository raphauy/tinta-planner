"use client"

import { Button } from "@/components/ui/button"
import { cn, getBasePath, getSlug } from "@/lib/utils"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Menu() {
    const path= usePathname()
    const session= useSession()

    const slug= getSlug(path)
    const basePath= getBasePath(path)

    const user= session?.data?.user
    
    if (!user || !slug || path.split("/")[1] !== "agency") return <div></div>

    const role= user.role
    const socialHref= `/agency/${slug}/social`
    const socialSelected= path.includes("social")
    const crmHref= `/agency/${slug}/crm`
    const crmSelected= path.includes("crm")
    const adminSelected= path.includes("admin")

    return (
        <nav className="text-muted-foreground">
            <ul className="flex items-center">
                {role === "client" && <ClientMenu />}
                {role === "agency" && <><ClientMenu /><AgencyMenu socialHref={socialHref} socialSelected={socialSelected}/></>}
                {role === "agency-admin" && 
                    <>
                        <ClientMenu />
                        <AgencyMenu socialHref={socialHref} socialSelected={socialSelected}/>
                        <AgencyAdminMenu crmHref={crmHref} crmSelected={crmSelected} />
                    </>
                }
                {role === "admin" && 
                    <>
                    <ClientMenu />
                    <AgencyMenu socialHref={socialHref} socialSelected={socialSelected}/>
                    <AgencyAdminMenu crmHref={crmHref} crmSelected={crmSelected} />
                    <AdminMenu adminSelected={adminSelected} />
                </>
            }
            </ul>
        </nav>
    )
}

function ClientMenu() {
    return (
        <>
        </>
    )    
}

interface AgencyProps {
    socialHref: string,
    socialSelected: boolean
}
function AgencyMenu({ socialHref, socialSelected }: AgencyProps) {
    return (
        <>
            <li className={cn("flex items-center border-b-tinta-vino hover:border-b-tinta-vino hover:border-b-2 h-10", socialSelected && "border-b-2")}>
                <Link href={socialHref}><Button className="h-8 text-lg" variant="ghost">Social</Button></Link>
            </li>
        </>
    )    
}

interface AgencyAdminProps {
    crmHref: string,
    crmSelected: boolean
}
function AgencyAdminMenu({ crmHref, crmSelected }: AgencyAdminProps) {
    return (
        <>
            <li className={cn("flex items-center border-b-tinta-vino hover:border-b-tinta-vino hover:border-b-2 h-10", crmSelected && "border-b-2")}>
                <Link href={crmHref}><Button className="h-8 text-lg" variant="ghost">CRM</Button></Link>
            </li>
        </>
    )    
}

interface AdminProps {
    adminSelected: boolean
}
function AdminMenu({ adminSelected }: AdminProps) {
    return (
        <>
            <li className={cn("flex items-center border-b-tinta-vino hover:border-b-tinta-vino hover:border-b-2 h-10", adminSelected && "border-b-2")}>
                <Link href="/admin"><Button className="h-8 text-lg" variant="ghost">Admin</Button></Link>
            </li>
        </>
    )    
}