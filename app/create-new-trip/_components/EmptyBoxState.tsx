import React from "react";
import { Airplay, Globe2, Plane, Landmark } from "lucide-react";

const Suggestions = [
  { title: "Create New Trip", icon: <Globe2 className="text-blue-400 h-5 w-5" /> },
  { title: "Inspire me where to go", icon: <Plane className="text-green-500 h-5 w-5" /> },
  { title: "Discover Hidden Gems", icon: <Landmark className="text-orange-500 h-5 w-5" /> },
  { title: "Adventure Destination", icon: <Globe2 className="text-yellow-600 h-5 w-5" /> },
];

function EmptyBoxState({onSelectOption}:any) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow-lg animate-fadeIn">
      <div className="bg-primary/10 dark:bg-primary/20 rounded-full p-6 mb-4">
        <Airplay className="w-12 h-12 text-primary dark:text-primary-foreground animate-bounce" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
        Start Planning Your New Trip
      </h2>
      <p className="text-gray-500 dark:text-gray-300 max-w-md mb-6">
        Use our AI-powered trip planner to create personalized itineraries.
        Click a suggestion below to get started!
      </p>

      <div className="flex gap-4 flex-wrap justify-center">
        {Suggestions.map((item, idx) => (
          <div
            key={idx}
            onClick={()=>onSelectOption(item.title)}
            className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 rounded-full p-2 px-4 cursor-pointer hover:bg-primary hover:text-white transition"
          >
            {item.icon}
            <span className="text-sm font-medium">{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmptyBoxState;
