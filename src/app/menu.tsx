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

    const user= session?.data?.user
    
    const feature= path.split("/")[1]
    if (feature === "admin") return <div className="text-2xl font-bold text-muted-foreground"> / Admin <Link href="/"><Button variant="outline">Volver</Button></Link></div>
    if (feature === "whatsapp") return <div className="text-2xl font-bold text-muted-foreground"> / Mensajes <Link href="/" className="ml-5"><Button variant="outline">Volver</Button></Link></div>
    
    if (!user || !slug || feature !== "agency") return <div></div>

    const role= user.role
    const socialHref= `/agency/${slug}/social`
    const socialSelected= path.includes("social")
    const crmHref= `/agency/${slug}/crm`
    const crmSelected= path.includes("crm")
    const newsletterHref= `/agency/${slug}/newsletter`
    const newsletterSelected= path.includes("newsletter")
    const whatsappHref= `/whatsapp`
    const whatsappSelected= path.includes("whatsapp")
    const adminSelected= path.includes("admin")

    return (
        <nav className="text-muted-foreground">
            <ul className="flex items-center">
                {role === "client" && <ClientMenu />}
                {role === "agency" && <><ClientMenu /><AgencyMenu socialHref={socialHref} socialSelected={socialSelected} newsletterHref={newsletterHref} newsletterSelected={newsletterSelected} whatsappHref={whatsappHref} whatsappSelected={whatsappSelected} /></>}
                {role === "agency-admin" && 
                    <>
                        <ClientMenu />
                        <AgencyMenu socialHref={socialHref} socialSelected={socialSelected} newsletterHref={newsletterHref} newsletterSelected={newsletterSelected} whatsappHref={whatsappHref} whatsappSelected={whatsappSelected} />
                        <AgencyAdminMenu crmHref={crmHref} crmSelected={crmSelected} />
                    </>
                }
                {role === "admin" && 
                    <>
                    <ClientMenu />
                    <AgencyMenu socialHref={socialHref} socialSelected={socialSelected} newsletterHref={newsletterHref} newsletterSelected={newsletterSelected} whatsappHref={whatsappHref} whatsappSelected={whatsappSelected} />
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
    newsletterHref: string
    newsletterSelected: boolean
    whatsappHref: string
    whatsappSelected: boolean
}
function AgencyMenu({ socialHref, socialSelected, newsletterHref, newsletterSelected, whatsappHref, whatsappSelected }: AgencyProps) {
    return (
        <>
            <li className={cn("flex items-center border-b-tinta-vino hover:border-b-tinta-vino hover:border-b-2 h-10", socialSelected && "border-b-2")}>
                <Link href={socialHref}><Button className="h-8 text-lg" variant="ghost">Social</Button></Link>
            </li>
            <li className={cn("flex items-center border-b-tinta-vino hover:border-b-tinta-vino hover:border-b-2 h-10", newsletterSelected && "border-b-2")}>
                <Link href={newsletterHref}><Button className="h-8 text-lg" variant="ghost">Newsletter</Button></Link>
            </li>
            <li className={cn("flex items-center border-b-tinta-vino hover:border-b-tinta-vino hover:border-b-2 h-10", whatsappSelected && "border-b-2")}>
                <Link href={whatsappHref}><Button className="h-8 text-lg" variant="ghost">Mensajes</Button></Link>
            </li>
        </>
    )    
}

interface AgencyAdminProps {
    crmHref: string
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