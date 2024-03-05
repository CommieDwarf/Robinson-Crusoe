import {IAdventureCard} from "../../../../../types/AdventureService/AdventureCard";
import {IGame} from "../../../../../types/Game";
import {ADVENTURE_CARD_GATHER} from "../../../../../types/AdventureService/ADVENTURE_CARD";
import {GatherAdventureCard} from "./GatherAdventureCard/GatherAdventureCard";
import {ITile} from "../../../../../types/TileService/ITile";
import {IPlayerCharacter} from "../../../../../types/Characters/PlayerCharacter";

export class AfterTheHurricane
    extends GatherAdventureCard
    implements IAdventureCard {
    protected _eventNamePL = "kolejny huragan";
    private _tile: ITile | null = null;

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_GATHER.AFTER_THE_HURRICANE,
            "po huraganie",
            false,
            game,
            "shuffle",
            ""
        );
    }

    option1(resolver: IPlayerCharacter) {
        this._game.resourceService.addBasicResourceToFuture("wood", 2, this._namePL);
        const tile = this.getTile();
        tile.setTileModifier("timeConsumingAction", this._namePL);
        this._tile = tile;
    }

    triggerEventEffect() {
        if (this._tile) {
            this._tile.setTileModifier("flipped", this._eventNamePL);
        }
    }
}
