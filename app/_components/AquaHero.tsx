"use client";

import React, { useRef, useEffect, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Info } from "lucide-react";
import { RainbowButton } from "@/components/magicui/rainbow-button";

export default function AquaHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth out the scroll progress using spring physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Corner Text Mapping (Fades and Translates)
  const headlineOpacity = useTransform(smoothProgress, [0, 0.2, 0.35], [1, 1, 0]);
  const headlineY = useTransform(smoothProgress, [0, 0.35], [0, -50]);

  const subheadlineOpacity = useTransform(smoothProgress, [0.3, 0.45, 0.55], [0, 1, 0]);
  const subheadlineX = useTransform(smoothProgress, [0.3, 0.55], [50, 0]);

  const microcopyOpacity = useTransform(smoothProgress, [0.45, 0.6, 0.7], [0, 1, 0]);
  const microcopyY = useTransform(smoothProgress, [0.45, 0.7], [50, 0]);

  const ctaOpacity = useTransform(smoothProgress, [0.25, 0.4, 1], [0, 1, 1]);
  const ctaScale = useTransform(smoothProgress, [0.25, 0.4], [0.8, 1]);

  // Parallax Wave
  const waveY = useTransform(smoothProgress, [0, 1], [0, -200]);

  // Canvas Logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    // Using the generated catamaran image path
    img.src = "/catamaran.png";

    const render = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);

      // Simple single image render for now since we don't have a sequence
      // In a real sequence, we would use scrollYProgress to pick a frame
      if (img.complete) {
        const scale = Math.max(canvas.width / dpr / img.width, canvas.height / dpr / img.height);
        const x = (canvas.width / dpr - img.width * scale) / 2;
        const y = (canvas.height / dpr - img.height * scale) / 2;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
      }
    };

    img.onload = render;
    window.addEventListener("resize", render);

    // Smooth frame animation via scroll
    const unsubscribe = scrollYProgress.on("change", () => {
      // Logic for frame sequence would go here:
      // const frameIndex = Math.floor(value * (totalFrames - 1));
      // updateCanvas(frameIndex);
      render();
    });

    return () => {
      window.removeEventListener("resize", render);
      unsubscribe();
    };
  }, [scrollYProgress]);

  return (
    <div ref={containerRef} className="relative h-[300vh] bg-background">
      {/* Sticky Canvas Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Live Background Overlay (Particles) */}
        <div className="absolute inset-0 z-0 opacity-30">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ 
                            opacity: [0, 0.4, 0], 
                            scale: [0, 1.5, 0],
                            x: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
                            y: [Math.random() * 100 + "%", Math.random() * 100 + "%"]
                        }}
                        transition={{ 
                            duration: Math.random() * 10 + 10, 
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute w-2 h-2 bg-primary/40 rounded-full blur-xl"
                    />
                ))}
            </div>
        </div>

        <motion.canvas
          ref={canvasRef}
          role="img"
          aria-label="AquaNova luxury catamaran voyage"
          className="w-full h-full object-cover z-10"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Parallax Wave Overlay */}
        <motion.div
          style={{ y: waveY }}
          className="absolute inset-0 pointer-events-none opacity-20"
        >
          <svg width="100%" height="200%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 50 Q 25 40 50 50 T 100 50 V 100 H 0 Z" fill="url(#wave-gradient)" />
            <defs>
              <linearGradient id="wave-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00E5FF" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Overlay Content - Top Left */}
        <motion.div
          style={{ opacity: headlineOpacity, y: headlineY }}
          className="absolute top-20 left-10 md:top-32 md:left-20 max-w-xl z-20"
        >
          <h1 className="text-6xl md:text-8xl font-extrabold text-white leading-tight">
            AquaNova. <br />
            <span className="text-primary">Your voyage, reimagined.</span>
          </h1>
        </motion.div>


        {/* Overlay Content - Bottom Right */}
        <motion.div
          style={{ opacity: ctaOpacity, scale: ctaScale }}
          className="absolute bottom-20 right-10 md:bottom-32 md:right-24 flex flex-col gap-6 items-end z-20"
        >
          <Link href="/create-new-trip" className="group">
            <button className="h-20 px-12 bg-primary text-black rounded-full text-xl font-black uppercase tracking-[0.2em] flex items-center gap-4 shadow-[0_0_50px_rgba(0,229,255,0.4)] group-hover:scale-105 group-hover:shadow-[0_0_70px_rgba(0,229,255,0.6)] transition-all duration-500">
              Create New Voyage
              <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform duration-500" />
            </button>
          </Link>
          <Link href="#modes" className="group">
            <button className="px-8 py-4 border border-white/20 bg-white/5 backdrop-blur-md text-white rounded-full font-black uppercase text-xs tracking-widest flex items-center gap-3 hover:bg-white/10 transition-colors">
              <Info className="w-4 h-4" />
              Technical Specs
            </button>
          </Link>
        </motion.div>
      </div>

      {/* Placeholder for #modes section */}
      <section id="modes" className="h-screen bg-background p-20">
        <div className="max-w-6xl mx-auto py-40">
          <h2 className="text-4xl font-bold mb-10">Advanced Cruising Modes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {['Silent Glide', 'Power Boost', 'AI Eco'].map((mode, i) => (
              <div key={i} className="p-10 rounded-3xl bg-card border border-primary/10 hover:border-primary/40 transition-all">
                <h3 className="text-2xl font-bold text-primary mb-4">{mode}</h3>
                <p className="text-muted-foreground">Optimized for maximum efficiency and minimum environmental impact using real-time AI orchestration.</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
