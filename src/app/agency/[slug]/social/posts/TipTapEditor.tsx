"use client"

import React from "react";
import axios from "axios";
import { useCompletion } from "ai/react";


const TipTapEditor = ({ note }: Props) => {
  const [editorState, setEditorState] = React.useState(
    note.editorState || `<h1>${note.name}</h1>`
  );
  const { complete, completion } = useCompletion({
    api: "/api/completion",
  });
  const saveNote = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/saveNote", {
        noteId: note.id,
        editorState,
      });
      return response.data;
    },
  });
  const customText = Text.extend({
    addKeyboardShortcuts() {
      return {
        "Shift-a": () => {
          // take the last 30 words
          const prompt = this.editor.getText().split(" ").slice(-30).join(" ");
          complete(prompt);
          return true;
        },
      };
    },
  });

  const editor = useEditor({
    autofocus: true,
    extensions: [StarterKit, customText],
    content: editorState,
    onUpdate: ({ editor }) => {
      setEditorState(editor.getHTML());
    },
  });
  const lastCompletion = React.useRef("");

  React.useEffect(() => {
    if (!completion || !editor) return;
    const diff = completion.slice(lastCompletion.current.length);
    lastCompletion.current = completion;
    editor.commands.insertContent(diff);
  }, [completion, editor]);

  const debouncedEditorState = useDebounce(editorState, 500);
  React.useEffect(() => {
    // save to db
    if (debouncedEditorState === "") return;
    saveNote.mutate(undefined, {
      onSuccess: (data) => {
        console.log("success update!", data);
      },
      onError: (err) => {
        console.error(err);
      },
    });
  }, [debouncedEditorState]);
  return (
    <>
      <div className="flex">
        {editor && <TipTapMenuBar editor={editor} />}
        <Button disabled variant={"outline"}>
          {saveNote.isLoading ? "Saving..." : "Saved"}
        </Button>
      </div>

      <div className="w-full mt-4 prose-sm prose">
        <EditorContent editor={editor} />
      </div>
      <div className="h-4"></div>
      <span className="text-sm">
        Tip: Press{" "}
        <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">
          Shift + A
        </kbd>{" "}
        for AI autocomplete
      </span>
    </>
  );
};

export default TipTapEditor;