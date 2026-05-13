"use client";

import React from "react";
import { TripFormData } from "@/lib/types";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  formData: TripFormData;
  onChange: (data: Partial<TripFormData>) => void;
}

export default function ExtraPrefsStep({ formData, onChange }: Props) {
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
          <Sparkles className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">
          Any other preferences?
        </h2>
        <p className="text-muted-foreground mt-2">
          Add any special requirements, allergies, or specific places you want to visit
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <textarea
            value={formData.additionalNotes}
            onChange={(e) => onChange({ additionalNotes: e.target.value })}
            placeholder="e.g. 'We want to visit the Eiffel Tower at night', 'Prefer vegetarian restaurants', 'Need wheelchair accessibility'..."
            className="w-full h-48 p-5 rounded-2xl border-2 border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all resize-none text-lg"
          />
          <div className="absolute bottom-4 right-4 text-xs text-muted-foreground">
            {formData.additionalNotes.length} characters
          </div>
        </div>
      </div>
    </motion.div>
  );
}
