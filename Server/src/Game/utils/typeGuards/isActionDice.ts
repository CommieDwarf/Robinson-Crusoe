import {ActionDice, WeatherDice} from "../../types/RollDice/RollDice";

export function isActionDice(
    dice: ActionDice | WeatherDice
): dice is ActionDice {
    return dice === "success" || dice === "mystery" || dice === "hurt";
}
