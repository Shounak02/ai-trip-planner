"use client";

import React from "react";
import Link from "next/link";
import { Linkedin, Github, Twitter, Mail, Navigation2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative z-20 bg-background/80 backdrop-blur-3xl border-t border-primary/10 pt-20 pb-10 overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
        
        {/* Brand Section */}
        <div className="space-y-6">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-500">
              <span className="text-primary-foreground font-black text-2xl tracking-tighter">A</span>
            </div>
            <div className="flex flex-col">
              <h2 className="font-black text-2xl tracking-tighter text-white uppercase leading-none">AquaNova</h2>
              <span className="text-[8px] font-black uppercase tracking-[0.3em] text-primary opacity-80">Voyage Explorer</span>
            </div>
          </Link>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-sm font-medium">
            Next-generation travel orchestration. AI-powered luxury itineraries tailored to your specific travel DNA and environmental footprint.
          </p>
          <div className="pt-4">
             <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Architected By</p>
             <p className="text-sm font-black uppercase tracking-widest text-white mt-1">Shounak Mandal</p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="text-center md:text-left space-y-8">
          <h2 className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Operations</h2>
          <ul className="space-y-4">
            {['Dashboard', 'My Manifest', 'Expedition Support', 'Technical Specs'].map((item, idx) => (
              <li key={idx}>
                <Link 
                  href={item === 'Dashboard' ? '/' : item === 'My Manifest' ? '/my-trips' : '/contact-us'} 
                  className="text-xs font-black uppercase tracking-widest text-white/60 hover:text-primary transition-colors duration-300 relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Connect Section */}
        <div className="flex flex-col items-center md:items-end space-y-8">
          <h2 className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Signal Channels</h2>
          <div className="flex gap-4">
            {[
              { icon: <Linkedin className="w-5 h-5" />, href: "https://www.linkedin.com/in/shounakmandal/" },
              { icon: <Github className="w-5 h-5" />, href: "https://github.com/Shounak02" },
              { icon: <Twitter className="w-5 h-5" />, href: "https://x.com/shounak02" },
              { icon: <Mail className="w-5 h-5" />, href: "mailto:support@aquanova.ai" }
            ].map((social, idx) => (
              <motion.a
                key={idx}
                whileHover={{ y: -5, scale: 1.1 }}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-white/60 hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 shadow-xl"
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
          <div className="pt-4 text-right">
             <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20 italic">
               © 2026 AquaNova Systems. <br /> All Expeditions Secured.
             </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
