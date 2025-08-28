'use client';
import { FC, useEffect, useState } from 'react';

import SidebarMenu from '@/components/SidebarMenu';
import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface Props {}

const Index: FC<Props> = () => {
  const [isActive, setIsActive] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const closeSidebar = () => setIsActive(false);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsActive(false);
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 0);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Set initial state in case page loads scrolled
    setIsScrolled(typeof window !== 'undefined' ? window.scrollY > 0 : false);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll as EventListener);
    };
  }, []);
  return (
    <div >
      <div className="fixed right-0 z-[4001] p-[2vw]">
        <button
          type="button"
          onClick={() => setIsActive(!isActive)}
          className="flex h-[4.5vw] w-[4.5vw] cursor-pointer items-center justify-center  rounded-full bg-sky-600">
          <div className={`burger ${isActive && 'burgerActive'}`}></div>
        </button>
      </div>
      <button title="your_agency_name" className="p-[2vw] fixed z-[100] top-0 left-0 group">
        <div className="relative w-[15vw] h-auto">
          {/* Default logo (top of page) */}
          <Image
            src="/logos/7-01.svg"
            alt="logo default"
            width={200}
            height={200}
            className={`w-[15vw] transition-opacity duration-500 ease-in-out ${isScrolled ? 'opacity-0' : 'opacity-100'}`}
            priority
          />
          {/* Scrolled logo */}
          <Image
            src="/logos/blue-logo-white.png"
            alt="logo scrolled"
            width={200}
            height={200}
            className={`w-[15vw] absolute top-0 left-0 transition-opacity duration-500 ease-in-out ${isScrolled ? 'opacity-100' : 'opacity-0'}`}
          />
        </div>
      </button>
      <AnimatePresence mode="wait">{isActive && (
        <SidebarMenu close={closeSidebar} />
      )}
      </AnimatePresence>
    </div>
  );
};
export default Index;
