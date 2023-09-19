'use client'

import { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import FontFamily from '@tiptap/extension-font-family';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import TextStyle from '@tiptap/extension-text-style';
import MenuBar from './menu-bar';
import BulletList from '@tiptap/extension-bullet-list';
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';

const Tiptap = () => {

  const [editorContent, setEditorContent ] = useState("Write the description here");

  const editor = useEditor({
    extensions: [
        StarterKit,
        TextStyle,
        FontFamily
    ],
    content: editorContent,
    editorProps :{
      attributes: {
        class: "prose prose-sm sm:prose lg:prose-base xl:prose-lg min-h-[300px] min-w-full  "
      }
    },

    onUpdate ({editor}) {
      setEditorContent(editor.getHTML())
      console.log(editorContent);
    }

  })

  onUpdate: {}

  return (
    <div className='border rounded-lg border-slate-700 mt-2 h-full pl-4 w-full min-h-[400px] '>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} /> 
    </div>
  )
}

export default Tiptap;