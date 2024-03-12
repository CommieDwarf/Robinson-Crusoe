import {GatherAdventureCard} from "./GatherAdventureCard/GatherAdventureCard";
import {IAdventureCard} from "@shared/types/Game/AdventureService/AdventureCard";
import {IGame} from "@shared/types/Game/Game";
import {ADVENTURE_CARD_GATHER} from "@shared/types/Game/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";


export class Shortage extends GatherAdventureCard implements IAdventureCard {
    protected _eventNamePL = "";

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_GATHER.SHORTAGE,
            "końcówka",
            false,
            game,
            "discard",
            ""
        );
    }

    resolveOption1(resolver: IPlayerCharacter) {
        const tile = this.getTile();
        const side = this.getSide();
        this._game.tileService.gather(side, tile.id, this._namePL);
        tile.depleteResource(side, this._namePL);
    }
}
