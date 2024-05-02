import Link from 'next/link'
import React from 'react'

export default function SidebarNav() {
  return (
    <>
        <div className='col-span-2 row-span-full w-full flex flex-col items-start justify-start '>
            <Link href={"/"} className='border border-slate-200 rounded-md w-10/12 p-2 my-1'> Dashboard </Link>
            <Link href={"/"} className='border border-slate-200 rounded-md w-10/12 p-2 my-1'> Account </Link>
            <Link href={"/"} className='border border-slate-200 rounded-md w-10/12 p-2 my-1'> Jobs </Link>
        </div>
    </>
  )
}
