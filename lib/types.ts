// ─── Shared Types ───────────────────────────────────────────────────────────
// Single source of truth for all trip-related types across the app.

export interface GeoCoordinates {
  latitude: number;
  longitude: number;
}

export interface HotelInfo {
  hotel_name: string;
  hotel_address: string;
  price_per_night: string;
  hotel_image_url: string;
  geo_coordinates: GeoCoordinates;
  rating: number;
  description: string;
}

export interface ActivityInfo {
  place_name: string;
  place_details: string;
  place_image_url: string;
  geo_coordinates: GeoCoordinates;
  place_address: string;
  ticket_pricing: string;
  time_travel_each_location: string;
  best_time_to_visit: string;
}

export interface DayPlan {
  day: number;
  day_plan: string;
  best_time_to_visit_day: string;
  activities: ActivityInfo[];
}

export interface TripPlan {
  origin: string;
  destination: string;
  duration: string;
  budget: string;
  group_size: string;
  travel_styles: string[];
  hotel_preferences: string[];
  additional_notes: string;
  hotels: HotelInfo[];
  itinerary: DayPlan[];
}

// ─── Wizard Form Data ───────────────────────────────────────────────────────

export interface TripFormData {
  origin: string;
  destination: string;
  duration: number; // days
  groupType: string;
  budget: string;
  travelStyles: string[];
  hotelStarRating: string;
  hotelAmenities: string[];
  hotelType: string;
  additionalNotes: string;
}

export const DEFAULT_FORM_DATA: TripFormData = {
  origin: "",
  destination: "",
  duration: 3,
  groupType: "",
  budget: "",
  travelStyles: [],
  hotelStarRating: "",
  hotelAmenities: [],
  hotelType: "",
  additionalNotes: "",
};

// ─── Option Constants ───────────────────────────────────────────────────────

export const GROUP_TYPES = [
  { id: "solo", title: "Solo", desc: "Traveling alone", icon: "🧍", people: "1 Person" },
  { id: "couple", title: "Couple", desc: "Romantic getaway", icon: "👫", people: "2 People" },
  { id: "family", title: "Family", desc: "Fun for everyone", icon: "👨‍👩‍👧‍👦", people: "3–5 People" },
  { id: "friends", title: "Friends", desc: "Squad adventure", icon: "🧑‍🤝‍🧑", people: "5–10 People" },
];

export const BUDGET_OPTIONS = [
  { id: "budget", title: "Budget", desc: "Stay cost-conscious", icon: "💸", color: "from-emerald-500/20 to-emerald-600/10 border-emerald-500/30" },
  { id: "moderate", title: "Moderate", desc: "Balance comfort & cost", icon: "💰", color: "from-amber-500/20 to-amber-600/10 border-amber-500/30" },
  { id: "luxury", title: "Luxury", desc: "No limits, full comfort", icon: "💎", color: "from-violet-500/20 to-violet-600/10 border-violet-500/30" },
];

export const TRAVEL_STYLES = [
  { id: "adventure", label: "Adventure", icon: "🏔️" },
  { id: "cultural", label: "Cultural", icon: "🏛️" },
  { id: "food", label: "Food & Cuisine", icon: "🍜" },
  { id: "nightlife", label: "Nightlife", icon: "🌃" },
  { id: "relaxation", label: "Relaxation", icon: "🧘" },
  { id: "sightseeing", label: "Sightseeing", icon: "📸" },
  { id: "shopping", label: "Shopping", icon: "🛍️" },
  { id: "nature", label: "Nature & Wildlife", icon: "🌿" },
  { id: "beach", label: "Beach & Water", icon: "🏖️" },
  { id: "historical", label: "Historical", icon: "🏰" },
];

export const HOTEL_STAR_RATINGS = [
  { id: "any", label: "Any" },
  { id: "3-star", label: "3-Star" },
  { id: "4-star", label: "4-Star" },
  { id: "5-star", label: "5-Star" },
];

export const HOTEL_AMENITIES = [
  { id: "wifi", label: "Free WiFi", icon: "📶" },
  { id: "pool", label: "Pool", icon: "🏊" },
  { id: "gym", label: "Gym", icon: "💪" },
  { id: "spa", label: "Spa", icon: "💆" },
  { id: "parking", label: "Parking", icon: "🅿️" },
  { id: "breakfast", label: "Breakfast", icon: "🥐" },
  { id: "airport-shuttle", label: "Airport Shuttle", icon: "🚐" },
  { id: "pet-friendly", label: "Pet Friendly", icon: "🐾" },
];

export const HOTEL_TYPES = [
  { id: "any", label: "No Preference" },
  { id: "hotel", label: "Hotel" },
  { id: "resort", label: "Resort" },
  { id: "boutique", label: "Boutique" },
  { id: "hostel", label: "Hostel" },
  { id: "airbnb", label: "Airbnb / Vacation Rental" },
];

// ─── Wizard Steps Config ────────────────────────────────────────────────────

export const WIZARD_STEPS = [
  { id: 0, title: "Destination", icon: "📍" },
  { id: 1, title: "Duration", icon: "📅" },
  { id: 2, title: "Group", icon: "👥" },
  { id: 3, title: "Budget", icon: "💰" },
  { id: 4, title: "Style", icon: "🎨" },
  { id: 5, title: "Hotels", icon: "🏨" },
  { id: 6, title: "Extras", icon: "✨" },
  { id: 7, title: "Review", icon: "🚀" },
];
