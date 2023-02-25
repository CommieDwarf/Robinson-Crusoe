import { IMysteryCard } from "../../../../../../interfaces/MysteryService/MysteryCard";
import { IGame } from "../../../../../../interfaces/Game";
import { CreatureMysteryCard } from "./CreatureMysteryCard/CreatureMysteryCard";

export class AShinyJewel extends CreatureMysteryCard implements IMysteryCard {
  constructor(game: IGame) {
    super(game, "a shiny jewel", "wielki klejnot", false, "");
  }

  triggerDrawEffect() {
    //TODO: implement
  }
}
