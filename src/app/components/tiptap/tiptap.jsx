'use client';

import { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import FontFamily from '@tiptap/extension-font-family';
import TextStyle from '@tiptap/extension-text-style';
import MenuBar from './menu-bar';

import '../../style.css'

const TipTap = ({ setDescription }) => {

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
        class: "prose prose-sm sm:prose lg:prose-base xl:prose-lg h-[400px] min-w-full overflow-y-scroll border border-slate-300 rounded-lg focus:outline-none "
      }
    },


    onUpdate ({editor}) {
      setEditorContent(editor.getHTML())
      setDescription(editorContent);
    }

  })

  return (
    // <div className='border rounded-lg border-slate-700 mt-2 h-full pl-4 w-full min-h-[400px] overflow-y-scroll'>
    <>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} /> 
    </>
    // </div>
  )
}

export default TipTap;