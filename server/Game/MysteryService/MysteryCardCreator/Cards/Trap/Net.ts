import { TrapMysteryCard } from "./TrapMysteryCard/TrapMysteryCard";
import { IMysteryCard } from "../../../../../../interfaces/MysteryService/MysteryCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ICharacter } from "../../../../../../interfaces/Characters/Character";

export class Net extends TrapMysteryCard implements IMysteryCard {
  constructor(game: IGame) {
    super(game, "net", "sieć");
  }

  triggerDrawEffect(drawer: ICharacter) {
    //TODO: implement stop drawing cards.
    //TODO: implement night outside the camp
  }
}
