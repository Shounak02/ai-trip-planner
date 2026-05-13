"use client";

import HeroVideoDialog from "@/components/magicui/hero-video-dialog";
import { AuroraText } from "@/components/magicui/aurora-text";
import { TextAnimate } from "@/components/magicui/text-animate";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@clerk/nextjs";
import { ArrowDown, Globe2, Landmark, Plane, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const Suggestions = [
  { title: "Create New Trip", icon: <Globe2 className="text-blue-400 h-5 w-5" /> },
  { title: "Inspire me where to go", icon: <Plane className="text-green-500 h-5 w-5" /> },
  { title: "Discover Hidden gems", icon: <Landmark className="text-orange-500 h-5 w-5" /> },
  { title: "Adventure Destination", icon: <Globe2 className="text-yellow-600 h-5 w-5" /> },
];

function Hero() {
  const { user } = useUser();
  const router = useRouter();

  const onSend = () => {
    if (!user) router.push("/sign-in");
    else router.push("/create-new-trip");

  };

  return (
    <div className="mt-24 flex items-center justify-center">
      <div className="max-w-3xl w-full text-center space-y-6">
        <h1 className="text-xl md:text-5xl font-bold">
          Hey I'm your personal <AuroraText>Trip Planner</AuroraText>
        </h1>

        {/* Animated subtitle */}
        <TextAnimate
          animation="blurInUp"
          by="character"
          once
          className="text-lg block"
        >
          Tell me what you want, and I'll handle the rest: Flights, Hotels, trip planner—all in seconds.
        </TextAnimate>

        {/* Input Box */}
        <div className="border rounded-2xl p-4 shadow relative">
          <Textarea
            placeholder="Create a trip for Mumbai from Kolkata"
            className="w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none"
          />
          <Button
            size="icon"
            className="absolute bottom-6 right-6"
            onClick={onSend}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>

        {/* Suggestions */}
        <div className="flex gap-5 justify-center">
          {Suggestions.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 border rounded-full p-2 cursor-pointer hover:bg-primary hover:text-white transition"
            >
              {item.icon}
              <h2 className="text-sm">{item.title}</h2>
            </div>
          ))}
        </div>

        {/* Video Section */}
        <div className="flex flex-col items-center mt-14">
          <h2 className="flex gap-2 items-center">
            Not Sure where to start? <strong>See how it works</strong> <ArrowDown />
          </h2>
          <HeroVideoDialog
            className="block  mt-6"
            animationStyle="from-center"
            videoSrc="https://www.example.com/dummy-video"
            thumbnailSrc="https://mma.prnewswire.com/media/2401528/1_MindtripProduct.jpg?p=facebook"
            thumbnailAlt="Dummy Video Thumbnail"
          />


          {/* <HeroVideoDialog
          className="block mt-6 dark:hidden"
          animationStyle="from-center"
          videoSrc="https://www.example.com/light-video"
          thumbnailSrc="https://mma.prnewswire.com/media/2401528/1_MindtripProduct.jpg?p=facebook"
          thumbnailAlt="Light Mode Video Thumbnail"
        />

        <HeroVideoDialog
          className="hidden mt-6 dark:block"
          animationStyle="from-center"
          videoSrc="https://www.example.com/dark-video"
          thumbnailSrc="https://www.example.com/dark-thumbnail.jpg"
          thumbnailAlt="Dark Mode Video Thumbnail"
        /> */}



        </div>
      </div>
    </div>
  );
}

export default Hero;
