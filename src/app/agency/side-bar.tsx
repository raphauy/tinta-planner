"use client"

import { usePathname } from "next/navigation"
import SocialSideBar from "./[slug]/social/social-side-bar"
import CRMSideBar from "./[slug]/crm/crm-side-bar"
import NewsletterSideBar from "./[slug]/newsletter/newsletter-side-bar"

export default function MainSideBar() {
  const path= usePathname()

  if (path.includes("/social"))
    return <SocialSideBar />

  if (path.includes("/crm"))
    return <CRMSideBar />

  if (path.includes("/newsletter"))
    return <NewsletterSideBar />

  return (
    <div>MainSideBar</div>
  )
}
