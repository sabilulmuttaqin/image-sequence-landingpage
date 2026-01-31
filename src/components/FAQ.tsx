'use client';
import { useState, useRef } from 'react';
import { Plus, Minus } from 'lucide-react';
import gsap from 'gsap';

const faqs = [
  {
    question: "What makes Monsta different from other energy drinks?",
    answer: "Monsta is engineered with a unique nootropic blend that targets sustained focus rather than a quick caffeine spike. Our formula includes clinically dosed Alpha-GPC and L-Theanine for clarity without the jitters."
  },
  {
    question: "Is there a sugar-free option?",
    answer: "Every can of Monsta is 100% sugar-free. We use natural monk fruit and stevia to better fuel your body without the insulin crash associated with traditional energy drinks."
  },
  {
    question: "How much caffeine is in one can?",
    answer: "Each can delivers a precision 200mg dose of natural caffeine derived from green tea extract, equivalent to about two cups of premium coffee."
  },
  {
    question: "Is it safe for daily consumption?",
    answer: "Yes, when consumed responsibly. We recommend a limit of 2 cans per day. As with any supplement, check with your healthcare provider if you have specific conditions."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-black text-white px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-black mb-16 tracking-tighter uppercase">
          FAQ<span className="text-[var(--color-neon-green)]">.</span>
        </h2>
        
        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="group border border-white/10 rounded-xl overflow-hidden hover:border-[var(--color-neon-green)] transition-colors duration-300 bg-[#0a0a0a]"
            >
              <button 
                onClick={() => toggleFAQ(index)}
                className="w-full p-6 md:p-8 flex justify-between items-center text-left"
              >
                <span className="text-xl md:text-2xl font-bold group-hover:text-[var(--color-neon-green)] transition-colors">
                  {faq.question}
                </span>
                <span className="text-[var(--color-neon-green)]">
                  {openIndex === index ? <Minus size={24} /> : <Plus size={24} />}
                </span>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}`}
              >
                 <div className="p-6 md:p-8 pt-0 text-gray-400 leading-relaxed font-mono">
                   {faq.answer}
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
