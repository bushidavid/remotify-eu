'use client';

import {NextUIProvider} from '@nextui-org/react'

export default function Providers({ children }) {
  return (
    <div className='w-screen h-screen'>
      <NextUIProvider className="min-w-full min-h-full flex flex-col items-center justify-center">
        {children}
      </NextUIProvider>
    </div>
  )
}