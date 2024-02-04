'use client';

import {NextUIProvider} from '@nextui-org/react'

export default function Providers({ children }) {
  return (
    <div className='w-full h-full'>
      <NextUIProvider className="min-w-full min-h-full flex items-center justify-center">
        {children}
      </NextUIProvider>
    </div>
  )
}