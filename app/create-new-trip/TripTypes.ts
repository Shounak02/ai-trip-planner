// app/create-new-trip/TripTypes.ts
export type TripInfo = {
  budget?: string;
  destination?: string;
  duration?: string;
  group_size?: string;
  origin?: string;
  hotels?: {
    hotel_name: string;
    hotel_address: string;
    price_per_night?: string;
    rating?: string;
    description?: string;
    hotel_image_url?: string;
  }[];
  itinerary?: {
    day: number;
    day_plan: string;
    activities?: {
      place_name: string;
      place_address: string;
      "place details"?: string;
      ticket_pricing?: string;
      time_travel_each_location?: string;
      place_image_url?: string;
    }[];
    hotels?: {
      hotel_name: string;
      hotel_address: string;
      price_per_night?: string;
      rating?: string;
      description?: string;
      hotel_image_url?: string;
    }[];
  }[];
};
