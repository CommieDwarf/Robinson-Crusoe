import { ActionDice, WeatherDice } from "@shared/types/Game/RollDice/RollDice";

export function isActionDice(
	dice: ActionDice | WeatherDice
): dice is ActionDice {
	return dice === "success" || dice === "mystery" || dice === "hurt";
}
