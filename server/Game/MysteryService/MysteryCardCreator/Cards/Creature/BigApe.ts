import { CreatureMysteryCard } from "./CreatureMysteryCard/CreatureMysteryCard";
import { IMysteryCard } from "../../../../../../interfaces/MysteryService/MysteryCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ICharacter } from "../../../../../../interfaces/Characters/Character";

export class BigApe extends CreatureMysteryCard implements IMysteryCard {
  constructor(game: IGame) {
    super(game, "big ape", "wielka małpa", true, "nocny demon");
  }

  triggerDrawEffect(drawer: ICharacter) {
    this.shuffleIntoEventDeck();
  }

  triggerEventEffect() {
    //TODO: implement custom beast fight.
  }
}
