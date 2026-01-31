'use client';
import { useRef } from 'react';

const stories = [
  {
    title: "*WASSUP*",
    text: "Let's get this party started.",
    position: "top-[50vh] -translate-y-1/2 left-1/2 -translate-x-1/2 text-center",
    align: "text-center",
    textColor: "text-[var(--color-neon-green)]"
  },
  {
    title: "UNLEASH THE *BEAST*",
    text: "Experience the surge of pure energy. No crash, just raw power.",
    position: "top-[20%] left-[10%]",
    align: "text-left"
  },
  {
    title: "ZERO SUGAR.\n*MAXIMUM IMPACT.*",
    text: "Precision engineered for peak performance. The only choice for champions.",
    position: "top-[40%] right-[10%]",
    align: "text-right"
  },
  {
    title: "THE FUTURE OF\n*ENERGY*",
    text: "Join the movement. Fuel your destiny.",
    position: "top-[70%] left-1/2 -translate-x-1/2 text-center",
    align: "text-center"
  }
];

export default function StoryOverlay() {
  const renderTitle = (title: string, customGradient?: string, textColor?: string) => {
    const parts = title.split('*');
    const gradientClass = customGradient || "from-white to-[var(--color-neon-green)]";
    
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        if (textColor) {
          return (
            <span key={index} className={textColor}>
              {part}
            </span>
          );
        }
        return (
          <span key={index} className={`text-transparent bg-clip-text bg-gradient-to-r ${gradientClass}`}>
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div className="relative w-full h-full">
      {stories.map((story: any, i) => (
        <div 
          key={i}
          className={`absolute ${story.position} max-w-xl p-8 z-20 mix-blend-difference text-white`}
        >
          <h2 className={`text-5xl md:text-7xl font-black tracking-tighter mb-4 leading-none uppercase whitespace-pre-line ${story.align}`}>
            {renderTitle(story.title, story.gradient, story.textColor)}
          </h2>
          <p className={`text-xl md:text-2xl font-light opacity-90 ${story.align}`}>
            {story.text}
          </p>
        </div>
      ))}
    </div>
  );
}
