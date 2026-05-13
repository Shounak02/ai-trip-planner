"use client";

import React from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUserDetail } from "@/app/provider";
import Link from "next/link";
import { MapPin, Calendar, Users, ArrowRight, Plane, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function MyTrips() {
  const { userDetail } = useUserDetail();
  const trips = useQuery(api.tripDetail.GetUserTrips, 
    userDetail?._id ? { uid: userDetail._id } : "skip"
  );

  if (trips === undefined) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
        <p className="text-muted-foreground">Fetching your journeys...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-6 py-12 md:px-20 lg:px-44">
      <div className="max-w-6xl mx-auto space-y-12">
        <header className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight">My Journeys</h1>
          <p className="text-muted-foreground text-lg">All your planned adventures in one place</p>
        </header>

        {trips.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-6 bg-card border border-dashed border-border rounded-3xl">
            <div className="w-20 h-20 rounded-full bg-primary/5 flex items-center justify-center">
              <Plane className="w-10 h-10 text-primary/40 -rotate-45" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">No trips planned yet</h2>
              <p className="text-muted-foreground max-w-sm">
                Start your first adventure today and it will appear here.
              </p>
            </div>
            <Link href="/create-new-trip">
              <button className="px-8 py-3 rounded-2xl bg-primary text-white font-bold hover:scale-105 transition-transform">
                Plan My First Trip
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((trip, idx) => (
              <motion.div
                key={trip.tripId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="group relative flex flex-col bg-card border border-border/50 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
              >
                <div className="relative h-40 bg-muted overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
                   <div className="absolute bottom-4 left-4 z-20">
                      <h2 className="text-xl font-bold text-white line-clamp-1">{trip.tripDetail.destination}</h2>
                      <div className="flex items-center gap-1.5 text-white/80 text-xs">
                        <MapPin className="w-3 h-3" />
                        {trip.tripDetail.origin}
                      </div>
                   </div>
                </div>
                
                <div className="p-6 space-y-4 flex-1 flex flex-col">
                  <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-primary" />
                      {trip.tripDetail.duration} Days
                    </div>
                    <div className="flex items-center gap-1.5 capitalize">
                      <Users className="w-3.5 h-3.5 text-primary" />
                      {trip.tripDetail.group_size}
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    A beautiful {trip.tripDetail.budget} trip to {trip.tripDetail.destination} for {trip.tripDetail.group_size}.
                  </p>

                  <div className="pt-4 mt-auto">
                    <Link href={`/view-trip/${trip.tripId}`}>
                      <button className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-secondary hover:bg-primary hover:text-white transition-all group/btn">
                        <span className="font-bold text-sm">View Itinerary</span>
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
