import { WeatherCubeSide } from "../../../../../interfaces/RollDice/RollDice";

const snow: WeatherCubeSide[] = [
  "snow",
  "snow",
  "doubleSnow",
  "doubleSnow",
  "doubleRain",
  "doubleRain",
];

const rain: WeatherCubeSide[] = [
  "doubleRain",
  "doubleRain",
  "rain",
  "rain",
  "rain",
  "snow",
];

const animals: WeatherCubeSide[] = [
  "beast",
  "palisade",
  "palisade",
  "food",
  "blank",
  "blank",
];

export const weather = { snow, rain, animals };
