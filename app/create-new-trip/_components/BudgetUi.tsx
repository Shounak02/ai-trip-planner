import React from "react";

export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Cheap",
    desc: "Stay conscious of costs",
    color: "bg-green-100 text-green-700",
    icon: "💸",
  },
  {
    id: 2,
    title: "Moderate",
    desc: "Keep cost on the average side",
    color: "bg-yellow-100 text-yellow-700",
    icon: "💰",
  },
  {
    id: 3,
    title: "Luxury",
    desc: "Don't worry about cost",
    color: "bg-purple-100 text-purple-700",
    icon: "🏖️",
  },
];

function BudgetUi({ onSelectedOption }: { onSelectedOption: (v: string) => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
      {SelectBudgetOptions.map((item) => (
        <div
          key={item.id}
          className={`p-4 rounded-2xl border hover:cursor-pointer hover:shadow ${item.color}`}
          onClick={() => onSelectedOption(item.title)}
        >
          <h2 className="text-2xl">{item.icon}</h2>
          <h3 className="font-semibold mt-1">{item.title}</h3>
          <p className="text-sm opacity-80">{item.desc}</p>
        </div>
      ))}
    </div>
  );
}

export default BudgetUi;
