import {
  AnimalDiceSide,
  RainDiceSide,
  WinterDiceSide,
} from "../../interfaces/RollDice/RollDice";

const winter: WinterDiceSide[] = [
  "snow",
  "snow",
  "doubleSnow",
  "doubleSnow",
  "doubleRain",
  "doubleRain",
];

const rain: RainDiceSide[] = [
  "doubleRain",
  "doubleRain",
  "rain",
  "rain",
  "rain",
  "snow",
];

const animals: AnimalDiceSide[] = [
  "beast",
  "palisade",
  "palisade",
  "food",
  "blank",
  "blank",
];

export const weather = { winter, rain, animals };
