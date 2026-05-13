import React from "react";

export const SelectTravelesList = [
  { id: 1, title: "Just Me", desc: "A solo traveler", icon: "🧍", people: "1" },
  { id: 2, title: "A Couple", desc: "Two travelers", icon: "👫", people: "2 People" },
  { id: 3, title: "Family", desc: "Fun loving group", icon: "👨‍👩‍👧‍👦", people: "3–5 People" },
  { id: 4, title: "Friends", desc: "Thrill seekers", icon: "🧑‍🤝‍🧑", people: "5–10 People" },
];

function GroupSizeUi({ onSelectedOption }: { onSelectedOption: (v: string) => void }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
      {SelectTravelesList.map((item) => (
        <div
          key={item.id}
          className="p-4 border rounded-2xl bg-white hover:shadow cursor-pointer"
          onClick={() => onSelectedOption(`${item.title}: ${item.people}`)}
        >
          <h2 className="text-2xl">{item.icon}</h2>
          <h3 className="font-semibold">{item.title}</h3>
          <p className="text-sm opacity-80">{item.desc}</p>
        </div>
      ))}
    </div>
  );
}

export default GroupSizeUi;
