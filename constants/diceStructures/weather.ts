import { WeatherDiceSide } from "../../interfaces/RollDice/RollDice";

const winter: WeatherDiceSide[] = [
  "snow",
  "snow",
  "doubleSnow",
  "doubleSnow",
  "doubleRain",
  "doubleRain",
];

const rain: WeatherDiceSide[] = [
  "doubleRain",
  "doubleRain",
  "rain",
  "rain",
  "rain",
  "snow",
];

const animals: WeatherDiceSide[] = [
  "beast",
  "palisade",
  "palisade",
  "food",
  "blank",
  "blank",
];

export const weather = { winter, rain, animals };
