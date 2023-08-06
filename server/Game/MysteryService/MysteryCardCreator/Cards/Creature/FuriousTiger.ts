import { CreatureMysteryCard } from "./CreatureMysteryCard/CreatureMysteryCard";
import { IMysteryCard } from "../../../../../../interfaces/MysteryService/MysteryCard";
import { IGame } from "../../../../../../interfaces/Game";
import { IPlayerCharacter } from "../../../../../../interfaces/Characters/Character";

export class FuriousTiger extends CreatureMysteryCard implements IMysteryCard {
  constructor(game: IGame) {
    super(game, "furious tiger", "rozszalały tygrys", false, "");
  }

  triggerDrawEffect(drawer: IPlayerCharacter) {
    //TODO: implement custom beast fight
  }
}
