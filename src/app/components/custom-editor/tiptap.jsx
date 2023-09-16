'use client'

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

  const editor = useEditor({
    extensions: [
        StarterKit,
        Document,
        Paragraph, 
        TextStyle,
        FontFamily,
        ListItem,
        OrderedList,
        BulletList
    ],
    content: '<p>Hello World! 🌎️</p>',
  })

  return (
    <>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
        
    </>
  )
}

export default Tiptap;