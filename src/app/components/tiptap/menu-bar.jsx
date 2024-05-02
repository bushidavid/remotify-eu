import "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBold , faItalic, faStrikethrough, faCode, faParagraph, faHeading, faList, faListOl, faRotateLeft, faRotateRight} from "@fortawesome/free-solid-svg-icons";



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
        <FontAwesomeIcon icon={faBold} style={{color: "#142c42",}} />
      </button>
      <button
        onClick={(e) => {e.preventDefault(); editor.chain().focus().toggleItalic().run()}}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleItalic()
            .run()
        }
        className={`mr-1 py-2 px-2 bg-slate-100 text-sm font-sans rounded-lg ${editor.isActive('italic') ? 'is-active' : ''}`}
      >
        <FontAwesomeIcon icon={faItalic} style={{color: "#142c42",}} />
      </button>
      <button
        onClick={(e) => {e.preventDefault();editor.chain().focus().toggleStrike().run()}}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleStrike()
            .run()
        }
        className={`mr-1 py-2 px-2 bg-slate-100 text-sm font-sans rounded-lg ${editor.isActive('strike') ? 'is-active' : ''}`}
      >
        <FontAwesomeIcon icon={faStrikethrough} style={{color: "#142c42",}} />
      </button>
      <button
        onClick={(e) => {e.preventDefault(); editor.chain().focus().toggleCode().run()}}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleCode()
            .run()
        }
        className={`mr-1 py-2 px-2 bg-slate-100 text-sm font-sans rounded-lg ${editor.isActive('code') ? 'is-active' : ''}`}
      >
        <FontAwesomeIcon icon={faCode} style={{color: "#142c42",}} />
      </button>
      <button
        onClick={(e) => {e.preventDefault(); editor.chain().focus().setParagraph().run()}}
        className={`mr-1 py-2 px-2 bg-slate-100 text-sm font-sans rounded-lg ${editor.isActive('paragraph') ? 'is-active' : ''}`}
      >
        <FontAwesomeIcon icon={faParagraph} style={{color: "#142c42",}}/>
      </button>
      <button
        onClick={(e) => {e.preventDefault(); editor.chain().focus().toggleHeading({ level: 1 }).run()}}
        className={`mr-1 py-2 px-2 bg-slate-100 text-sm font-sans rounded-lg ${editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}`}
      >
        <FontAwesomeIcon icon={faHeading} style={{color: "#142c42",}} />
      </button>
      <button
        onClick={(e) => {e.preventDefault(); editor.chain().focus().toggleHeading({ level: 2 }).run()}}
        className={`mr-1 py-2 px-2 bg-slate-100 text-sm font-sans rounded-lg ${editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}`}
      >
        h2
      </button>
      <button
        onClick={(e) => {e.preventDefault(); editor.chain().focus().toggleHeading({ level: 3 }).run()}}
        className={`mr-1 py-2 px-2 bg-slate-100 text-sm font-sans rounded-lg ${editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}`}
      >
        h3
      </button>
      <button
        onClick={(e) => {e.preventDefault();editor.chain().focus().toggleBulletList().run()}}
        className={`mr-1 py-2 px-2 bg-slate-100 text-sm font-sans rounded-lg ${editor.isActive('bulletList') ? 'is-active' : ''}`}
      >
        <FontAwesomeIcon icon={faList} style={{color: "#142c42",}} />
      </button>
      <button
        onClick={(e) => {e.preventDefault();editor.chain().focus().toggleOrderedList().run()}}
        className={`mr-1 py-2 px-2 bg-slate-100 text-sm font-sans rounded-lg ${editor.isActive('orderedList') ? 'is-active' : ''}`}
      >
        <FontAwesomeIcon icon={faListOl} style={{color: "#142c42",}} />
      </button>
      <button
        onClick={(e) => {e.preventDefault(); editor.chain().focus().undo().run()}}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .undo()
            .run()
        }
        className="className={`mr-1 py-2 px-2 bg-slate-100 text-sm font-sans rounded-lg`}"
      >
        <FontAwesomeIcon icon={faRotateLeft} style={{color: "#142c42",}} />
      </button>
      <button
        onClick={(e) => {e.preventDefault(); editor.chain().focus().redo().run()}}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .redo()
            .run()
        }
        className={`mr-1 py-2 px-2 bg-slate-100 text-sm font-sans rounded-lg`}
      >
        <FontAwesomeIcon icon={faRotateRight} style={{color: "#142c42",}} />
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
