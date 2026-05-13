"use client";

import React, { useEffect, useRef, useState } from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

export function PopularCityList() {
  const cards = wondersData.map((card, index) => (
    <Card key={card.src} card={card} index={index} layout={true} />
  ));

  return (
    <section className="w-full py-20 bg-background">
      <h2
        className="
          max-w-7xl mx-auto px-6
          text-3xl md:text-6xl
          font-black tracking-tighter
          text-white uppercase
          mb-12
        "
      >
        Explore the Wonders
      </h2>
      <Carousel items={cards} />
    </section>
  );
}

const DummyContent = ({
  description,
  imageSrc,
  alt,
}: {
  description: string;
  imageSrc: string;
  alt: string;
}) => {
  const imageRef = useRef<HTMLDivElement>(null);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (imageRef.current) {
        const rect = imageRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const offset = (rect.top - windowHeight / 2) * -0.05;
        setOffsetY(offset);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative bg-muted p-8 md:p-14 rounded-3xl shadow-lg mb-6 border border-white/5 overflow-hidden group hover:shadow-2xl transition-all duration-500">
      <div
        ref={imageRef}
        className="absolute inset-0 rounded-3xl overflow-hidden"
        style={{ transform: `translateY(${offsetY}px)`, transition: "transform 0.1s ease-out" }}
      >
        <img
          src={imageSrc}
          alt={alt}
          className="w-full h-full object-cover rounded-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40 rounded-3xl pointer-events-none"></div>
      </div>

      <div className="relative z-10 text-center md:text-left">
        <p className="text-white text-lg md:text-3xl font-black uppercase tracking-tighter max-w-3xl mx-auto">
          {description}
        </p>
      </div>
    </div>
  );
};

const wondersData = [
  {
    category: "Agra, India",
    title: "Taj Mahal",
    src: "/taj-mahal.jpg",
    content: (
      <DummyContent
        description="A monument of immeasurable beauty and an eternal symbol of love."
        imageSrc="/taj-mahal.jpg"
        alt="Taj Mahal"
      />
    ),
  },
  {
    category: "Beijing, China",
    title: "Great Wall of China",
    src: "/great-wall.jpg",
    content: (
      <DummyContent
        description="The largest man-made structure in the world, stretching over 13,000 miles."
        imageSrc="/great-wall.jpg"
        alt="Great Wall"
      />
    ),
  },
  {
    category: "Rio de Janeiro, Brazil",
    title: "Christ the Redeemer",
    src: "/christ-redeemer.jpg",
    content: (
      <DummyContent
        description="The colossal statue of Jesus Christ overlooking Rio with open arms."
        imageSrc="/christ-redeemer.jpg"
        alt="Christ the Redeemer"
      />
    ),
  },
  {
    category: "Cusco Region, Peru",
    title: "Machu Picchu",
    src: "/machu-picchu.jpg",
    content: (
      <DummyContent
        description="The Incan citadel set high in the Andes Mountains."
        imageSrc="/machu-picchu.jpg"
        alt="Machu Picchu"
      />
    ),
  },
  {
    category: "Yucatan, Mexico",
    title: "Chichén Itzá",
    src: "/chichen-itza.jpg",
    content: (
      <DummyContent
        description="A massive pyramid built by the Mayans that stands as a testament to their astronomical knowledge."
        imageSrc="/chichen-itza.jpg"
        alt="Chichen Itza"
      />
    ),
  },
  {
    category: "Rome, Italy",
    title: "The Colosseum",
    src: "/colosseum.jpg",
    content: (
      <DummyContent
        description="The world's largest amphitheater, echoing with the history of ancient Roman gladiator battles."
        imageSrc="/colosseum.jpg"
        alt="Colosseum"
      />
    ),
  },
  {
    category: "Ma'an, Jordan",
    title: "Petra",
    src: "/petra.jpg",
    content: (
      <DummyContent
        description="The Rose City carved directly into vibrant red and pink sandstone cliffs."
        imageSrc="/petra.jpg"
        alt="Petra"
      />
    ),
  },
];

export default wondersData;
