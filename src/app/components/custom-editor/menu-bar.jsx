

export default function MenuBar( { editor } ) {
  return (
    <div>
        <button className='mr-2 py-2 px-2 bg-slate-100 text-sm font-sans rounded-lg ' 
          onClick={() => {editor.chain().focus().setBold().run()}}
        >Bold</button>
        <button className='mx-2 py-2 px-2 bg-slate-100 text-sm font-sans rounded-lg ' 
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >List</button>
        <button className='mx-2 py-2 px-2 bg-slate-100 text-sm font-sans rounded-lg '
          onClick={() => editor.chain().focus().splitListItem('listItem').run()}
        >Ordered List</button>
        <button className='mx-2 py-2 px-2 bg-slate-100 text-sm font-sans rounded-lg ' 
          
        >List Item</button>
    </div>
  )
}
