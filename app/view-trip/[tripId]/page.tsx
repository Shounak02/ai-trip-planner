"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import TripDisplay from "./_components/TripDisplay";
import { Loader2, Plane } from "lucide-react";
import { motion } from "framer-motion";

export default function ViewTrip() {
  const params = useParams();
  const tripId = params.tripId as string;
  const tripData = useQuery(api.tripDetail.GetTripById, { tripId });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (tripData !== undefined) {
      setLoading(false);
    }
  }, [tripData]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] gap-6">
        <div className="relative">
          <Loader2 className="w-16 h-16 text-primary animate-spin" />
          <Plane className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-primary" />
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">Loading your adventure...</h2>
          <p className="text-muted-foreground">Preparing your personalized itinerary</p>
        </div>
      </div>
    );
  }

  if (!tripData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-6">
        <div className="text-6xl mb-6">🏜️</div>
        <h2 className="text-3xl font-bold mb-2">Trip Not Found</h2>
        <p className="text-muted-foreground max-w-md">
          We couldn&apos;t find the trip you&apos;re looking for. It might have been deleted or the link is incorrect.
        </p>
        <button 
          onClick={() => window.location.href = '/'}
          className="mt-8 px-8 py-3 rounded-2xl bg-primary text-white font-bold hover:scale-105 transition-transform"
        >
          Go Back Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-6 py-12 md:px-20 lg:px-44">
      <div className="max-w-6xl mx-auto">
        <TripDisplay trip={tripData.tripDetail} tripId={tripData._id} />
      </div>
    </div>
  );
}
