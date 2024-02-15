"use client"

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Editor, JSONContent } from '@tiptap/core';
import { Eye, Loader, Save } from "lucide-react";
import { Editor as NovelEditor } from "novel";
import { useState } from "react";
import Link from "next/link";
import { updateContentAction } from "../newsletter-actions";

type Props = {
    newsletterId: string
    slug: string
    initialContent: string
}

export default function NovelOnClient({ newsletterId, slug, initialContent }: Props) {

    const [loading, setLoading] = useState(false);
    const [contentHtml, setContentHtml] = useState<string>("")
    const [contentJson, setContentJson] = useState<string>(initialContent)    

    function onUpdate(editor: Editor | undefined) {
        if (!editor) {
            return
        }
        setContentJson(JSON.stringify(editor.getJSON()))
        setContentHtml(editor.getHTML())
    }

    function save() {
        setLoading(true);
        updateContentAction(newsletterId, contentHtml, contentJson)
        .then(() => {
            toast({ title: "Content saved"})
        })
        .catch(() => {
            toast({ title: "Failed to save content"})
        })
        .finally(() => {
            setLoading(false);
        })
    }

    return (
        <div className="relative flex h-full xl:min-w-[1000px] flex-col items-center gap-4 justify-between">
            <div className="fixed z-20 flex flex-col gap-1 bottom-50 right-10">
                <Button onClick={save} className="p-2">
                {loading ? (
                    <Loader className="w-4 h-4 animate-spin" />
                ) : (
                    <Save />
                )}
                </Button>
                <Link href={`/agency/${slug}/newsletter/newsletters/${newsletterId}/preview`} target="_blank">
                    <Button className="p-2">
                        <Eye />
                    </Button>
                </Link>

            </div>
            <NovelEditor
                className="bg-white rounded-t-none rounded-b-md"
                defaultValue={contentJson ? JSON.parse(contentJson) : {}}
                onUpdate={onUpdate}      
                disableLocalStorage
            />

        </div>
    )
}



