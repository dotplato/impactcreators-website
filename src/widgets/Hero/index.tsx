'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const slides = [
  {
    id: 1,
    title: 'Engage, Influence, Repeat.',
    subtitle:
      "Data-driven campaigns that put your brand in the spotlight.",
    image: '/main1.png',
    buttonText: 'Read Article',
    buttonLink: '/article/cloudflare',
  },
  {
    id: 2,
    title: 'Content That Converts.',
    subtitle: 'Creative posts, stories, and reels that actually drive action.',
    image: '/main2.png',
    buttonText: 'Read More',
    buttonLink: '/article/design-trust',
  },
  {
    id: 3,
    title: 'Grow Fast. Grow Smart.',
    subtitle: 'Turn followers into loyal fans with consistent, powerful messaging.',
    image: '/main3.png',
    buttonText: 'Learn More',
    buttonLink: '/article/website-speed',
  },
];

export default function ScrollCarousel() {
  const containerRef = useRef<HTMLElement | null>(null);
  const [isPinned, setIsPinned] = useState(false);

  // Track scroll within this section for horizontal animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', `-${(slides.length - 1) * 100}%`]
  );

  // Explicit pinning to handle mobile/edge cases where sticky misbehaves
  useEffect(() => {
    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const stillInSection = rect.top <= 0 && rect.bottom >= window.innerHeight;
      setIsPinned(stillInSection);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full"
      style={{ height: `${(slides.length) * 100}vh` }}
    >
      <div
        className={`${isPinned ? 'fixed' : 'sticky'} top-0 left-0 right-0 h-screen flex items-center overflow-hidden z-10`}
      >
        <motion.div style={{ x }} className="flex gap-6 px-4 w-full h-[90vh] items-center">
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="relative min-w-full h-full rounded-2xl overflow-hidden shadow-xl flex-shrink-0"
            >
              <Image src={slide.image} alt={slide.title} fill className="object-cover" priority />
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center text-white p-6">
                <h1 className="text-8xl md:text-5xl font-bold mb-4 max-w-2xl">{slide.title}</h1>
                <p className="text-base md:text-lg mb-6 max-w-xl opacity-70">{slide.subtitle}</p>
                <Link href="/contact">
                  <button className="px-8 py-6 rounded-full border border-1 border-white font-semibold shadow hover:bg-white hover:text-blue-900 transition">
                    Get a Quote
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
