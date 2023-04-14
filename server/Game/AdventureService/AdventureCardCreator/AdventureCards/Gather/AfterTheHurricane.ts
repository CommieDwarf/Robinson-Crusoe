import {IAdventureCard} from "../../../../../../interfaces/AdventureService/AdventureCard";
import {IGame} from "../../../../../../interfaces/Game";
import {ADVENTURE_CARD_GATHER} from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import {GatherAdventureCard} from "./GatherAdventureCard/GatherAdventureCard";
import {ICharacter} from "../../../../../../interfaces/Characters/Character";
import {ITile} from "../../../../../../interfaces/TileService/ITile";

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

    option1(resolver: ICharacter) {
        this._game.resourceService.addBasicResourceToOwned("wood", 2, this._namePL);
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
