"use client";

import React from "react";
import { TripFormData, BUDGET_OPTIONS } from "@/lib/types";
import { Wallet } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  formData: TripFormData;
  onChange: (data: Partial<TripFormData>) => void;
}

export default function BudgetStep({ formData, onChange }: Props) {
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
          <Wallet className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">
          What&apos;s your budget?
        </h2>
        <p className="text-muted-foreground mt-2">
          Choose a spending level that suits your style
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-2xl mx-auto">
        {BUDGET_OPTIONS.map((option, idx) => {
          const isSelected = formData.budget === option.id;
          return (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => onChange({ budget: option.id })}
              className={`relative cursor-pointer rounded-2xl border-2 p-6 text-center transition-all duration-300 hover:shadow-lg bg-gradient-to-br ${option.color} ${
                isSelected
                  ? "border-primary ring-2 ring-primary/20 shadow-xl scale-[1.03]"
                  : "hover:border-primary/40"
              }`}
            >
              {isSelected && (
                <motion.div
                  layoutId="budgetCheck"
                  className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center"
                >
                  <span className="text-primary-foreground text-xs">✓</span>
                </motion.div>
              )}
              <span className="text-5xl block mb-4">{option.icon}</span>
              <h3 className="text-lg font-bold text-foreground">
                {option.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-2">
                {option.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
