"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Card, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface EssayEditorProps {
  // Function to save the content (e.g., auto-save or final submission)
  onUpdateContent: (content: string, wordCount: number) => void;
  initialContent?: string;
}

const Toolbar = ({ editor }: { editor: any }) => (
  <div className="flex items-center gap-2 p-2 border-b rounded-t-lg bg-gray-50 dark:bg-gray-800">
    <Button
      type="button"
      onClick={() => editor.chain().focus().toggleBold().run()}
      disabled={!editor.can().chain().focus().toggleBold().run()}
      variant={editor.isActive("bold") ? "secondary" : "ghost"}
      size="sm">
      B
    </Button>
    <Button
      type="button"
      onClick={() => editor.chain().focus().toggleItalic().run()}
      disabled={!editor.can().chain().focus().toggleItalic().run()}
      variant={editor.isActive("italic") ? "secondary" : "ghost"}
      size="sm">
      I
    </Button>
  </div>
);
export default function EssayEditor({ onUpdateContent, initialContent }: EssayEditorProps) {
  const editor = useEditor(
    {
      extensions: [
        StarterKit.configure({
          // Disable unnecessary features for a basic essay editor
          heading: { levels: [2, 3] },
          blockquote: false,
          code: false,
          codeBlock: false,
        }),
      ],
      content: initialContent || "",
      immediatelyRender: false,
      editorProps: {
        attributes: {
          // Tailwind styling for the editor area
          class:
            "min-h-[300px] max-h-[500px] overflow-y-auto p-4 border rounded-b-lg focus:outline-none ring-2 ring-transparent focus:ring-primary/50 transition-colors",
        },
      },
      onUpdate: ({ editor }) => {
        // 1. Get plain text for word counting
        const text = editor.getText({ blockSeparator: " " });
        // 2. Simple word count: split by spaces and filter out empty strings
        const wordCount = text
          .trim()
          .split(/\s+/)
          .filter((word) => word.length > 0).length;

        // 3. Notify parent component of the change
        onUpdateContent(editor.getHTML(), wordCount);
      },
    },
    [initialContent]
  );

  if (!editor) {
    return null;
  }

  // Calculate word count for display
  const currentWordCount = editor
    .getText({ blockSeparator: " " })
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
  const maxWords = 300; // Example limit for PTE Essay

  return (
    <Card className="w-full">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
      <Separator />
      <CardFooter className="flex justify-end pt-3">
        <span
          className={`text-sm font-medium ${currentWordCount > maxWords ? "text-red-500" : "text-muted-foreground"}`}>
          Words: <strong>{currentWordCount}</strong> / {maxWords}
        </span>{" "}
      </CardFooter>
    </Card>
  );
}
