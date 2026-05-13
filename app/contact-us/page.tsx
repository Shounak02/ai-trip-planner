"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MessageSquare, Shield, LifeBuoy, Send, CheckCircle2, Navigation2, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function SupportPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const supportOptions = [
    {
      icon: <Mail className="w-6 h-6 text-primary" />,
      title: "Direct Channels",
      desc: "Our dispatchers are standing by 24/7.",
      contact: "support@tripbuddy.ai"
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-primary" />,
      title: "Community Deck",
      desc: "Connect with other voyagers instantly.",
      contact: "Join Discord"
    },
    {
      icon: <Shield className="w-6 h-6 text-primary" />,
      title: "Safety Ops",
      desc: "Priority assistance for active travels.",
      contact: "Open Priority Ticket"
    }
  ];

  const faqs = [
    { q: "How accurate is the voyage generation?", a: "Our AI utilizes the latest satellite and tourist data to ensure 98% accuracy in recommendations." },
    { q: "Can I use myManifest offline?", a: "Yes, our Export PDF feature is designed specifically for offline navigation during remote expeditions." },
    { q: "Is my travel data secure?", a: "We use military-grade encryption for all saved itineraries and user profiles." }
  ];

  return (
    <div className="min-h-screen bg-background pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto space-y-24">
        
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-[0.3em] border border-primary/20"
          >
            <LifeBuoy className="w-4 h-4" />
            Expedition Support
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-black tracking-tighter text-white uppercase leading-none"
          >
            How Can We <br /><span className="text-primary italic">Assist?</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto font-medium"
          >
            Whether you're lost at sea or just need a new hotel recommendation, our team is here to ensure your voyage remains legendary.
          </motion.p>
        </section>

        {/* Support Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {supportOptions.map((option, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + idx * 0.1 }}
              className="bg-[#0A1628]/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-10 space-y-6 hover:border-primary/40 transition-all duration-500 group"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                {option.icon}
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black text-white uppercase tracking-tight">{option.title}</h3>
                <p className="text-sm text-muted-foreground font-medium leading-relaxed">{option.desc}</p>
              </div>
              <p className="text-primary text-xs font-black uppercase tracking-widest pt-4 border-t border-white/5">{option.contact}</p>
            </motion.div>
          ))}
        </section>

        {/* Contact Form & FAQ */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* Form */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <div className="space-y-2">
                <p className="text-primary text-xs font-black uppercase tracking-[0.3em]">Signal Us</p>
                <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Mission Control</h2>
            </div>

            {submitted ? (
              <div className="bg-primary/10 border border-primary/20 rounded-[2.5rem] p-12 text-center space-y-6">
                <CheckCircle2 className="w-16 h-16 text-primary mx-auto animate-bounce" />
                <div className="space-y-2">
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight">Signal Received</h3>
                    <p className="text-muted-foreground font-medium">Our dispatchers will respond to your coordinates shortly.</p>
                </div>
                <Button variant="outline" onClick={() => setSubmitted(false)} className="rounded-2xl px-8 h-12 border-primary/20 text-primary font-black uppercase tracking-widest">
                    Send Another
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Voyager Name</label>
                        <Input placeholder="Enter your name" className="h-14 bg-white/5 border-white/5 rounded-2xl px-6 text-white font-medium focus:ring-primary/20" required />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Signal Frequency (Email)</label>
                        <Input type="email" placeholder="email@example.com" className="h-14 bg-white/5 border-white/5 rounded-2xl px-6 text-white font-medium focus:ring-primary/20" required />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Mission Log (Message)</label>
                    <Textarea placeholder="What's happening on your voyage?" className="min-h-[200px] bg-white/5 border-white/5 rounded-[2rem] p-6 text-white font-medium focus:ring-primary/20 resize-none" required />
                </div>
                <Button type="submit" className="w-full h-16 rounded-[1.5rem] bg-primary text-primary-foreground font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/20 hover:scale-[1.02] transition-transform">
                    Deploy Signal
                    <Send className="w-5 h-5 ml-2" />
                </Button>
              </form>
            )}
          </motion.div>

          {/* FAQ */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <div className="space-y-2">
                <p className="text-primary text-xs font-black uppercase tracking-[0.3em]">Knowledge Base</p>
                <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Manifest FAQ</h2>
            </div>
            <div className="space-y-6">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-white/5 border border-white/5 rounded-[2rem] p-8 space-y-4 hover:border-white/10 transition-colors">
                  <h4 className="text-lg font-black text-white uppercase tracking-tight">{faq.q}</h4>
                  <p className="text-muted-foreground text-sm font-medium leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
            <div className="p-8 bg-primary/5 border border-primary/10 rounded-[2rem] flex items-center gap-6">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center shrink-0">
                    <Headphones className="w-6 h-6 text-primary" />
                </div>
                <div>
                    <h5 className="text-white font-black uppercase tracking-tight">Need Urgent Help?</h5>
                    <p className="text-xs text-muted-foreground font-medium">Active premium voyagers get priority response times under 15 minutes.</p>
                </div>
            </div>
          </motion.div>

        </section>

      </div>
    </div>
  );
}
