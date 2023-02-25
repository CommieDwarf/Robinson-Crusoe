import { TrapMysteryCard } from "./TrapMysteryCard/TrapMysteryCard";
import { IMysteryCard } from "../../../../../../interfaces/MysteryService/MysteryCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ICharacter } from "../../../../../../interfaces/Characters/Character";

export class Collapse extends TrapMysteryCard implements IMysteryCard {
  constructor(game: IGame) {
    super(game, "collapse", "zapadło się");
  }

  triggerDrawEffect(drawer: ICharacter) {
    //TODO: implement stop drawing cards
  }
}
