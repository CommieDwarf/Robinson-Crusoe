import {CreatureMysteryCard} from "./CreatureMysteryCard/CreatureMysteryCard";
import {IMysteryCard} from "../../../../../../interfaces/MysteryService/MysteryCard";
import {IGame} from "../../../../../../interfaces/Game";
import {ICharacter} from "../../../../../../interfaces/Characters/Character";

export class UnleashedBeast
    extends CreatureMysteryCard
    implements IMysteryCard {
  constructor(game: IGame) {
    super(game, "unleashed beast", "bestia na wolności", false, "");
  }

  triggerDrawEffect(drawer: ICharacter) {
    if (this._game.beastService.deckCount > 0) {
      this._game.beastService.removeBeastFromDeck();
    }
  }
}
