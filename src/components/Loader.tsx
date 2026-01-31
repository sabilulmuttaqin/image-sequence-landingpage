'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface LoaderProps {
  progress: number;
}

export default function Loader({ progress }: LoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Animate the progress bar width and number
    if (barRef.current) {
      gsap.to(barRef.current, {
        width: `${progress}%`,
        duration: 0.1,
        ease: 'none',
      });
    }
  }, [progress]);

  useEffect(() => {
    if (progress === 100 && containerRef.current) {
      const tl = gsap.timeline();
      
      tl.to(containerRef.current, {
        opacity: 0,
        pointerEvents: 'none',
        duration: 1,
        ease: 'power3.inOut',
        delay: 0.5
      });
    }
  }, [progress]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black text-[#ededed] h-screen w-screen"
    >
      <div className="relative w-64 md:w-96 flex flex-col gap-4">
        <div className="flex justify-between items-end font-mono text-xs md:text-sm uppercase tracking-wider text-[#666]">
          <span>Loading Experience</span>
          <span ref={numberRef} className="text-[var(--color-neon-green)] text-lg md:text-xl font-bold">
            {Math.round(progress)}%
          </span>
        </div>
        
        {/* Progress Bar Container */}
        <div className="w-full h-[2px] bg-[#333] relative overflow-hidden">
          {/* Progress Bar Fill */}
          <div 
            ref={barRef} 
            className="absolute top-0 left-0 h-full bg-[var(--color-neon-green)] shadow-[0_0_10px_var(--color-neon-green)]"
            style={{ width: '0%' }}
          />
        </div>

        {/* Decorative elements */}
        <div className="text-[10px] text-[#444] font-mono text-center pt-2">
          INITIALIZING SEQUENCES // MONSTA ENERGY
        </div>
      </div>
    </div>
  );
}
