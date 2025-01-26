export type Rating = "⭐" |"⭐⭐" |"⭐⭐⭐" |"⭐⭐⭐⭐" |"⭐⭐⭐⭐⭐";

export type DbZoo = {
  id: number;
  name: string;
  desc: string;
  rating: Rating;
}

export interface MythicalZoo extends DbZoo {
  creatures: Creature[];
  visitors: Visitor[];
  facilities: Facility[];
}

export interface Creature {
  id: number;
  type: "🐉" | "🦄" | "🐲" | "🧜‍♀️" | "🦅" | "👹" | "🐍" | "🌳";
  name: string;
  habitat: "🌋" | "🌳" | "🏖️" | "🏔️" | "🌌" | "🌑" | "⛰️" | "🏰";
  diet: "🔥" | "🌟" | "🐀" | "🥩" | "🌿" | "🐟" | "🍶" | "🍃";
  magicLevel: number;
  specialAbilities: string[];
}

export interface Visitor {
  id: number;
  name: string;
  type: "🧙" | "🦸" | "👸" | "🧝";
  ticketType: "🎫 Standard" | "👑 VIP";
  favoriteCreatures: number[];
}

export interface Facility {
  id: number;
  name: string;
  type: "🍴" | "🎢" | "🛍️" | "🎥" | "🏞️" | "🎭";
  description: string;
  offers: string[];
}
