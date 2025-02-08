'use client';

import { useEffect, useRef, useState } from 'react';

export default function Tags({ tags }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // Only animate on mobile view
    };

    checkIsMobile(); // Initial check
    window.addEventListener('resize', checkIsMobile);

    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  return (
    <div
      className={`relative flex items-center z-0 gap-2 min-w-full w-full flex-grow whitespace-nowrap overflow-hidden ${isMobile ? 'animate-marquee' : ''}`}
    >   
        {tags?.map(tag => (
        <p className={`text-xs font-extralight rounded-full border-1 px-2 pt-0.5 mx-1 my-0.5`} key={tag}>{tag}</p>
        ))}      
    </div>
  )
}
