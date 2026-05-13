"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { Loader, Send } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import EmptyBoxState from "./EmptyBoxState";
import GroupSizeUi from "./GroupSizeUi";
import BudgetUi from "./BudgetUi";
import SelectDays from "./SelectDays";
import FinalUi from "./FinalUi";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUserDetail } from "@/app/provider";
import { v4 as uuidv4 } from "uuid";
import Itinerary from "./Itinerary";
// import { TripInfo } from "./ChatBox";

export type TripInfo = {
  budget?: string;
  destination?: string;
  duration?: string;
  group_size?: string;
  origin?: string;
  hotels?: any[];
  itinerary?: { title: string; content: string }[];
};

type Message = {
  role: "user" | "assistant";
  content: string;
  ui?: string;
};

function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [isFinal, setIsFinal] = useState(false);
  const [tripDetail, setTripDetail] = useState<TripInfo | null>(null);
  const SaveTripDetail = useMutation(api.tripDetail.CreateTripDetail);
  const { userDetail } = useUserDetail();
  

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const onSend = async (text?: string) => {
    const msg = (text ?? userInput).trim();
    if (!msg) return;

    setLoading(true);
    const newUserMsg: Message = { role: "user", content: msg };
    setMessages((prev) => [...prev, newUserMsg]);
    setUserInput("");

    try {
      const result = await axios.post("/api/aimodel", {
        messages: [...messages, newUserMsg],
        isFinal,
      });

      const assistantMsg: Message = {
        role: "assistant",
        content: result.data?.resp || "No response",
        ui: result.data?.ui || "",
      };

      if (!isFinal) setMessages((prev) => [...prev, assistantMsg]);

      if (isFinal && result.data?.trip_plan) {
        setTripDetail(result.data.trip_plan);

        const tripId = uuidv4();
        await SaveTripDetail({
          tripDetail: result.data.trip_plan,
          tripId,
          uid: userDetail?._id,
        });
      }
    } catch (err) {
      console.error("API Error:", err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Error: Could not get response." },
      ]);
    }

    setLoading(false);
  };

  const RenderGenerativeUi = (ui: string) => {
    switch (ui.toLowerCase()) {
      case "groupsize":
        return <GroupSizeUi onSelectedOption={(v) => onSend(v)} />;
      case "budget":
        return <BudgetUi onSelectedOption={(v) => onSend(v)} />;
      case "tripduration":
        return <SelectDays onSelectedOption={(v) => onSend(v)} />;
      case "final":
        return (
          <FinalUi
            viewTrip={() => console.log("View Trip")}
            disable={!tripDetail}
            origin={tripDetail?.origin}
            destination={tripDetail?.destination}
            groupSize={tripDetail?.group_size}
            budget={tripDetail?.budget}
            duration={tripDetail?.duration}
          />
        );
      default:
        return null;
    }
  };

  // Detect final UI
  useEffect(() => {
    const lastMsg = messages[messages.length - 1];
    if (lastMsg?.ui === "final") {
      setIsFinal(true);
      setUserInput("OK, Great!");
    }
  }, [messages]);

  // Auto-send final confirmation
  useEffect(() => {
    if (isFinal && userInput) onSend();
  }, [isFinal]);

  return (
    <div className="h-[83vh] flex flex-col md:flex-row gap-5">
      {/* Chat Section */}
      <div className="flex-1 flex flex-col">
        {messages.length === 0 && (
          <EmptyBoxState onSelectOption={(v: string) => onSend(v)} />
        )}

        <section className="flex-1 overflow-y-auto p-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex mt-2 ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-lg px-4 py-2 rounded-lg ${
                  msg.role === "user"
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {msg.content}
                {RenderGenerativeUi(msg.ui ?? "")}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start mt-2">
              <div className="max-w-lg bg-gray-200 text-black px-4 py-2 rounded-lg">
                <Loader className="animate-spin h-4 w-4" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </section>

        <section>
          <div className="border rounded-2xl p-4 shadow relative">
            <Textarea
              placeholder="Type your message here..."
              className="w-full h-28 bg-transparent border-none focus-visible:ring-0 resize-none"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <Button
              size="icon"
              className="absolute bottom-6 right-6"
              onClick={() => onSend()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </section>
      </div>

      {/* Itinerary Section */}
      <div className="flex-1">
        <Itinerary tripDetail={tripDetail} />
      </div>
    </div>
  );
}

export default ChatBox;
