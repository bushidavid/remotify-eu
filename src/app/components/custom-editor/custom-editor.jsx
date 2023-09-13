'use client';

import JoditEditor from 'jodit-react';
import { useState, useRef } from "react";

const buttons = [
    "undo",
    "redo",
    "|",
    "bold",
    "strikethrough",
    "underline",
    "italic",
    "|",
    "superscript",
    "subscript",
    "|",
    "align",
    "|",
    "ul",
    "ol",
    "outdent",
    "indent",
    "|",
    "font",
    "fontsize",
    "brush",
    "paragraph",
    "|",
    "image",
    "link",
    "table",
    "|",
    "hr",
    "eraser",
    "copyformat",
    "|",
    "fullsize",
    "selectall",
    "print",
    "|",
    "source",
    "|",
    {
      name: "copyContent",
      tooltip: "Copy HTML to Clipboard",
      iconURL: "images/copy.png",
      exec: function(editor) {
        let html = editor.value;
        copyStringToClipboard(html);
      }
    }
  ];


export default function CustomEditor() {

    const editor = useRef(null);
    const [content, setContent] = useState("Write here...");
    const config = {
      readonly: false,
      height: 400,
      buttons: buttons,
    }

    const handleUpdate = (event) => {
      const editorContent = event.target.innerHTML;
      setContent(editorContent);
    };
  
    return (
      <div className="A">
        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          //onBlur={e => handleUpdate(e)}
          onChange={(newContent) => {}}
        />
        
      </div>
    );
}