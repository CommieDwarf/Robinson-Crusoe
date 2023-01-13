import { ActionDice, WeatherDice } from "../interfaces/RollDice/RollDice";

export function isActionDice(
  dice: ActionDice | WeatherDice
): dice is ActionDice {
  return dice === "success" || dice === "mystery" || dice === "hurt";
}