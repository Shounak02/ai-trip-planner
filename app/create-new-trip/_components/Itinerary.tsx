"use client";
import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { TripInfo } from "./ChatBox";


interface ItineraryProps {
  tripDetail?: TripInfo|null;
}

function Itinerary({ tripDetail }: ItineraryProps) {
  if (!tripDetail) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        No trip data available. Plan a trip in the chat first!
      </div>
    );
  }

  const data = tripDetail.itinerary?.map((day: any, idx: number) => ({
    title: `Day ${day.day}`,
    content: (
      <div>
        <p className="mb-2 font-semibold text-gray-700">Plan:</p>
        <p className="mb-4 text-sm text-gray-600">{day.day_plan}</p>

        {day.activities?.map((activity: any, aidx: number) => (
          <div
            key={aidx}
            className="mb-4 p-3 border rounded-lg bg-gray-50"
          >
            <h5 className="font-semibold">{activity.place_name}</h5>
            <p>{activity["place details"]}</p>
            <p>Address: {activity.place_address}</p>
            <p>Ticket: {activity.ticket_pricing}</p>
            <p>Travel Time: {activity.time_travel_each_location}</p>
            {activity.place_image_url && (
              <img
                src={activity.place_image_url}
                alt={activity.place_name}
                className="mt-2 w-full h-32 object-cover rounded-lg"
              />
            )}
          </div>
        ))}

        {day.hotels?.map((hotel: any, hidx: number) => (
          <div
            key={hidx}
            className="mb-4 p-4 border rounded-lg shadow-sm w-full"
          >
            <h4 className="font-semibold text-gray-700">{hotel.hotel_name}</h4>
            <p>{hotel.hotel_address}</p>
            <p>Price per night: {hotel.price_per_night}</p>
            <p>Rating: {hotel.rating}</p>
            <p>{hotel.description}</p>
            {hotel.hotel_image_url && (
              <img
                src={hotel.hotel_image_url}
                alt={hotel.hotel_name}
                className="mt-2 w-full h-48 object-cover rounded-lg"
              />
            )}
          </div>
        ))}
      </div>
    ),
  }));

  return (
    <div className="relative w-full h-[83vh] overflow-auto">
      <Timeline data={data || []} />
    </div>
  );
}

export default Itinerary;
