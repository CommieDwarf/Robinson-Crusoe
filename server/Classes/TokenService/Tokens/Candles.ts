import { Token } from "./Token/Token";
import { IGame } from "../../../../interfaces/Game";
import { IPlayerCharacter } from "../../../../interfaces/Characters/PlayerCharacter";
import { HelperPawn } from "../../PawnService/Pawn/HelperPawn";
import sleep from "../../../../utils/sleep";

export class Candles extends Token {
  constructor(game: IGame, character: IPlayerCharacter) {
    super(
      game,
      character,
      "candles",
      "Jednorazowy brązowy pionek dodatkowy do Akcji Budowy"
    );
  }

  use() {
    const pawnService = this._character.pawnService;
    const pawn = new HelperPawn(this._character, true, "build");
    pawnService.addPawn(pawn);
    pawnService.copyPawnToFreePawns(pawn.draggableId);
    this.discard();
  }

  autoDiscard() {}
}
