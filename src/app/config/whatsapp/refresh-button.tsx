"use client"

import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RefreshButton() {

    const [loading, setLoading] = useState(false)

    const router= useRouter()

    function handleClick() {
        setLoading(true)
        router.refresh()
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    }

    return (
        <Button onClick={handleClick} className="w-40">
            {
                loading ? 
                <Loader className="w-4 h-4 animate-spin" /> :
                <span>Refresh Status</span>
            }
        </Button>
    );
}