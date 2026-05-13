"use client";
import React, { useState } from "react";
import { Globe2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { TripInfo } from "./ChatBox";

interface FinalUiProps {
  viewTrip?: () => void;
  disable?: boolean;
  origin?: string;
  destination?: string;
  groupSize?: string;
  budget?: string;
  duration?: string;
  setTripDetail?: (trip: TripInfo) => void; // added to send trip back
}

function FinalUi({ origin, destination, groupSize, budget, duration, setTripDetail }: FinalUiProps) {
  const [tripData, setTripData] = useState<TripInfo | null>(null);
  const [loading, setLoading] = useState(false);

  const generateTrip = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/trip", {
        messages: [
          {
            role: "user",
            content: `${origin} to ${destination}, group: ${groupSize}, budget: ${budget}, duration: ${duration}`,
          },
        ],
        isFinal: true,
      });

      const tripPlan = response.data.trip_plan;
      setTripData(tripPlan);

      // Send trip detail back to parent (ChatBox)
      if (setTripDetail) setTripDetail(tripPlan);

      setLoading(false);
    } catch (error) {
      console.error("Trip generation failed:", error);
      setLoading(false);
    }
  };

  const viewTrip = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col items-center justify-center mt-6 p-6 bg-white rounded-2xl shadow-md w-full">
      {!tripData ? (
        <>
          <Globe2 className="text-primary text-4xl animate-bounce" />
          <h2 className="mt-3 text-lg font-semibold text-primary text-center">
            Planning your dream trip...
          </h2>
          <p className="text-gray-500 text-sm text-center mt-1">
            Gathering best destinations, activities, and travel details for you.
          </p>

          <div className="w-48 h-2 bg-gray-200 rounded-full mt-4 overflow-hidden">
            <div className="h-2 bg-primary animate-pulse" style={{ width: "75%" }}></div>
          </div>

          <Button
            disabled={loading}
            className="mt-4 w-full bg-primary text-white"
            onClick={generateTrip}
          >
            {loading ? "Generating..." : "Generate Trip"}
          </Button>
        </>
      ) : (
        <>
          <h2 className="text-xl font-bold text-center text-primary mb-4">
            Your Trip Plan is Ready!
          </h2>
          <Button
            onClick={viewTrip}
            className="mt-4 w-full bg-primary text-white"
          >
            View Trip
          </Button>
        </>
      )}
    </div>
  );
}

export default FinalUi;
