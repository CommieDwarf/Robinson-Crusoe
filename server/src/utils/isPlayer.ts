import {ActionDice, WeatherDice} from "@shared/types/Game/RollDice/RollDice";
import {IUser} from "../shared/types/User/IUser";
import {IPlayer} from "@shared/types/Game/PlayerService/Player";

export function isPlayer(candidate: IUser | IPlayer): candidate is IPlayer {
    return "assignedCharacter" in candidate;
}

