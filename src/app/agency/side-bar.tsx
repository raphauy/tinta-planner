"use client"

import { usePathname } from "next/navigation"
import SocialSideBar from "./[slug]/social/social-side-bar"
import CRMSideBar from "./[slug]/crm/crm-side-bar"

export default function MainSideBar() {
  const path= usePathname()

  if (path.includes("/social"))
    return <SocialSideBar />

  if (path.includes("/crm"))
    return <CRMSideBar />

  return (
    <div>MainSideBar</div>
  )
}
