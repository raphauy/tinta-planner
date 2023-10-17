"use client"

import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { useState } from "react"

export default function TipTapEditor() {
    const [editorState, setEditorState] = useState("")
    const editor= useEditor({
        autofocus: true,
        extensions: [StarterKit],
        content: editorState,
        onUpdate: ({ editor }) => {
            setEditorState(editor.getHTML())
        }
    })
    return (
        <div className="">            
            <EditorContent editor={editor} className="w-full h-32 p-2 border border-gray-300 rounded outline-none" />
        </div>
    )
}
