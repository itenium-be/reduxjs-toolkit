import { MythicalZoo, Rating } from "../MythicalZoo";
import { creatures } from "./creatures";
import { facilities } from "./facilities";
import { visitors } from "./visitors";

function getRandomElements<T>(array: T[], count: number): T[] {
  return array.sort(() => 0.5 - Math.random()).slice(0, count);
}

const randomStars = () => {
  const stars = Math.floor(Math.random() * 5) + 1;
  return "⭐".repeat(stars) as Rating;
};

const zooNames = [
  "The Beastarium",
  "Fantastic Beasts Reserve",
  "Magical Menagerie",
  "Zoocropolis",
  "The Midnight Zoo",
];

const zooDescs = [
  "A wild collection of ferocious and magical creatures ready to amaze and terrify!",
  "A sanctuary for rare and mythical creatures, where magic comes to life!",
  "A bustling hub of enchantment, home to the most extraordinary magical beasts.",
  "A vibrant city of mythical creatures, from towering giants to mischievous sprites!",
  "Step into the shadows and explore a mysterious world of nocturnal wonders.",
];

export const zoos: MythicalZoo[] = zooNames.map((name, index) => ({
  id: index + 1,
  name,
  desc: zooDescs[index],
  rating: randomStars(),
  creatures: getRandomElements(creatures, Math.min(3, creatures.length)),
  visitors: getRandomElements(visitors, Math.min(3, visitors.length)),
  facilities: getRandomElements(facilities, Math.min(3, facilities.length)),
}));
