'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';



interface SequenceScrollProps {
  onProgress: (progress: number) => void;
  onLoaded: () => void;
  children?: React.ReactNode;
}

export default function SequenceScroll({ onProgress, onLoaded, children }: SequenceScrollProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameCount = 192;
  const currentFrame = useRef({ index: 0 });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    // Preload images
    for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        const formattedIndex = i.toString().padStart(3, '0');
        img.src = `/sequence/ezgif-frame-${formattedIndex}.jpg`;
        
        img.onload = () => {
            loadedCount++;
            const progress = (loadedCount / frameCount) * 100;
            onProgress(progress);
            
            if (loadedCount === frameCount) {
                onLoaded();
                // Initial draw
                renderFrame(0);
                ScrollTrigger.refresh();
            }
        };
        
        images.push(img);
    }
    imagesRef.current = images;

    // Canvas Resize Logic
    const handleResize = () => {
        if (!canvasRef.current) return;
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        renderFrame(currentFrame.current.index);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial sizing

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Render function that handles "cover" style containment
  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const images = imagesRef.current;
    
    if (!canvas || !ctx || !images[index]) return;

    const img = images[index];
    const w = canvas.width;
    const h = canvas.height;
    
    // Calculate aspect ratio to cover
    const scale = Math.max(w / img.width, h / img.height) * 1.2; // Zoom to crop watermark
    const x = (w - img.width * scale) / 2;
    const y = (h - img.height * scale) / 2;

    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
            pin: canvasRef.current,
            // markers: true, // For debugging
        }
    });

    tl.to(currentFrame.current, {
        index: frameCount - 1,
        snap: "index",
        ease: "none",
        onUpdate: () => {
            renderFrame(Math.round(currentFrame.current.index));
        }
    });

    return () => {
        tl.kill();
        ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div 
        ref={containerRef} 
        className="relative w-full bg-black font-sans"
        // Adjust height to control speed: 800vh means 8 screen heights to scroll through the sequence
        style={{ height: '800vh' }}
    >
        <canvas 
            ref={canvasRef} 
            className="block h-screen w-full object-cover z-0"
        />
        
        {/* Helper/Overlay Container */}
        <div className="absolute inset-0 z-10 pointer-events-none">
            {children}
        </div>
    </div>
  );
}
