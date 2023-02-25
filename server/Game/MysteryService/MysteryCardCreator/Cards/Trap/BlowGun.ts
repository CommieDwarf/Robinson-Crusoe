import { CreatureMysteryCard } from "../Creature/CreatureMysteryCard/CreatureMysteryCard";
import { IMysteryCard } from "../../../../../../interfaces/MysteryService/MysteryCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ICharacter } from "../../../../../../interfaces/Characters/Character";
import { TrapMysteryCard } from "./TrapMysteryCard/TrapMysteryCard";

export class BlowGun extends TrapMysteryCard implements IMysteryCard {
  constructor(game: IGame) {
    super(game, "blow gun", "dmuchawka");
  }

  triggerDrawEffect(drawer: ICharacter) {
    //TODO: implement 1 pawn off action.
  }
}
