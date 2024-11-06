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
      className={`relative flex items-center gap-2 w-full flex-grow whitespace-nowrap ${isMobile ? 'animate-marquee' : ''}`}
    >
        {tags?.split(',').map(tag => (
        <p className={`text-xs font-extralight rounded-full border-1 px-2 pt-0.5 mx-1 my-0.5`} key={tag}>{tag}</p>
        ))}      
    </div>
  )
}
