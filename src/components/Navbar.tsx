'use client';
import { useState, useRef, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';
import Link from 'next/link';
import { useLenis } from 'lenis/react';

const menuItems = [
  { label: 'Energy', href: '#features' },
  { label: 'The Surge', href: '#sequence' },
  { label: 'Ingredients', href: '#bento' },
  { label: 'Community', href: '#about' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    if (isOpen) {
      lenis?.stop();
      // Animation In
      const tl = gsap.timeline();
      
      tl.to(menuRef.current, {
        clipPath: 'circle(150% at calc(100% - 3rem) 3rem)',
        duration: 0.8,
        ease: 'power3.inOut'
      })
      .fromTo(linksRef.current?.children || [], 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out' },
        '-=0.4'
      );
      
    } else {
      lenis?.start();
      // Animation Out
      gsap.to(menuRef.current, {
        clipPath: 'circle(0% at calc(100% - 3rem) 3rem)',
        duration: 0.8,
        ease: 'power3.inOut'
      });
    }
  }, [isOpen, lenis]);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center mix-blend-difference text-white">
        <Link href="/" className="text-2xl font-black tracking-tighter uppercase font-sans">
          MONSTA <span className="text-[var(--color-neon-green)]">.</span>
        </Link>
        
        <button 
          onClick={() => setIsOpen(true)}
          className="p-2 hover:text-[var(--color-neon-green)] transition-colors duration-300"
        >
          <Menu size={28} />
        </button>
      </nav>

      {/* Fullscreen Menu Overlay */}
      <div 
        ref={menuRef}
        className="fixed inset-0 z-[100] bg-black text-white flex items-center justify-center [clip-path:circle(0%_at_calc(100%_-_3rem)_3rem)]"
      >
        {/* Background decorative grid or effect could go here */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,var(--color-neon-green),transparent_70%)]" />
        
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6 p-2 hover:text-[var(--color-neon-green)] transition-colors duration-300"
        >
          <X size={32} />
        </button>

        <div 
          ref={linksRef}
          className="flex flex-col gap-8 text-center"
        >
          {menuItems.map((item, index) => (
            <Link 
              key={index}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="text-4xl md:text-6xl font-black uppercase tracking-tighter hover:text-[var(--color-neon-green)] transition-colors duration-300 hover:scale-105 transform inline-block"
            >
              {item.label}
            </Link>
          ))}
          
          <div className="mt-8 pt-8 border-t border-white/10 flex flex-col gap-2">
             <p className="text-sm font-mono text-gray-500">EST. 2026</p>
             <p className="text-sm font-mono text-gray-500">TOKYO • NEW YORK • BERLIN</p>
          </div>
        </div>
      </div>
    </>
  );
}
