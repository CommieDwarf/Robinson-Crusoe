import {GatherAdventureCard} from "./GatherAdventureCard/GatherAdventureCard";
import {IAdventureCard} from "@shared/types/Game/AdventureService/AdventureCard";
import {IGame} from "@shared/types/Game/Game";
import {ADVENTURE_CARD_GATHER} from "@shared/types/Game/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";

export class UnexpectedTroubles
    extends GatherAdventureCard
    implements IAdventureCard {

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_GATHER.UNEXPECTED_TROUBLES,
            "",
            false,
            game,
            "discard",
            ""
        );
    }

    resolveOption1(resolver: IPlayerCharacter) {
        const tileId = this._game.adventureService.currentAdventure?.relatedActionInfo?.tileId;
        if (tileId !== undefined) {
            this._game.tileService.getTile(tileId).setTileModifier("terrainDepleted", this._name);
        } else {
            throw new Error("Can't get tile id from currentAdventure");
        }
    }
}
