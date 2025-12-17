import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Youtube from "@tiptap/extension-youtube";

import {
  Table,
  TableRow,
  TableCell,
  TableHeader,
} from "@tiptap/extension-table";

import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { lowlight } from "lowlight";

import { useEffect } from "react";

export default function RichTextEditor({ value, onChange }) {

  // ------------- EDITOR INITIALIZATION -------------
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      CodeBlockLowlight.configure({ lowlight }),
      Image,
      Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
      }),
      Youtube.configure({
        controls: true,
        nocookie: true,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],

    content: value, // initial content

    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      if (html !== value) {
        onChange(html);
      }
    },
  });

  // Prevent content disappearing on edit
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value, false);
    }
  }, [value, editor]);


  // ---------- INSERT LINK ----------
  const addLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Enter URL", previousUrl || "https://");

    if (url === null) return;

    if (url === "") {
      editor.chain().focus().unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  // ---------- IMAGE UPLOAD ----------
  const uploadImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD}/image/upload`,
      { method: "POST", body: data }
    );

    const json = await res.json();
    if (json.secure_url) {
      editor.chain().focus().setImage({ src: json.secure_url }).run();
    }
  };


  if (!editor) return <div>Loading editor…</div>;

  return (
    <div style={{ border: "1px solid #ddd", borderRadius: 8 }}>

      {/* --------- TOOLBAR --------- */}
      <div
        style={{
          padding: 8,
          borderBottom: "1px solid #ddd",
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()}><b>B</b></button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()}><i>I</i></button>
        <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()}><u>U</u></button>
        <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()}><s>S</s></button>

        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>H3</button>

        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()}>• List</button>
        <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()}>1. List</button>

        <button type="button" onClick={addLink}>🔗 Link</button>

        <button type="button" onClick={() => editor.chain().focus().setTextAlign("left").run()}>⬅ Left</button>
        <button type="button" onClick={() => editor.chain().focus().setTextAlign("center").run()}>⬆ Center</button>
        <button type="button" onClick={() => editor.chain().focus().setTextAlign("right").run()}>➡ Right</button>

        <label style={{ cursor: "pointer" }}>
          📷 Image
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={uploadImage}
          />
        </label>

        <button
          type="button"
          onClick={() => {
            const url = prompt("YouTube URL:");
            if (url) editor.chain().focus().setYoutubeVideo({ src: url }).run();
          }}
        >
          ▶ YouTube
        </button>

        <button type="button" onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3 }).run()}>
          📊 Table
        </button>

        <button type="button" onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
          {`</>`}
        </button>

        <button type="button" onClick={() => editor.chain().focus().undo().run()}>↶ Undo</button>
        <button type="button" onClick={() => editor.chain().focus().redo().run()}>↷ Redo</button>
      </div>

      {/* --------- CONTENT AREA --------- */}
      <div style={{ padding: 12 }}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
