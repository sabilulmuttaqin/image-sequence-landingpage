'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import SequenceScroll from '@/components/SequenceScroll';
import StoryOverlay from '@/components/StoryOverlay';
import Loader from '@/components/Loader';
import Testimonials from '@/components/Testimonials';
import { ReactLenis } from 'lenis/react';

export default function Home() {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <ReactLenis root>
      <main className="bg-black min-h-screen text-white overflow-x-hidden selection:bg-[var(--color-neon-green)] selection:text-black">
        <Loader progress={loadingProgress} />
        
        <Navbar />
        
        {/* Hero / Sequence Section */}
        <section id="sequence">
             {/* We only show the main content once loaded or just let it fade in behind the loader */}
             <SequenceScroll 
               onProgress={setLoadingProgress} 
               onLoaded={() => setIsLoaded(true)}
             >
               <StoryOverlay />
             </SequenceScroll>
        </section>

        {/* Bento / Features Section */}
        <section id="bento" className="relative z-10 bg-black py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-black mb-16 text-center uppercase">
              Ingredients <span className="text-[var(--color-neon-green)]">Matrix</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[800px]">
              {/* Card 1 - Tall */}
              <div className="md:col-span-1 md:row-span-2 bg-[#111] rounded-2xl p-8 border border-white/10 hover:border-[var(--color-neon-green)] transition-colors duration-500 group">
                <div className="h-full flex flex-col justify-between">
                  <div className="w-16 h-16 rounded-full bg-[var(--color-neon-green)] flex items-center justify-center text-black font-bold text-2xl mb-8 group-hover:scale-110 transition-transform">
                    B12
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold mb-4">Vitamin Complex</h3>
                    <p className="text-gray-400">Optimized for neural connectivity and sustained focus. No jitters, just clarity.</p>
                  </div>
                </div>
              </div>

              {/* Card 2 - Wide */}
              <div className="md:col-span-2 bg-[#111] rounded-2xl p-8 border border-white/10 hover:border-[var(--color-neon-green)] transition-colors duration-500 flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                   <h3 className="text-4xl font-bold mb-4">Zero Sugar</h3>
                   <p className="text-gray-400 text-lg">Sweetened with natural monk fruit essence. All the flavor, none of the guilt.</p>
                </div>
                <div className="w-32 h-32 rounded-full border-4 border-[var(--color-neon-green)] flex items-center justify-center">
                    <span className="text-4xl font-bold">0g</span>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-[#111] rounded-2xl p-8 border border-white/10 hover:border-[var(--color-neon-green)] transition-colors duration-500">
                <h3 className="text-3xl font-bold mb-4 text-[var(--color-neon-green)]">Taurine +</h3>
                <p className="text-gray-400">Enhanced endurance matrix to keep you moving when others stop.</p>
              </div>

              {/* Card 4 */}
              <div className="bg-[#111] rounded-2xl p-8 border border-white/10 hover:border-[var(--color-neon-green)] transition-colors duration-500">
                 <h3 className="text-3xl font-bold mb-4 text-white">Caffeine</h3>
                 <p className="text-gray-400">200mg of natural caffeine derived from green tea extract.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <Testimonials />

        {/* CTA Section */}
        <section className="relative z-10 bg-black py-40 flex flex-col items-center justify-center text-center px-6">
            <h2 className="text-6xl md:text-9xl font-black tracking-tighter mb-8 leading-none">
              <span className="block text-[var(--color-neon-green)]">IGNITE</span> 
              YOUR GAME
            </h2>
            <a href="#buy" className="inline-block px-12 py-5 bg-[var(--color-neon-green)] text-black text-xl font-bold tracking-wider hover:bg-white hover:scale-105 transition-all duration-300 rounded-lg">
                GET STARTED
            </a>
        </section>

        {/* Footer */}
        <footer className="relative z-10 bg-[#050505] pt-24 pb-12 border-t border-white/10">
           <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
                  <div className="md:col-span-2">
                       <h2 className="text-3xl font-black mb-6 uppercase">Monsta<span className="text-[var(--color-neon-green)]">.</span></h2>
                       <p className="text-gray-500 max-w-sm">
                           The ultimate fuel for the digital generation. Engineered for focus, designed for victory.
                       </p>
                  </div>
                  
                  <div>
                      <h4 className="font-bold mb-6 text-[var(--color-neon-green)] uppercase tracking-wider text-sm">Explore</h4>
                      <ul className="flex flex-col gap-4 text-gray-400">
                          <li><a href="#" className="hover:text-white transition-colors">Products</a></li>
                          <li><a href="#" className="hover:text-white transition-colors">Science</a></li>
                          <li><a href="#" className="hover:text-white transition-colors">Sponsorships</a></li>
                          <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                      </ul>
                  </div>

                  <div>
                      <h4 className="font-bold mb-6 text-[var(--color-neon-green)] uppercase tracking-wider text-sm">Connect</h4>
                      <ul className="flex flex-col gap-4 text-gray-400">
                          <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                          <li><a href="#" className="hover:text-white transition-colors">Twitter / X</a></li>
                          <li><a href="#" className="hover:text-white transition-colors">Discord</a></li>
                          <li><a href="#" className="hover:text-white transition-colors">TikTok</a></li>
                      </ul>
                  </div>
              </div>

              <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 font-mono">
                  <p>© 2026 MONSTA ENERGY. ALL RIGHTS RESERVED.</p>
                  <div className="flex gap-6 mt-4 md:mt-0">
                      <a href="#" className="hover:text-white transition-colors">PRIVACY</a>
                      <a href="#" className="hover:text-white transition-colors">TERMS</a>
                  </div>
              </div>
           </div>
        </footer>

      </main>
    </ReactLenis>
  );
}
