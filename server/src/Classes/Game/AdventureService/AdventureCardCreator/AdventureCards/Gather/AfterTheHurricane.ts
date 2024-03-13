import {IAdventureCard} from "@shared/types/Game/AdventureService/AdventureCard";
import {IGame} from "@shared/types/Game/Game";
import {ADVENTURE_CARD_GATHER} from "@shared/types/Game/AdventureService/ADVENTURE_CARD";
import {GatherAdventureCard} from "./GatherAdventureCard/GatherAdventureCard";
import {ITile} from "@shared/types/Game/TileService/ITile";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";

export class AfterTheHurricane
    extends GatherAdventureCard
    implements IAdventureCard {
    private _tile: ITile | null = null;

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_GATHER.AFTER_THE_HURRICANE,
            "another hurricane",
            false,
            game,
            "shuffle",
            ""
        );
    }

    resolveOption1(resolver: IPlayerCharacter) {
        this._game.resourceService.addBasicResourceToFuture("wood", 2, this._name);
        const tile = this.getTile();
        tile.setTileModifier("timeConsumingAction", this._name);
        this._tile = tile;
    }

    triggerEventEffect() {
        if (this._tile) {
            this._tile.setTileModifier("flipped", this._eventName);
        }
    }
}
