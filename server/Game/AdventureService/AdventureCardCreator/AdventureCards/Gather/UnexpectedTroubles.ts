import {GatherAdventureCard} from "./GatherAdventureCard/GatherAdventureCard";
import {IAdventureCard} from "../../../../../../interfaces/AdventureService/AdventureCard";
import {IGame} from "../../../../../../interfaces/Game";
import {ADVENTURE_CARD_GATHER} from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "../../../../../../interfaces/Characters/PlayerCharacter";

export class UnexpectedTroubles
    extends GatherAdventureCard
    implements IAdventureCard {
    protected _eventNamePL = "";

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_GATHER.UNEXPECTED_TROUBLES,
            "niespodziewane trudności",
            false,
            game,
            "discard",
            ""
        );
    }

    option1(resolver: IPlayerCharacter) {
        const tileId = this._game.adventureService.currentAdventure?.relatedActionInfo?.tileId;
        if (tileId !== undefined) {
            this._game.tileService.getTile(tileId).setTileModifier("terrainDepleted", this._namePL);
        } else {
            throw new Error("Can't get tile id from currentAdventure");
        }
    }
}
