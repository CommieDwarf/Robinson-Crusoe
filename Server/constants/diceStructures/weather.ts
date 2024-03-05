import { WeatherDiceSide } from "../../../interfaces/RollDice/RollDice";

const winter: WeatherDiceSide[] = [
  "snow",
  "snow",
  "double snow",
  "double snow",
  "double rain",
  "double rain",
];

const rain: WeatherDiceSide[] = [
  "double rain",
  "double rain",
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
