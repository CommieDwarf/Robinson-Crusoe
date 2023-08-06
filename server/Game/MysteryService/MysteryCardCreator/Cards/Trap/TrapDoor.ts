import {TrapMysteryCard} from "./TrapMysteryCard/TrapMysteryCard";
import {IMysteryCard} from "../../../../../../interfaces/MysteryService/MysteryCard";
import {IGame} from "../../../../../../interfaces/Game";
import {IPlayerCharacter} from "../../../../../../interfaces/Characters/Character";

export class TrapDoor extends TrapMysteryCard implements IMysteryCard {
  constructor(game: IGame) {
    super(game, "trap door", "zapadnia");
  }

  triggerDrawEffect(drawer: IPlayerCharacter) {
    //TODO: discard all treasures gained by this action.
  }
}
