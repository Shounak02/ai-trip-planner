"use client";

import React, { useState } from "react";
import { TripPlan, Hotel as HotelType, Activity } from "@/lib/types";
import { MapPin, Clock, Ticket, Navigation2, Star, Hotel, Map as MapIcon, ExternalLink, Download, Check, Copy, Trash2, Plus, Save, Loader2, Sparkles as SparklesIcon, Share2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PlaceImage from "@/app/_components/PlaceImage";
import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import axios from "axios";

interface Props {
  trip: TripPlan;
  tripId: Id<"TripDetailTable">;
}

export default function TripDisplay({ trip: initialTrip, tripId }: Props) {
  const [trip, setTrip] = useState<TripPlan>(initialTrip);
  const [copied, setCopied] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [addingToDay, setAddingToDay] = useState<number | null>(null);
  const updateTrip = useMutation(api.tripDetail.UpdateTripDetail);

  const getMapsUrl = (name: string, address: string) => {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name + " " + address)}`;
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  const saveChanges = async (newTrip: TripPlan) => {
    setIsSaving(true);
    try {
      await updateTrip({
        id: tripId,
        tripDetail: newTrip,
      });
    } catch (err) {
      console.error("Failed to save changes:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const removeHotel = (index: number) => {
    const newHotels = [...trip.hotels];
    newHotels.splice(index, 1);
    const newTrip = { ...trip, hotels: newHotels };
    setTrip(newTrip);
    saveChanges(newTrip);
  };

  const removeActivity = (dayIndex: number, activityIndex: number) => {
    const newItinerary = [...trip.itinerary];
    newItinerary[dayIndex].activities.splice(activityIndex, 1);
    const newTrip = { ...trip, itinerary: newItinerary };
    setTrip(newTrip);
    saveChanges(newTrip);
  };

  const addSmartActivity = async (dayIndex: number) => {
    setAddingToDay(dayIndex);
    try {
      const dayActivities = trip.itinerary[dayIndex].activities;
      const lastActivity = dayActivities[dayActivities.length - 1];
      const lastTime = lastActivity?.best_time_to_visit || "10:00 AM";
      
      const existingNames = trip.itinerary.flatMap(d => d.activities.map(a => a.place_name));
      
      const response = await axios.post("/api/generate-activity", {
        destination: trip.destination,
        existingActivities: existingNames,
        lastActivityTime: lastTime,
      });

      if (response.data) {
        const newItinerary = [...trip.itinerary];
        newItinerary[dayIndex].activities.push(response.data);
        const newTrip = { ...trip, itinerary: newItinerary };
        setTrip(newTrip);
        saveChanges(newTrip);
      }
    } catch (err) {
      console.error("Failed to generate activity:", err);
    } finally {
      setAddingToDay(null);
    }
  };

  return (
    <div className="space-y-20 animate-fadeIn pb-32 pt-20 print:space-y-12 print:pb-0 print:pt-0 print:text-black">
      {/* Premium Action Bar (Hidden on print) */}
      <div className="sticky top-24 z-[80] mt-10 flex items-center justify-between gap-4 py-4 px-6 bg-background/40 backdrop-blur-2xl border border-primary/10 rounded-3xl shadow-2xl shadow-primary/5 print:hidden">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                <Navigation2 className="w-5 h-5 text-primary-foreground rotate-45" />
            </div>
            <div>
                <h4 className="text-white font-bold text-sm tracking-tight leading-none mb-1">Voyage Plan</h4>
                <div className="flex items-center gap-2">
                   {isSaving ? (
                       <span className="flex items-center gap-1.5 text-[10px] text-primary animate-pulse font-bold uppercase tracking-widest">
                           <Loader2 className="w-2.5 h-2.5 animate-spin" />
                           Syncing
                       </span>
                   ) : (
                        <span className="flex items-center gap-1.5 text-[10px] text-green-400 font-bold uppercase tracking-widest">
                           <Check className="w-2.5 h-2.5" />
                           Saved
                        </span>
                   )}
                </div>
            </div>
        </div>
        <div className="flex gap-3">
            <Button variant="outline" onClick={handleShare} className="rounded-2xl h-11 bg-card/30 border-white/5 hover:bg-white/10 hover:border-primary/30 transition-all duration-300 flex items-center gap-2 px-5 group">
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Share2 className="w-4 h-4 text-white group-hover:text-primary transition-colors" />}
              <span className="text-white group-hover:text-primary font-bold text-xs">{copied ? "Copied!" : "Share Link"}</span>
            </Button>
            <Button onClick={handleDownloadPDF} className="rounded-2xl h-11 bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2 px-6 shadow-xl shadow-primary/20 transition-all duration-300 group">
                <Download className="w-4 h-4" />
                <span className="font-bold text-xs uppercase tracking-tight">Export PDF</span>
            </Button>
        </div>
      </div>

      {/* Hero / Overview */}
      <section className="text-center space-y-6 pt-8 print:pt-4">
        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-[0.2em] border border-primary/20 print:border-black print:text-black">
          {trip.origin} <span className="text-muted-foreground/50 print:text-black">→</span> {trip.destination}
        </div>
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white uppercase leading-[0.85] print:text-black print:text-5xl">
          The <span className="text-primary italic print:text-black">{trip.duration}</span><br />Journey
        </h1>
        <div className="flex flex-wrap justify-center gap-10 text-muted-foreground pt-4 print:text-black print:gap-6">
          <div className="flex flex-col items-center gap-1">
            <span className="text-xs font-bold uppercase tracking-widest opacity-40 print:opacity-100">Investment</span>
            <span className="text-xl font-black text-white capitalize print:text-black">{trip.budget}</span>
          </div>
          <div className="w-px h-12 bg-white/5 hidden md:block print:bg-black/10" />
          <div className="flex flex-col items-center gap-1">
            <span className="text-xs font-bold uppercase tracking-widest opacity-40 print:opacity-100">Expedition</span>
            <span className="text-xl font-black text-white capitalize print:text-black">{trip.group_size}</span>
          </div>
        </div>
      </section>

      {/* Hotel Recommendations */}
      <section className="space-y-10">
        <div className="flex items-end justify-between px-2">
            <div className="space-y-1">
                <p className="text-primary text-xs font-bold uppercase tracking-[0.3em] print:text-black">Curated Retreats</p>
                <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter print:text-black">Stay In Style</h2>
            </div>
            <div className="hidden md:block h-px flex-1 bg-gradient-to-r from-primary/20 to-transparent mx-10 mb-4 print:bg-black/10" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 print:grid-cols-2 print:gap-4">
          <AnimatePresence mode="popLayout">
            {trip.hotels.map((hotel, idx) => (
              <motion.div
                key={`${hotel.hotel_name}-${idx}`}
                layout
                className="group relative bg-[#0A1628]/40 backdrop-blur-md border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-primary/40 transition-all duration-500 flex flex-col print:break-inside-avoid print:bg-white print:border-black/10 print:rounded-2xl"
              >
                <div className="relative h-64 bg-muted overflow-hidden print:h-44">
                  <PlaceImage 
                    query={`${hotel.hotel_name} ${hotel.hotel_address}`} 
                    className="w-full h-full"
                    fallbackSig={`hotel-${idx}`}
                  />
                  <div className="absolute top-6 right-6 z-30 opacity-0 group-hover:opacity-100 transition-all print:hidden">
                    <button onClick={(e) => { e.preventDefault(); removeHotel(idx); }} className="p-3 bg-red-500/10 backdrop-blur-xl text-red-500 rounded-2xl border border-red-500/20 shadow-2xl hover:bg-red-500 hover:text-white transition-all"><Trash2 className="w-5 h-5" /></button>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6 z-20 flex justify-between items-end print:hidden">
                    <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-xl px-3 py-1.5 rounded-xl text-white text-[10px] font-black uppercase tracking-widest border border-white/10">{hotel.rating} Stars</div>
                    <div className="text-white font-black text-2xl tracking-tighter">{hotel.price_per_night}</div>
                  </div>
                </div>
                <a 
                  href={getMapsUrl(hotel.hotel_name, hotel.hotel_address)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-8 space-y-4 flex-1 flex flex-col print:p-4 group/card"
                >
                  <div className="space-y-1">
                      <div className="flex justify-between items-start">
                        <h3 className="text-2xl font-black text-white tracking-tight print:text-black print:text-lg group-hover/card:text-primary transition-colors">{hotel.hotel_name}</h3>
                        <ExternalLink className="w-4 h-4 text-white/20 group-hover/card:text-primary transition-colors print:hidden" />
                      </div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-primary/60 print:text-black/60">{hotel.hotel_address}</p>
                  </div>
                  <p className="text-sm text-muted-foreground/80 line-clamp-3 leading-relaxed print:text-black/80 print:line-clamp-none print:text-xs font-medium">{hotel.description}</p>
                  <div className="print:block hidden text-sm font-bold mt-2">Rating: {hotel.rating} Stars | Price: {hotel.price_per_night}</div>
                </a>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Itinerary */}
      <section className="space-y-12">
        <div className="flex items-end justify-between px-2">
            <div className="space-y-1">
                <p className="text-primary text-xs font-bold uppercase tracking-[0.3em] print:text-black">Day-by-Day</p>
                <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter print:text-black">Your Itinerary</h2>
            </div>
            <div className="hidden md:block h-px flex-1 bg-gradient-to-r from-primary/20 to-transparent mx-10 mb-4 print:bg-black/10" />
        </div>

        <div className="space-y-20 print:space-y-10">
          {trip.itinerary.map((day, dIdx) => (
            <div key={dIdx} className="relative pl-10 md:pl-0 print:pl-0 print:break-before-auto">
              {/* Day Header */}
              <div className="md:grid md:grid-cols-[160px_1fr] gap-12 items-start mb-10 print:flex print:flex-col print:gap-2 print:mb-4">
                <div className="hidden md:block sticky top-48 print:static">
                  <div className="text-7xl font-black text-primary/5 mb-[-1.5rem] print:text-3xl print:text-black/10">0{day.day}</div>
                  <div className="text-2xl font-black text-white uppercase tracking-tighter print:text-black print:text-xl">Day 0{day.day}</div>
                </div>
                <div className="bg-[#0A1628]/40 backdrop-blur-md rounded-[2.5rem] p-8 border border-white/5 flex-1 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 print:bg-white print:border-black/20 print:rounded-xl print:p-4 print:border-b-2">
                   <div className="space-y-3">
                      <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter leading-none print:text-black print:text-xl">{day.day_plan}</h3>
                      <div className="flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest print:bg-transparent print:text-black">{day.best_time_to_visit_day}</div>
                   </div>
                   <Button 
                    variant="outline" 
                    size="lg" 
                    disabled={addingToDay === dIdx}
                    onClick={() => addSmartActivity(dIdx)}
                    className="rounded-[1.2rem] bg-primary/10 text-primary border-primary/20 hover:bg-primary hover:text-white transition-all duration-500 print:hidden gap-3 px-6 h-12 font-black uppercase text-[10px] tracking-widest"
                   >
                     {addingToDay === dIdx ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                     Suggest Activity
                   </Button>
                </div>
              </div>

              {/* Activities */}
              <div className="md:grid md:grid-cols-[160px_1fr] gap-12 print:block">
                <div className="hidden md:block" />
                <div className="space-y-8 print:space-y-4">
                  <AnimatePresence mode="popLayout">
                    {day.activities.map((activity, aIdx) => (
                      <motion.div
                        key={`${activity.place_name}-${aIdx}`}
                        layout
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 30, transition: { duration: 0.2 } }}
                        className="group relative bg-[#0A1628]/20 backdrop-blur-sm border border-white/5 rounded-[2.5rem] p-6 md:p-8 flex flex-col md:flex-row gap-8 print:flex-row print:p-4 print:bg-white print:border-black/10 print:rounded-xl print:break-inside-avoid"
                      >
                        <div className="w-full md:w-60 h-44 md:h-44 bg-muted rounded-[2rem] overflow-hidden shrink-0 print:w-28 print:h-28 print:rounded-lg">
                          <PlaceImage 
                              query={`${activity.place_name} ${activity.place_address}`} 
                              className="w-full h-full"
                              fallbackSig={`place-${dIdx}-${aIdx}`}
                          />
                        </div>
                        <div className="flex-1 space-y-4 print:space-y-1">
                          <div className="flex flex-wrap justify-between items-start gap-4">
                              <div className="space-y-1">
                                  <a 
                                      href={getMapsUrl(activity.place_name, activity.place_address)} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="text-2xl font-black text-white group-hover:text-primary transition-colors tracking-tight flex items-center gap-2 print:text-black"
                                  >
                                      {activity.place_name}
                                      <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary opacity-0 group-hover:opacity-100 transition-all print:hidden" />
                                  </a>
                                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 print:text-black/60">{activity.place_address}</p>
                              </div>
                              <div className="flex items-center gap-3">
                                  <div className="px-3 py-1.5 rounded-xl bg-white/5 text-white text-[9px] font-black uppercase tracking-[0.15em] border border-white/5 print:hidden">
                                      {activity.best_time_to_visit}
                                  </div>
                                  <button 
                                      onClick={() => removeActivity(dIdx, aIdx)}
                                      className="p-2.5 text-muted-foreground/40 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all print:hidden"
                                  >
                                      <Trash2 className="w-5 h-5" />
                                  </button>
                              </div>
                          </div>
                          <p className="text-base text-muted-foreground leading-relaxed line-clamp-3 font-medium print:text-black/80 print:text-xs print:line-clamp-none">{activity.place_details}</p>
                          <div className="flex flex-wrap gap-6 pt-4 border-t border-white/5 print:border-black/10 print:gap-4 print:pt-2">
                             <span className="text-xs font-black text-white print:text-black uppercase">Admission: {activity.ticket_pricing}</span>
                             <span className="text-xs font-black text-white print:text-black uppercase">Time: {activity.best_time_to_visit}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Global Print Styles */}
      <style jsx global>{`
        @media print {
          @page {
            margin: 20mm;
            size: auto;
          }
          body {
            background-color: white !important;
            color: black !important;
            font-family: 'Inter', sans-serif !important;
          }
          header, footer, .custom-cursor, .custom-cursor-follower, .print-hidden, button, .sticky {
            display: none !important;
          }
          main {
            padding: 0 !important;
            background-color: white !important;
          }
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          img {
            max-width: 100% !important;
            display: block !important;
            page-break-inside: avoid !important;
          }
        }
      `}</style>
    </div>
  );
}
