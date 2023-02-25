import { TreasureMysteryCard } from "./TreasureMysteryCard/TreasureMysteryCard";
import { ITreasureMysteryCard } from "../../../../../../interfaces/MysteryService/MysteryCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ICharacter } from "../../../../../../interfaces/Characters/Character";

export class Sabre extends TreasureMysteryCard implements ITreasureMysteryCard {
  constructor(game: IGame) {
    super(game, "sabre", "szabla", false, "", Infinity);
  }

  use(user: ICharacter | null) {
    //todo: implement
  }
}
