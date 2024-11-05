'use client';

import {NextUIProvider} from '@nextui-org/react'

export default function Providers({ children }) {
  return (
    <div className='w-screen h-screen'>
      <NextUIProvider className="w-full h-full flex flex-col items-center">
        {children}
      </NextUIProvider>
    </div>
  )
}