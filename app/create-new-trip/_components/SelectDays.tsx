"use client";

import React, { useState } from "react";

type Props = {
  onSelectedOption: (value: string) => void;
};

export default function SelectDays({ onSelectedOption }: Props) {
  const [days, setDays] = useState(3);

  return (
    <div className="flex flex-col items-center mt-4 p-6 border rounded-2xl bg-white shadow-md">
      <h2 className="text-lg font-semibold mb-4">
        How many days do you plan to spend on this trip?
      </h2>

      {/* Meter with – and + buttons */}
      <div className="flex items-center gap-6 mb-4">
        <button
          className="px-4 py-2 text-xl border rounded-full hover:bg-gray-200"
          onClick={() => setDays((prev) => (prev > 1 ? prev - 1 : 1))}
        >
          –
        </button>

        {/* Range slider */}
        <input
          type="range"
          min={1}
          max={30}
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          className="w-48 accent-primary"
        />

        <button
          className="px-4 py-2 text-xl border rounded-full hover:bg-gray-200"
          onClick={() => setDays((prev) => prev + 1)}
        >
          +
        </button>
      </div>

      {/* Display selected days */}
      <span className="text-2xl font-bold mb-4">{days} Days</span>

      <button
        className="mt-2 bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90"
        onClick={() => onSelectedOption(`${days} Days`)}
      >
        Confirm
      </button>
    </div>
  );
}
