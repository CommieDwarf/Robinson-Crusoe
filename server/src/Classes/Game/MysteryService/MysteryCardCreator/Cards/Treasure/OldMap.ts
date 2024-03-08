import {TreasureMysteryCard} from "./TreasureMysteryCard/TreasureMysteryCard";
import {IGame} from "@shared/types/Game/Game";
import {ICharacter} from "@shared/types/Game/Characters/Character";
import {TREASURE_MYSTERY_CARD} from "@shared/types/Game/MysteryService/MYSTERY_CARD";

export class OldMap extends TreasureMysteryCard {
    constructor(game: IGame) {
        super(game, TREASURE_MYSTERY_CARD.OLD_MAP, "stara mapa", false, "", 0);
    }

    triggerDrawEffect(drawer: ICharacter) {
        this._game.characterService.incrDeterminationAllCharacters(1, this._namePL);
    }
}
