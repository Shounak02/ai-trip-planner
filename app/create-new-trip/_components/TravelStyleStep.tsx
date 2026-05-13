"use client";

import React from "react";
import { TripFormData, TRAVEL_STYLES } from "@/lib/types";
import { Palette } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  formData: TripFormData;
  onChange: (data: Partial<TripFormData>) => void;
}

export default function TravelStyleStep({ formData, onChange }: Props) {
  const toggleStyle = (styleId: string) => {
    const current = formData.travelStyles;
    const updated = current.includes(styleId)
      ? current.filter((s) => s !== styleId)
      : [...current, styleId];
    onChange({ travelStyles: updated });
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
          <Palette className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">
          What&apos;s your travel style?
        </h2>
        <p className="text-muted-foreground mt-2">
          Pick as many as you like — we&apos;ll tailor your trip accordingly
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 max-w-3xl mx-auto">
        {TRAVEL_STYLES.map((style, idx) => {
          const isSelected = formData.travelStyles.includes(style.id);
          return (
            <motion.button
              key={style.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.04 }}
              onClick={() => toggleStyle(style.id)}
              className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all duration-200 ${
                isSelected
                  ? "border-primary bg-primary/10 shadow-md shadow-primary/10"
                  : "border-border bg-card hover:border-primary/30 hover:bg-primary/5"
              }`}
            >
              <span className="text-3xl">{style.icon}</span>
              <span
                className={`text-sm font-medium ${
                  isSelected ? "text-primary" : "text-foreground"
                }`}
              >
                {style.label}
              </span>
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-2 h-2 rounded-full bg-primary"
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {formData.travelStyles.length > 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-sm text-primary font-medium"
        >
          {formData.travelStyles.length} style
          {formData.travelStyles.length > 1 ? "s" : ""} selected
        </motion.p>
      )}
    </motion.div>
  );
}
