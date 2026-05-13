"use client";

import React from "react";
import { TripFormData, GROUP_TYPES } from "@/lib/types";
import { Users } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  formData: TripFormData;
  onChange: (data: Partial<TripFormData>) => void;
}

export default function GroupTypeStep({ formData, onChange }: Props) {
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
          <Users className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">
          Who&apos;s joining the adventure?
        </h2>
        <p className="text-muted-foreground mt-2">
          Select your travel group type
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
        {GROUP_TYPES.map((group, idx) => {
          const isSelected = formData.groupType === group.id;
          return (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              onClick={() => onChange({ groupType: group.id })}
              className={`relative cursor-pointer rounded-2xl border-2 p-5 text-center transition-all duration-300 hover:shadow-lg ${
                isSelected
                  ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                  : "border-border bg-card hover:border-primary/40"
              }`}
            >
              {isSelected && (
                <motion.div
                  layoutId="groupCheck"
                  className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center"
                >
                  <span className="text-primary-foreground text-xs">✓</span>
                </motion.div>
              )}
              <span className="text-4xl block mb-3">{group.icon}</span>
              <h3 className="font-semibold text-foreground">{group.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{group.desc}</p>
              <p className="text-xs text-primary font-medium mt-2">
                {group.people}
              </p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
