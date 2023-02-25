import { TrapMysteryCard } from "./TrapMysteryCard/TrapMysteryCard";
import { IMysteryCard } from "../../../../../../interfaces/MysteryService/MysteryCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ICharacter } from "../../../../../../interfaces/Characters/Character";

export class Confused extends TrapMysteryCard implements IMysteryCard {
  constructor(game: IGame) {
    super(game, "confused", "otumaniony");
  }

  triggerDrawEffect(drawer: ICharacter) {
    //TODO: implement reroll success on character.
  }
}
