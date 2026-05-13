"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import InteractiveHoverButton from "@/components/eldoraui/interactivebutton";
import { SignInButton, useUser, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { Plus, Compass, User as UserIcon, Home, Headphones, ListFilter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const navItems = [
    { name: "Home", link: "/", icon: <Home className="w-4 h-4" /> },
    { name: "My Trips", link: "/my-trips", icon: <Compass className="w-4 h-4" /> },
    { name: "Support", link: "/contact-us", icon: <Headphones className="w-4 h-4" /> },
  ];

  const { user } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 z-[100] w-full transition-all duration-700 ${
      scrolled 
        ? "bg-background/80 backdrop-blur-3xl border-b border-primary/20 py-2 shadow-2xl shadow-primary/10" 
        : "bg-gradient-to-b from-background/60 to-transparent py-8"
    }`}>
      <Navbar>
        <NavBody className={`justify-between items-center transition-all duration-500 ${scrolled ? 'px-4 lg:px-6' : 'px-8 lg:px-16'}`}>
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <motion.div 
                layout
                className={`bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 transition-all duration-500 ${scrolled ? 'w-8 h-8' : 'w-11 h-11'}`}
            >
                <span className={`text-primary-foreground font-black tracking-tighter transition-all duration-500 ${scrolled ? 'text-lg' : 'text-2xl'}`}>A</span>
            </motion.div>
            <AnimatePresence mode="wait">
                {!scrolled && (
                    <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="flex flex-col hidden sm:flex"
                    >
                        <h2 className="font-black text-2xl tracking-tight text-white uppercase leading-none">TripBuddy AI</h2>
                        <span className="text-[8px] font-black uppercase tracking-[0.3em] text-primary opacity-80">Voyage Explorer</span>
                    </motion.div>
                )}
            </AnimatePresence>
          </Link>

          {/* Navigation Links */}
          <div className={`hidden md:flex items-center transition-all duration-500 ${scrolled ? 'gap-8' : 'gap-14'}`}>
              {navItems.map((item, idx) => (
                  <Link 
                    key={idx} 
                    href={item.link}
                    className="group relative flex items-center gap-2"
                  >
                    <span className={`font-black uppercase tracking-[0.2em] transition-all duration-500 ${
                        scrolled ? 'text-[10px] text-white/50 group-hover:text-white' : 'text-[13px] text-white group-hover:text-primary'
                    }`}>
                        {item.name}
                    </span>
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                  </Link>
              ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 z-[60] pointer-events-auto shrink-0">
            {user ? (
              <div className={`flex items-center transition-all duration-500 bg-white/5 backdrop-blur-xl border border-white/5 shadow-2xl ${scrolled ? 'p-1 rounded-2xl gap-2' : 'p-1.5 rounded-full gap-5'}`}>
                <div className="pl-2">
                   <Link href="/my-trips" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/80 hover:text-white transition-colors group">
                      <Compass className={`text-primary transition-transform duration-500 group-hover:rotate-45 ${scrolled ? 'w-4 h-4' : 'w-4 h-4'}`} />
                      {!scrolled && <span className="hidden lg:block">Manifest</span>}
                   </Link>
                </div>
                <div className={`w-px h-6 bg-white/10 ${scrolled ? 'hidden' : 'hidden lg:block'}`} />
                <Link href={'/create-new-trip'}>              
                  <RainbowButton className={`transition-all duration-500 font-black uppercase tracking-widest flex items-center gap-2 ${
                      scrolled ? 'h-8 px-4 rounded-xl text-[9px]' : 'h-11 px-8 rounded-full text-[11px]'
                  } ${scrolled ? 'text-black' : 'text-white'}`}>
                    <Plus className={scrolled ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
                    <span className={scrolled ? 'hidden lg:block' : 'block'}>New Voyage</span>
                  </RainbowButton>
                </Link>
                <div className={`p-0.5 rounded-full border border-primary/20 transition-all duration-500 ${scrolled ? 'scale-90' : 'scale-100'}`}>
                    <UserButton appearance={{ elements: { userButtonAvatarBox: "w-8 h-8" } }} />
                </div>
              </div>
            ) : (
              <SignInButton mode="modal">
                <Button className={`transition-all duration-500 rounded-2xl bg-white text-black font-black uppercase tracking-widest hover:bg-primary hover:text-white shadow-xl ${
                    scrolled ? 'h-9 px-5 text-[9px]' : 'h-12 px-10 text-[11px]'
                }`}>
                    Authorize
                </Button>
              </SignInButton>
            )}
          </div>
        </NavBody>

        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>
          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <Link
                key={idx}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-4 py-5 text-xs font-black uppercase tracking-widest text-white/80 border-b border-white/5"
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
            <div className="mt-6 flex flex-col gap-4">
              {user ? (
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
                    <span className="text-xs font-black uppercase text-white/60">Profile</span>
                    <UserButton />
                </div>
              ) : (
                <SignInButton mode="modal" >
                   <Button className="w-full h-14 rounded-2xl bg-primary text-white font-black uppercase text-xs tracking-widest">
                       Sign In
                   </Button>
                </SignInButton>
              )}
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </header>
  );
}
