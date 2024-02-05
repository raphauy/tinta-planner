"use client"

import { useEditor } from "@tiptap/react";
import StarterKit from '@tiptap/starter-kit';
import { Editor as NovelEditor } from "novel";

type Props = {
    content: string
}
export default function ContentViewer({ content }: Props) {

    const editor = useEditor({
        extensions: [
          StarterKit,
        ],
        content: content,
        editable: false,
      })

    const editorProps = {
        editable: () => false
    }

    return (
        <div className="flex justify-center h-full border rounded-b-lg">
            <NovelEditor
                className="w-full h-full bg-white rounded-t-none rounded-b-md"
                defaultValue={content ? JSON.parse(content) : {}}
                disableLocalStorage
                editorProps={editorProps}
            />
        </div>
    )
}
