'use client';

import Lenis from 'lenis';

import { Lexend } from 'next/font/google';
import { useEffect, useState } from 'react';
import Head from 'next/head';

const montserrat = Lexend({ subsets: ['latin'] });

import '@/shared/styles/globals.scss';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [dimension, setDimension] = useState<any>(null);

  useEffect(() => {
    const lenis = new Lenis();

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', resize);
    requestAnimationFrame(raf);
    resize();

    requestAnimationFrame(raf);
  }, []);
  return (
    <html lang="ru">
      <Head>
        <title>Impact Creators | where brands are made</title>
        <meta
          name="description"
          content=" ImpactCreators is a modern  group of highly talented people driving growth through social media and performance marketing, with a sharp edge in celebrity management. Blending strategy, creativity, and influence, we turn brands into movements."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body className={montserrat.className}>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
