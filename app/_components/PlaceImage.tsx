"use client";

import React from "react";
import { Image as ImageIcon } from "lucide-react";

interface Props {
  query: string;
  className?: string;
  fallbackSig?: string;
}

export default function PlaceImage({ query, className, fallbackSig }: Props) {
  // We'll use a high-quality randomized image provider (LoremFlickr) 
  // with the query as a keyword to ensure "different different" relevant images.
  
  // Clean the query to get just the place name if possible
  const keyword = query.split(',')[0].split(' ').slice(0, 2).join(',');
  const imageUrl = `https://loremflickr.com/800/600/${encodeURIComponent(keyword || 'travel')}/all`;

  return (
    <div className={`relative group overflow-hidden ${className}`}>
      <img
        src={imageUrl}
        alt={query}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
        onError={(e) => {
           // Final fallback if loremflickr fails
           e.currentTarget.src = `https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800&auto=format&fit=crop&sig=${fallbackSig}`;
        }}
      />
      <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-500" />
    </div>
  );
}
