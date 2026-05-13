"use client";

import React from "react";
import { TripFormData, HOTEL_STAR_RATINGS, HOTEL_AMENITIES, HOTEL_TYPES } from "@/lib/types";
import { Hotel } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  formData: TripFormData;
  onChange: (data: Partial<TripFormData>) => void;
}

export default function HotelStep({ formData, onChange }: Props) {
  const toggleAmenity = (id: string) => {
    const current = formData.hotelAmenities;
    const updated = current.includes(id)
      ? current.filter((a) => a !== id)
      : [...current, id];
    onChange({ hotelAmenities: updated });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
      className="space-y-10"
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
          <Hotel className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">
          Where would you like to stay?
        </h2>
        <p className="text-muted-foreground mt-2">
          Customize your accommodation preferences
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-8">
        {/* Hotel Type */}
        <div className="space-y-4">
          <label className="text-sm font-semibold text-foreground uppercase tracking-wider">
            Accommodation Type
          </label>
          <div className="flex flex-wrap gap-2">
            {HOTEL_TYPES.map((type) => (
              <button
                key={type.id}
                onClick={() => onChange({ hotelType: type.id })}
                className={`px-4 py-2 rounded-xl border-2 transition-all ${
                  formData.hotelType === type.id
                    ? "border-primary bg-primary/10 text-primary font-semibold"
                    : "border-border hover:border-primary/40 bg-card text-muted-foreground"
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Star Rating */}
        <div className="space-y-4">
          <label className="text-sm font-semibold text-foreground uppercase tracking-wider">
            Star Rating
          </label>
          <div className="flex flex-wrap gap-2">
            {HOTEL_STAR_RATINGS.map((star) => (
              <button
                key={star.id}
                onClick={() => onChange({ hotelStarRating: star.id })}
                className={`px-4 py-2 rounded-xl border-2 transition-all ${
                  formData.hotelStarRating === star.id
                    ? "border-primary bg-primary/10 text-primary font-semibold"
                    : "border-border hover:border-primary/40 bg-card text-muted-foreground"
                }`}
              >
                {star.label}
              </button>
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div className="space-y-4">
          <label className="text-sm font-semibold text-foreground uppercase tracking-wider">
            Must-have Amenities
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {HOTEL_AMENITIES.map((amenity) => {
              const isSelected = formData.hotelAmenities.includes(amenity.id);
              return (
                <button
                  key={amenity.id}
                  onClick={() => toggleAmenity(amenity.id)}
                  className={`flex items-center gap-2 p-3 rounded-xl border-2 transition-all ${
                    isSelected
                      ? "border-primary bg-primary/10 text-primary font-semibold"
                      : "border-border hover:border-primary/40 bg-card text-muted-foreground"
                  }`}
                >
                  <span>{amenity.icon}</span>
                  <span className="text-xs">{amenity.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
