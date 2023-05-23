import Link from "next/link";

import clsx from "clsx";

interface ClientBoxProps {
  label: string;
  href: string;
  icon: any;
  active?: boolean;
}

export default function ClientBox({ label, href, icon: Icon, active }: ClientBoxProps) {
  
  return ( 
    <Link 
      href={href} 
      className={clsx("group flex gap-x-2 text-sm leading-6 font-semibold w-full sm:justify-center p-4 text-gray-500 hover:text-black hover:bg-gray-100 hover:border-b-tinta-marron hover:border-b-2",
        active && "bg-gray-100 text-black border-b-tinta-marron border-b-2",
      )}>
      <Icon className="w-6 h-6" />
      <p className="whitespace-nowrap">{label}</p>
    </Link>
   );
}
 
