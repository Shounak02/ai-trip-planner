"use client";

import AquaHero from "./_components/AquaHero";
import Footer from "./_components/Footer";
import CustomCursor from "./_components/CustomCursor";
import { PopularCityList } from "./_components/PopularCityList";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="relative">
      <section className="relative z-10">
        <AquaHero />
      </section>

      <section className="relative z-20 bg-background pt-20 pb-40">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-black mb-6">Popular Expeditions</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose from our curated collection of luxury voyages, or create your own custom itinerary.
            </p>
          </motion.div>
          
          <PopularCityList />
        </div>
      </section>

      <Footer />
    </main>
  );
}
