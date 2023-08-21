import {TrapMysteryCard} from "./TrapMysteryCard/TrapMysteryCard";
import {IMysteryCard} from "../../../../../../interfaces/MysteryService/MysteryCard";
import {IGame} from "../../../../../../interfaces/Game";
import { IPlayerCharacter } from "../../../../../../interfaces/Characters/PlayerCharacter";

export class TrapDoor extends TrapMysteryCard implements IMysteryCard {
  constructor(game: IGame) {
    super(game, "trap door", "zapadnia");
  }

  triggerDrawEffect(drawer: IPlayerCharacter) {
    this._game.mysteryService.dropTreasures();
    this._game.chatLog.addMessage("Utracono obecnie zdobyte skarby", "red", this._namePL);
  }
}
