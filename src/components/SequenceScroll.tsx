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

  // Render function that handles High-DPI "cover" drawing
  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const images = imagesRef.current;
    
    if (!canvas || !ctx || !images[index]) return;

    const img = images[index];
    const rect = canvas.getBoundingClientRect();
    
    // Safety check if element is hidden
    if (rect.width === 0 || rect.height === 0) return;
    
    // Calculate aspect ratio to cover
    const scale = Math.max(rect.width / img.naturalWidth, rect.height / img.naturalHeight); // Standard cover without zoom
    const dw = img.naturalWidth * scale;
    const dh = img.naturalHeight * scale;
    
    const dx = (rect.width - dw) / 2;
    const dy = (rect.height - dh) / 2;

    // Clear using logical dimensions (since context is transformed)
    ctx.clearRect(0, 0, rect.width, rect.height);
    ctx.drawImage(img, dx, dy, dw, dh);
  };

  // Handle Resize & Retina Scaling
  useEffect(() => {
    const handleResize = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();

        // 1. Set display size (css pixels) - handled by className/style, 
        // but we read it via getBoundingClientRect.
        // 2. Set actual size in memory (scaled to account for extra pixel density)
        canvas.width = Math.round(rect.width * dpr);
        canvas.height = Math.round(rect.height * dpr);

        // 3. Normalize coordinate system to use css pixels
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        
        // 4. Set Image Quality options
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";

        // Re-render to prevent flicker
        renderFrame(currentFrame.current.index);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial sizing

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Preload Images
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

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
                renderFrame(0);
                ScrollTrigger.refresh();
            }
        };
        
        images.push(img);
    }
    imagesRef.current = images;
  }, []);

  // Scroll Animation
  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
            pin: canvasRef.current,
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
        style={{ height: '800vh' }}
    >
        <canvas 
            ref={canvasRef} 
            className="block h-screen w-full object-cover z-0"
            // Important: Style width/height must be 100% to fill container for getBoundingClientRect
            style={{ width: '100vw', height: '100vh' }} 
        />

        {/* Vignette Overlay: Thicker linear gradient on sides to strictly cover watermark */}
        <div 
            className="absolute inset-0 z-[5] pointer-events-none"
            style={{ 
                background: 'linear-gradient(to right, black 0%, transparent 30%, transparent 70%, black 100%)'
            }}
        />
        
        {/* Helper/Overlay Container */}
        <div className="absolute inset-0 z-10 pointer-events-none">
            {children}
        </div>
    </div>
  );
}
