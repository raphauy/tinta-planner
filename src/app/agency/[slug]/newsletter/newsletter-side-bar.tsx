"use client"

import { cn, getSlug } from "@/lib/utils";
import { MailCheck, Newspaper } from "lucide-react";
import { Send } from "lucide-react";
import { AlignVerticalSpaceAround, Contact, LayoutDashboard, Settings, TerminalSquare, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";



export default function NewsletterSideBar() {

  const path= usePathname()
  const slug= getSlug(path)
  const data= getData(slug)

  const commonClasses= "flex gap-2 items-center py-1 mx-2 rounded hover:bg-gray-200 dark:hover:text-black"
  const selectedClasses= "font-bold bg-gray-200 dark:border-r-white"


  return (
    <div className="flex flex-col justify-between border-r border-r-osom-color/50">
      <section className="flex flex-col gap-3 py-4 mt-3 ">
        {data.map(({ href, icon: Icon, text }, index) => {
          if (href === "divider") return divider(index)
          
          const selected= path.endsWith(href)
          const classes= cn(commonClasses, selected && selectedClasses)
          return (
            <Link href={href} key={href} className={classes}>
              <Icon size={23} />
              <p className="hidden sm:block lg:w-36">{text}</p>                  
            </Link>
          )
        })}

        {/* <Link href="/admin" className={dashboard}>
          <LayoutDashboard size={23} />
          <p className={pClasses}>Dashboard</p>                  
        </Link> */}

        {divider()}



      </section>
    </div>
  );
}


function divider(key?: number) {
  return <div key={key} className="mx-2 my-5 border-b border-b-osom-color/50" />
}

function getData(slug: string) {
 
  const data= [
    {
      href: `/agency/${slug}/newsletter`,
      icon: LayoutDashboard,
      text: "Dashboard"
    },
    {
      href: "divider", icon: User
    },
    {
      href: `/agency/${slug}/newsletter/newsletters`,
      icon: Newspaper,
      text: "Newsletters"
    },
    {
      href: `/agency/${slug}/newsletter/envios`,
      icon: Send,
      text: "Envios"
    },
    {
      href: `/agency/${slug}/newsletter/emails`,
      icon: MailCheck,
      text: "Emails enviados"
    },
    {
      href: "divider", icon: User
    },
    {
      href: `/agency/${slug}/newsletter/contacts`,
      icon: Contact,
      text: "Contactos"
    },
  ]
 
  return data
}