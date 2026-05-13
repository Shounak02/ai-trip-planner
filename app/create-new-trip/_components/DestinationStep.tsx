"use client";

import React from "react";
import { TripFormData } from "@/lib/types";
import { MapPin, Navigation } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  formData: TripFormData;
  onChange: (data: Partial<TripFormData>) => void;
}

export default function DestinationStep({ formData, onChange }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
          <MapPin className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">
          Where are you headed?
        </h2>
        <p className="text-muted-foreground mt-2">
          Tell us your starting point and dream destination
        </p>
      </div>

      <div className="space-y-6 max-w-md mx-auto">
        {/* Origin */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Navigation className="w-4 h-4 text-primary" />
            Starting From
          </label>
          <input
            type="text"
            value={formData.origin}
            onChange={(e) => onChange({ origin: e.target.value })}
            placeholder="e.g. New York, USA"
            className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
          />
        </div>

        {/* Animated divider */}
        <div className="flex items-center justify-center">
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center"
          >
            <span className="text-lg">✈️</span>
          </motion.div>
        </div>

        {/* Destination */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            Destination
          </label>
          <input
            type="text"
            value={formData.destination}
            onChange={(e) => onChange({ destination: e.target.value })}
            placeholder="e.g. Paris, France"
            className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
          />
        </div>
      </div>
    </motion.div>
  );
}
