import {TreasureMysteryCard} from "./TreasureMysteryCard/TreasureMysteryCard";
import {IGame} from "@shared/types/Game/Game";
import {ICharacter} from "@shared/types/Game/Characters/Character";

export class OldMap extends TreasureMysteryCard {
    constructor(game: IGame) {
        super(game, "old Map", "stara mapa", false, "", 0);
    }

    triggerDrawEffect(drawer: ICharacter) {
        this._game.characterService.incrDeterminationAllCharacters(1, this._namePL);
    }
}
