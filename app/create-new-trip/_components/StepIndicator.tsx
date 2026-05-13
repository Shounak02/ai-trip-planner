"use client";

import React from "react";
import { WIZARD_STEPS } from "@/lib/types";
import { motion } from "framer-motion";

interface StepIndicatorProps {
  currentStep: number;
}

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="w-full mb-8">
      {/* Mobile: compact display */}
      <div className="flex md:hidden items-center justify-center gap-2 mb-2">
        <span className="text-2xl">{WIZARD_STEPS[currentStep].icon}</span>
        <span className="font-semibold text-foreground">
          Step {currentStep + 1} of {WIZARD_STEPS.length}:{" "}
          {WIZARD_STEPS[currentStep].title}
        </span>
      </div>

      {/* Desktop: full step bar */}
      <div className="hidden md:flex items-center justify-between relative">
        {/* Background line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-border" />
        {/* Progress line */}
        <motion.div
          className="absolute top-5 left-0 h-0.5 bg-primary"
          initial={{ width: "0%" }}
          animate={{
            width: `${(currentStep / (WIZARD_STEPS.length - 1)) * 100}%`,
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />

        {WIZARD_STEPS.map((step) => (
          <div
            key={step.id}
            className="flex flex-col items-center relative z-10"
          >
            <motion.div
              className={`w-12 h-12 rounded-full flex items-center justify-center text-xl border-2 transition-all duration-500 ${
                step.id < currentStep
                  ? "bg-primary border-primary shadow-[0_0_20px_rgba(0,229,255,0.3)]"
                  : step.id === currentStep
                    ? "bg-primary/10 border-primary ring-4 ring-primary/20 shadow-[0_0_30px_rgba(0,229,255,0.2)]"
                    : "bg-card border-border opacity-50"
              }`}
              animate={step.id === currentStep ? { scale: [1, 1.15, 1] } : {}}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {step.id < currentStep ? (
                <span className="text-black font-black">✓</span>
              ) : (
                <span className={step.id === currentStep ? "opacity-100" : "opacity-40"}>{step.icon}</span>
              )}
            </motion.div>
            <span
              className={`text-[10px] mt-3 font-black uppercase tracking-[0.2em] transition-all duration-500 ${
                step.id <= currentStep
                  ? "text-primary opacity-100"
                  : "text-muted-foreground opacity-30"
              }`}
            >
              {step.title}
            </span>
          </div>
        ))}
      </div>

      {/* Mobile progress bar */}
      <div className="md:hidden w-full bg-border rounded-full h-1.5 mt-2">
        <motion.div
          className="bg-primary h-1.5 rounded-full"
          initial={{ width: "0%" }}
          animate={{
            width: `${((currentStep + 1) / WIZARD_STEPS.length) * 100}%`,
          }}
          transition={{ duration: 0.4 }}
        />
      </div>
    </div>
  );
}
