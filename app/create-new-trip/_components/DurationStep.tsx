"use client";

import React from "react";
import { TripFormData } from "@/lib/types";
import { Calendar } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  formData: TripFormData;
  onChange: (data: Partial<TripFormData>) => void;
}

export default function DurationStep({ formData, onChange }: Props) {
  const setDuration = (val: number) => {
    onChange({ duration: Math.max(1, Math.min(30, val)) });
  };

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
          <Calendar className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">
          How long is your trip?
        </h2>
        <p className="text-muted-foreground mt-2">
          Select the number of days for your adventure
        </p>
      </div>

      <div className="flex flex-col items-center gap-8 max-w-sm mx-auto">
        {/* Big number display */}
        <motion.div
          key={formData.duration}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <span className="text-7xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {formData.duration}
          </span>
          <p className="text-lg text-muted-foreground mt-1">
            {formData.duration === 1 ? "Day" : "Days"}
          </p>
        </motion.div>

        {/* Controls */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => setDuration(formData.duration - 1)}
            className="w-12 h-12 rounded-full border-2 border-border bg-card hover:bg-primary/10 hover:border-primary text-foreground text-xl font-bold transition-all flex items-center justify-center"
          >
            −
          </button>

          <input
            type="range"
            min={1}
            max={30}
            value={formData.duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-48 accent-primary cursor-pointer"
          />

          <button
            onClick={() => setDuration(formData.duration + 1)}
            className="w-12 h-12 rounded-full border-2 border-border bg-card hover:bg-primary/10 hover:border-primary text-foreground text-xl font-bold transition-all flex items-center justify-center"
          >
            +
          </button>
        </div>

        {/* Quick presets */}
        <div className="flex gap-3 flex-wrap justify-center">
          {[3, 5, 7, 10, 14].map((d) => (
            <button
              key={d}
              onClick={() => setDuration(d)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                formData.duration === d
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "bg-card border border-border text-foreground hover:border-primary/50"
              }`}
            >
              {d} Days
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
