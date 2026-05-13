"use client";

import React from "react";
import { TripFormData, GROUP_TYPES, BUDGET_OPTIONS, TRAVEL_STYLES } from "@/lib/types";
import { Rocket, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  formData: TripFormData;
}

export default function ReviewStep({ formData }: Props) {
  const group = GROUP_TYPES.find((g) => g.id === formData.groupType);
  const budget = BUDGET_OPTIONS.find((b) => b.id === formData.budget);

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
          <Rocket className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">
          Ready to launch?
        </h2>
        <p className="text-muted-foreground mt-2">
          Review your trip details before we generate your itinerary
        </p>
      </div>

      <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl border bg-card/50 space-y-1">
          <p className="text-xs font-bold text-muted-foreground uppercase">Journey</p>
          <p className="text-lg font-semibold">{formData.origin} → {formData.destination}</p>
          <p className="text-sm text-primary">{formData.duration} Days</p>
        </div>

        <div className="p-5 rounded-2xl border bg-card/50 space-y-1">
          <p className="text-xs font-bold text-muted-foreground uppercase">Group & Budget</p>
          <p className="text-lg font-semibold">{group?.title || "Not selected"}</p>
          <p className="text-sm text-primary">{budget?.title || "Not selected"} Budget</p>
        </div>

        <div className="p-5 rounded-2xl border bg-card/50 space-y-1 md:col-span-2">
          <p className="text-xs font-bold text-muted-foreground uppercase">Travel Styles</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.travelStyles.length > 0 ? (
              formData.travelStyles.map((s) => (
                <span key={s} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20">
                  {TRAVEL_STYLES.find((ts) => ts.id === s)?.label || s}
                </span>
              ))
            ) : (
              <span className="text-sm text-muted-foreground">No specific styles selected</span>
            )}
          </div>
        </div>

        {formData.additionalNotes && (
          <div className="p-5 rounded-2xl border bg-card/50 space-y-1 md:col-span-2">
            <p className="text-xs font-bold text-muted-foreground uppercase">Notes</p>
            <p className="text-sm italic text-foreground line-clamp-3">{formData.additionalNotes}</p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-center gap-2 text-primary font-medium animate-pulse">
        <CheckCircle2 className="w-5 h-5" />
        <span>Everything looks good!</span>
      </div>
    </motion.div>
  );
}
