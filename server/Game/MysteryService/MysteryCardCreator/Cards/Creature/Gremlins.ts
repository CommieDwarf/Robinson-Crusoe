import { CreatureMysteryCard } from "./CreatureMysteryCard/CreatureMysteryCard";
import { IMysteryCard } from "../../../../../../interfaces/MysteryService/MysteryCard";
import { IGame } from "../../../../../../interfaces/Game";
import { IPlayerCharacter } from "../../../../../../interfaces/Characters/Character";

export class Gremlins extends CreatureMysteryCard implements IMysteryCard {
  constructor(game: IGame) {
    super(game, "gremlins", "gremliny", true, "gremliny was wytropiły");
  }

  triggerDrawEffect(drawer: IPlayerCharacter) {
    //TODO: implement custom beast fight;
    this.shuffleIntoEventDeck();
  }

  triggerEventEffect() {
    //TODO:  implement custom beast fight;
    this.shuffleIntoEventDeck();
  }
}
