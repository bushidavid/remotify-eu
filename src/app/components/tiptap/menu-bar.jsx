

export default function MenuBar( { editor } ) {

  if(!editor) return null;

  return (
    <>
    <button
        onClick={(e) => {e.preventDefault(); editor.chain().focus().toggleBold().run()}}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleBold()
            .run()
        }
        className={`mr-1 py-2 px-2 bg-slate-100 text-sm font-sans rounded-lg ${editor.isActive('bold') ? 'bg-slate-200' : ''}`}
      >
        bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleItalic()
            .run()
        }
        className={`mr-1 py-2 px-2 bg-slate-100 text-sm font-sans rounded-lg ${editor.isActive('italic') ? 'is-active' : ''}`}
      >
        italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleStrike()
            .run()
        }
        className={`mr-1 py-2 px-2 bg-slate-100 text-sm font-sans rounded-lg ${editor.isActive('strike') ? 'is-active' : ''}`}
      >
        strike
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleCode()
            .run()
        }
        className={`mr-1 py-2 px-2 bg-slate-100 text-sm font-sans rounded-lg ${editor.isActive('code') ? 'is-active' : ''}`}
      >
        code
      </button>
      <button onClick={() => editor.chain().focus().unsetAllMarks().run()}
        className={`mr-1 py-2 px-2 bg-slate-100 text-sm font-sans rounded-lg`}
      >
        clear marks
      </button>
      <button onClick={() => editor.chain().focus().clearNodes().run()}
        className={`mr-1 py-2 px-2 bg-slate-100 text-sm font-sans rounded-lg`}
      >
        clear nodes
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={`mr-1 py-2 px-2 bg-slate-100 text-sm font-sans rounded-lg ${editor.isActive('paragraph') ? 'is-active' : ''}`}
      >
        paragraph
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`mr-1 py-2 px-2 bg-slate-100 text-sm font-sans rounded-lg ${editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}`}
      >
        h1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`mr-1 py-2 px-2 bg-slate-100 text-sm font-sans rounded-lg ${editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}`}
      >
        h2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`mr-1 py-2 px-2 bg-slate-100 text-sm font-sans rounded-lg ${editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}`}
      >
        h3
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={`mr-1 py-2 px-2 bg-slate-100 text-sm font-sans rounded-lg ${editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}`}
      >
        h4
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={`mr-1 py-2 px-2 bg-slate-100 text-sm font-sans rounded-lg ${editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}`}
      >
        h5
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={`mr-1 py-2 px-2 bg-slate-100 text-sm font-sans rounded-lg ${editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}`}
      >
        h6
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`mr-1 py-2 px-2 bg-slate-100 text-sm font-sans rounded-lg ${editor.isActive('bulletList') ? 'is-active' : ''}`}
      >
        bullet list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`mr-1 py-2 px-2 bg-slate-100 text-sm font-sans rounded-lg ${editor.isActive('orderedList') ? 'is-active' : ''}`}
      >
        ordered list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`mr-1 py-2 px-2 bg-slate-100 text-sm font-sans rounded-lg ${editor.isActive('codeBlock') ? 'is-active' : ''}`}
      >
        code block
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`mr-1 py-2 px-2 bg-slate-100 text-sm font-sans rounded-lg ${editor.isActive('blockquote') ? 'is-active' : ''}`}
      >
        blockquote
      </button>
      <button onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className={`mr-1 py-2 px-2 bg-slate-100 text-sm font-sans rounded-lg`}
      >
        horizontal rule
      </button>
      <button onClick={() => editor.chain().focus().setHardBreak().run()}
        className={`mr-1 py-2 px-2 bg-slate-100 text-sm font-sans rounded-lg`}
      >
        hard break
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .undo()
            .run()
        }
        className="className={`mr-1 py-2 px-2 bg-slate-100 text-sm font-sans rounded-lg`}"
      >
        undo
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .redo()
            .run()
        }
        className={`mr-1 py-2 px-2 bg-slate-100 text-sm font-sans rounded-lg`}
      >
        redo
      </button>
    </>

    // <div>
    //     <button className='mr-1 py-2 px-2 bg-slate-100 text-sm font-sans rounded-lg ' 
    //       onClick={() => {editor.chain().focus().setBold().run()}}
    //     >Bold</button>
    //     <button className='mx-1 py-2 px-2 bg-slate-100 text-sm font-sans rounded-lg ' 
    //       onClick={() => editor.chain().focus().toggleBulletList().run()}
    //     >List</button>
    //     <button className='mx-1 py-2 px-2 bg-slate-100 text-sm font-sans rounded-lg '
    //       onClick={() => editor.chain().focus().splitListItem('listItem').run()}
    //     >Ordered List</button>
    //     {/* <button className='mx-1 py-2 px-2 bg-slate-100 text-sm font-sans rounded-lg ' 
          
    //     >List Item</button> */}
    // </div>
  )
}
