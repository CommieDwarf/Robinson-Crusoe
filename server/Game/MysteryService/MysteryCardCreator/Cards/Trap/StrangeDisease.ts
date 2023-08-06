import { TrapMysteryCard } from "./TrapMysteryCard/TrapMysteryCard";
import { IMysteryCard } from "../../../../../../interfaces/MysteryService/MysteryCard";
import { IGame } from "../../../../../../interfaces/Game";
import { IPlayerCharacter } from "../../../../../../interfaces/Characters/Character";

export class StrangeDisease extends TrapMysteryCard implements IMysteryCard {
  constructor(game: IGame) {
    super(game, "strange disease", "dziwne schorzenie");
  }

  triggerDrawEffect(drawer: IPlayerCharacter) {
    //TODO: implement
  }
}
