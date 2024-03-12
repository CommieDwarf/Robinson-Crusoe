import {GatherAdventureCard} from "./GatherAdventureCard/GatherAdventureCard";
import {IAdventureCard} from "@shared/types/Game/AdventureService/AdventureCard";
import {IGame} from "@shared/types/Game/Game";
import {ADVENTURE_CARD_GATHER} from "@shared/types/Game/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";


export class SignsOfAPredator
    extends GatherAdventureCard
    implements IAdventureCard {
    protected _eventNamePL = "";

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_GATHER.SIGNS_OF_A_PREDATOR,
            "ślady drapieżnika",
            false,
            game,
            "discard",
            ""
        );
    }

    resolveOption1(resolver: IPlayerCharacter) {
        const tile = this.getTile();
        tile.setTileModifier("greaterDanger", this._namePL);
    }
}
