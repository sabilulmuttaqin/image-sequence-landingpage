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
  const frameCount = 240;
  const currentFrame = useRef({ index: 0 });
  // Camera state for dynamic zoom/pan effects
  const camera = useRef({ zoom: 1, panX: 0, panY: 0 });

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
    
    // Base scale for cover fit
    const baseScale = Math.max(rect.width / img.naturalWidth, rect.height / img.naturalHeight);
    
    // Apply dynamic camera zoom
    const finalScale = baseScale * camera.current.zoom;
    
    const dw = img.naturalWidth * finalScale;
    const dh = img.naturalHeight * finalScale;
    
    // Apply dynamic camera pan (offset from center)
    // panX/panY are percentages of screen width/height (-0.5 to 0.5 range roughly)
    const panOffsetX = camera.current.panX * rect.width;
    const panOffsetY = camera.current.panY * rect.height;

    const dx = (rect.width - dw) / 2 + panOffsetX;
    const dy = (rect.height - dh) / 2 + panOffsetY;

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

        canvas.width = Math.round(rect.width * dpr);
        canvas.height = Math.round(rect.height * dpr);

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";

        renderFrame(currentFrame.current.index);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

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
        img.src = `/sequence2/ezgif-frame-${formattedIndex}.jpg`;
        
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

    // Total scroll distance is effectively 100% of the timeline
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5, // slightly smoother scrubbing
            pin: canvasRef.current,
        }
    });

    // 1. Frame Sequence Animation (Main Driver)
    tl.to(currentFrame.current, {
        index: frameCount - 1,
        snap: "index",
        ease: "none",
        duration: 100, // Normalized duration to make positioning easier
        onUpdate: () => {
            renderFrame(Math.round(currentFrame.current.index));
        }
    }, 0);

    // 2. Camera Moves
    // Locations based on StoryOverlay positions:
    // "Pure Focus": top-[250vh] -> approx 31% of 800vh
    // "Beyond Human": top-[450vh] -> approx 56% of 800vh
    
    // Camera Moves Removed as per request (Standard centered view)
    // If needed, we can re-enable subtle movements here.

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

        {/* Vignette Overlay: Sides (30%) + Bottom (20%) to hide watermarks and blend footer */}
        <div 
            className="absolute inset-0 z-[5] pointer-events-none"
            style={{ 
                background: `
                    linear-gradient(to right, black 0%, transparent 30%, transparent 70%, black 100%),
                    linear-gradient(to top, black 0%, transparent 20%)
                `
            }}
        />
        
        {/* Helper/Overlay Container */}
        <div className="absolute inset-0 z-10 pointer-events-none">
            {children}
        </div>
    </div>
  );
}
