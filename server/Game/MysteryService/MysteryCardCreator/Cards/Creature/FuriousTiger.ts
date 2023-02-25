import { CreatureMysteryCard } from "./CreatureMysteryCard/CreatureMysteryCard";
import { IMysteryCard } from "../../../../../../interfaces/MysteryService/MysteryCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ICharacter } from "../../../../../../interfaces/Characters/Character";

export class FuriousTiger extends CreatureMysteryCard implements IMysteryCard {
  constructor(game: IGame) {
    super(game, "furious tiger", "rozszalały tygrys", false, "");
  }

  triggerDrawEffect(drawer: ICharacter) {
    //TODO: implement custom beast fight
  }
}
