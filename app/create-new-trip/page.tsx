"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import { TripFormData, DEFAULT_FORM_DATA, WIZARD_STEPS } from "@/lib/types";
import StepIndicator from "./_components/StepIndicator";
import DestinationStep from "./_components/DestinationStep";
import DurationStep from "./_components/DurationStep";
import GroupTypeStep from "./_components/GroupTypeStep";
import BudgetStep from "./_components/BudgetStep";
import TravelStyleStep from "./_components/TravelStyleStep";
import HotelStep from "./_components/HotelStep";
import ExtraPrefsStep from "./_components/ExtraPrefsStep";
import ReviewStep from "./_components/ReviewStep";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, ArrowRight, PlaneTakeoff } from "lucide-react";
import { useUserDetail } from "../provider";

export default function CreateNewTrip() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<TripFormData>(DEFAULT_FORM_DATA);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const { userDetail } = useUserDetail();
  const router = useRouter();
  const saveTrip = useMutation(api.tripDetail.CreateTripDetail);

  const handleDataChange = (data: Partial<TripFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < WIZARD_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      generateTrip();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const generateTrip = async () => {
    if (!user) return alert("Please sign in to generate a trip");
    if (!userDetail?._id) return alert("User details not found. Please try again.");

    setLoading(true);
    try {
      const response = await axios.post("/api/aimodel", {
        formData,
      });

      if (response.data?.trip_plan) {
        const tripId = uuidv4();
        await saveTrip({
          tripId,
          uid: userDetail._id,
          tripDetail: response.data.trip_plan,
        });

        router.push(`/view-trip/${tripId}`);
      }
    } catch (error: any) {
      console.error("Failed to generate trip:", error);
      const msg = error.response?.data?.error || error.message || "Unknown error";
      alert(`Error generating trip: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0: return <DestinationStep formData={formData} onChange={handleDataChange} />;
      case 1: return <DurationStep formData={formData} onChange={handleDataChange} />;
      case 2: return <GroupTypeStep formData={formData} onChange={handleDataChange} />;
      case 3: return <BudgetStep formData={formData} onChange={handleDataChange} />;
      case 4: return <TravelStyleStep formData={formData} onChange={handleDataChange} />;
      case 5: return <HotelStep formData={formData} onChange={handleDataChange} />;
      case 6: return <ExtraPrefsStep formData={formData} onChange={handleDataChange} />;
      case 7: return <ReviewStep formData={formData} />;
      default: return null;
    }
  };

  const isNextDisabled = () => {
    if (currentStep === 0) return !formData.origin || !formData.destination;
    if (currentStep === 2) return !formData.groupType;
    if (currentStep === 3) return !formData.budget;
    return false;
  };

  return (
    <div className="min-h-[90vh] bg-background px-6 pt-32 pb-20 md:px-20 lg:px-44">
      <div className="max-w-4xl mx-auto">
        <StepIndicator currentStep={currentStep} />

        <div className="mt-12 bg-card border border-border/50 rounded-3xl p-8 shadow-xl shadow-primary/5 min-h-[500px] flex flex-col">
          <div className="flex-1">
            {renderStep()}
          </div>

          <div className="flex items-center justify-between mt-12 pt-8 border-t">
            <Button
              variant="ghost"
              onClick={prevStep}
              disabled={currentStep === 0 || loading}
              className="gap-2 rounded-xl h-12 px-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>

            <Button
              onClick={nextStep}
              disabled={isNextDisabled() || loading}
              className={`gap-2 rounded-xl h-12 px-8 ${
                currentStep === WIZARD_STEPS.length - 1
                  ? "bg-primary hover:bg-primary/90"
                  : ""
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating...
                </>
              ) : currentStep === WIZARD_STEPS.length - 1 ? (
                <>
                  Generate My Trip
                  <PlaneTakeoff className="w-4 h-4" />
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
