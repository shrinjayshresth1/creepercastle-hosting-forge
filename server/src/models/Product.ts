import { Schema, model, Document } from "mongoose";

/**
 * Unified Product schema covering all hosting plan categories:
 *   minecraft | performance | vps | performance-vps | discord-bot
 *
 * Fields that don't apply to a category are simply omitted (sparse).
 * `specs` is a flexible key→value map so each category can store
 * its own spec labels without separate collections.
 */

export interface IProduct extends Document {
  // ── Identity ─────────────────────────────────────────────────────────────
  slug: string;           // URL-safe unique id, e.g. "minecraft-nether-storm"
  category: string;       // "minecraft" | "performance" | "vps" | "performance-vps" | "discord-bot"
  name: string;
  description?: string;

  // ── Pricing ───────────────────────────────────────────────────────────────
  price: number | null;   // null = custom/contact us
  pricePer: string;       // "month"

  // ── Display ───────────────────────────────────────────────────────────────
  highlighted: boolean;   // "Most Popular" badge
  badge?: string;         // optional custom badge text e.g. "Best Value"
  order: number;          // display sort order within category
  logoUrl?: string;       // path for VPS plan logos
  isCustom?: boolean;     // whether this is a "contact us" custom plan

  // ── Specs ─────────────────────────────────────────────────────────────────
  specs: Record<string, string>;  // e.g. { ram: "4GB", cpu: "100% CPU", storage: "40GB SSD" }

  // ── Feature list ─────────────────────────────────────────────────────────
  features: string[];

  // ── Availability ──────────────────────────────────────────────────────────
  locations: string[];
  active: boolean;        // false = hidden from frontend without deletion

  // ── Timestamps ────────────────────────────────────────────────────────────
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    slug:        { type: String, required: true, unique: true, trim: true },
    category:    {
      type: String,
      required: true,
      enum: ["minecraft", "performance", "vps", "performance-vps", "discord-bot"],
    },
    name:        { type: String, required: true },
    description: { type: String },
    price:       { type: Number, default: null },
    pricePer:    { type: String, default: "month" },
    highlighted: { type: Boolean, default: false },
    badge:       { type: String },
    order:       { type: Number, default: 0 },
    logoUrl:     { type: String },
    isCustom:    { type: Boolean, default: false },
    specs:       { type: Map, of: String, default: {} },
    features:    { type: [String], default: [] },
    locations:   { type: [String], default: [] },
    active:      { type: Boolean, default: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_doc: unknown, ret: Record<string, unknown>) => {
        ret.id = ret._id;
        const mutable = ret as { _id?: unknown; __v?: unknown; specs?: unknown };
        delete mutable._id;
        delete mutable.__v;
        // Convert Map → plain object for JSON serialisation
        if (mutable.specs instanceof Map) {
          mutable.specs = Object.fromEntries(mutable.specs as Map<string, unknown>);
        }
      },
    },
  }
);

// Index for fast category lookups
ProductSchema.index({ category: 1, order: 1 });

export const Product = model<IProduct>("Product", ProductSchema);
