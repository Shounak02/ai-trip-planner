import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// ─── Create a new trip ──────────────────────────────────────────────────────
export const CreateTripDetail = mutation({
  args: {
    tripId: v.string(),
    uid: v.id("UserTable"),
    tripDetail: v.any(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.insert("TripDetailTable", {
      tripDetail: args.tripDetail,
      tripId: args.tripId,
      uid: args.uid,
      createdAt: Date.now(),
    });
    return result;
  },
});

// ─── Update an existing trip ────────────────────────────────────────────────
export const UpdateTripDetail = mutation({
  args: {
    id: v.id("TripDetailTable"),
    tripDetail: v.any(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      tripDetail: args.tripDetail,
    });
  },
});

// ─── Get all trips for a user ───────────────────────────────────────────────
export const GetUserTrips = query({
  args: {
    uid: v.id("UserTable"),
  },
  handler: async (ctx, args) => {
    const trips = await ctx.db
      .query("TripDetailTable")
      .withIndex("by_uid", (q) => q.eq("uid", args.uid))
      .order("desc")
      .collect();
    return trips;
  },
});

// ─── Get a single trip by tripId ────────────────────────────────────────────
export const GetTripById = query({
  args: {
    tripId: v.string(),
  },
  handler: async (ctx, args) => {
    const trip = await ctx.db
      .query("TripDetailTable")
      .withIndex("by_tripId", (q) => q.eq("tripId", args.tripId))
      .first();
    return trip;
  },
});

// ─── Delete a trip ──────────────────────────────────────────────────────────
export const DeleteTrip = mutation({
  args: {
    tripId: v.id("TripDetailTable"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.tripId);
  },
});
