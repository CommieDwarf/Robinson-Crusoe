import { TreasureMysteryCard } from "./TreasureMysteryCard/TreasureMysteryCard";
import { ITreasureMysteryCard } from "../../../../../../interfaces/MysteryService/MysteryCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ICharacter } from "../../../../../../interfaces/Characters/Character";

export class Gold extends TreasureMysteryCard implements ITreasureMysteryCard {
  constructor(game: IGame) {
    super(game, "gold", "złoto!", false, "", 0);
  }
}
