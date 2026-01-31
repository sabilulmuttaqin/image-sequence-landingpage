'use client';
import { useRef } from 'react';

const stories = [
  {
    title: "UNLEASH THE BEAST",
    text: "Experience the surge of pure energy. No crash, just raw power.",
    position: "top-[20%] left-[10%]",
    align: "text-left"
  },
  {
    title: "ZERO SUGAR.\nMAXIMUM IMPACT.",
    text: "Precision engineered for peak performance. The only choice for champions.",
    position: "top-[40%] right-[10%]",
    align: "text-right"
  },
  {
    title: "THE FUTURE OF\nENERGY",
    text: "Join the movement. Fuel your destiny.",
    position: "top-[70%] left-1/2 -translate-x-1/2 text-center",
    align: "text-center"
  }
];

export default function StoryOverlay() {
  return (
    <div className="relative w-full h-full">
      {stories.map((story, i) => (
        <div 
          key={i}
          className={`absolute ${story.position} max-w-xl p-8 z-20 mix-blend-difference`}
          // We can add distinct animation hooks here if needed, but simple positioning 
          // works well with the scroll layout.
          // Alternatively, we can use sticky positioning or scroll-linked opacity within this container.
        >
          {/* We will space these out using viewport units relative to the massive container height 
              so they appear at the right moments in the sequence. 
              Since parent is 800vh, top-20% is way too far down (160vh).
              We need to position them relative to specific 'screens'.
              
              Let's adjust the props or logic. 
              Actually, simply placing them at specific top percentages of the 800vh container 
              is the easiest way to sync them.
          */}
        </div>
      ))}
      
      {/* 
        Better approach for precise control: 
        Manual placement based on screen index.
        Screen 1: Intro (0vh - 100vh)
        Screen 2: Details (100vh - 200vh) etc.
      */}
      
      <section className="absolute top-[50vh] left-[10%] max-w-lg z-20 mix-blend-difference text-white">
        <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 leading-none">
          UNLEASH <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-neon-green)] to-white">
            THE FORCE
          </span>
        </h2>
        <p className="text-xl md:text-2xl font-light opacity-90">
            Formulated for those who refuse to settle.
        </p>
      </section>

      <section className="absolute top-[250vh] right-[10%] text-right max-w-lg z-20 mix-blend-difference text-white">
        <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 leading-none">
          PURE <br />
          FOCUS
        </h2>
        <p className="text-xl md:text-2xl font-bold opacity-100">
        
            
               <span className="text-[var(--color-neon-green)]">Zero shortcuts. 100% intensity.</span> <br/>
            <span className="font-bold opacity-100 text-white">Engineered to keep you locked in.</span>
        </p>
      </section>

      <section className="absolute top-[450vh] left-[10%] text-left max-w-lg z-20 mix-blend-difference text-white">
        <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 leading-none">
          BEYOND <br />
          HUMAN
        </h2>
        <p className="text-xl md:text-2xl font-bold opacity-100">
            <span className="text-[var(--color-neon-green)]">Sustain your peak state.</span> <br/>
            <span className="font-bold opacity-100 text-white">Precision in every drop.</span>
        </p>
      </section>



    </div>
  );
}
