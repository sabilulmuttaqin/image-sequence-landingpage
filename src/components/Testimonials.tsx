'use client';
import { useState, useRef, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';

const testimonials = [
  {
    quote: "The only fuel that keeps up with my 12-hour coding sprints. Absolute game changer.",
    author: "Alex Chen",
    role: "Senior Systems Architect"
  },
  {
    quote: "Zero crash. Pure focus. It allows me to push my limits when everyone else is tapping out.",
    author: "Sarah Jenkins",
    role: "Pro E-Sports Athlete"
  },
  {
    quote: "I've tried everything. Nothing hits quite like Monsta. The clarity is unmatched.",
    author: "Marcus Thorne",
    role: "Creative Director"
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const authorRef = useRef<HTMLDivElement>(null);

  const nextTestimonial = () => {
    if (!quoteRef.current || !authorRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
      }
    });

    // Fade Out
    tl.to([quoteRef.current, authorRef.current], {
      y: -20,
      opacity: 0,
      duration: 0.4,
      stagger: 0.1,
      ease: "power2.in"
    });
  };

  // Fade In when index changes
  useEffect(() => {
    if (!quoteRef.current || !authorRef.current) return;
    
    gsap.fromTo([quoteRef.current, authorRef.current], 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" }
    );
  }, [activeIndex]);

  return (
    <section className="py-32 bg-black text-white border-t border-white/5 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="mb-12 text-[var(--color-neon-green)] font-mono text-sm tracking-wider uppercase">
            // Testimonials
        </div>
        
        <div className="min-h-[300px] flex flex-col justify-center">
            <p 
                ref={quoteRef}
                className="text-3xl md:text-5xl font-light leading-tight mb-8"
            >
                "{testimonials[activeIndex].quote}"
            </p>
            
            <div ref={authorRef} className="flex items-center gap-4">
                <div className="h-[1px] w-12 bg-white/30"></div>
                <div>
                    <div className="font-bold text-lg">{testimonials[activeIndex].author}</div>
                    <div className="text-sm text-gray-500 font-mono">{testimonials[activeIndex].role}</div>
                </div>
            </div>
        </div>

        <button 
            onClick={nextTestimonial}
            className="absolute bottom-0 right-6 md:right-0 p-4 border border-white/10 rounded-full hover:border-[var(--color-neon-green)] hover:text-[var(--color-neon-green)] transition-all duration-300 group"
        >
            <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Decorative large text */}
      <div className="absolute -bottom-20 -right-20 text-[20vw] font-black text-white/5 select-none pointer-events-none leading-none">
        VOICE
      </div>
    </section>
  );
}
