import {GatherAdventureCard} from "./GatherAdventureCard/GatherAdventureCard";
import {IAdventureCard} from "@shared/types/Game/AdventureService/AdventureCard";
import {IGame} from "@shared/types/Game/Game";
import {ADVENTURE_CARD_GATHER} from "@shared/types/Game/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";

import {ITile} from "@shared/types/Game/TileService/ITile";

export class NewFlock extends GatherAdventureCard implements IAdventureCard {
    protected _eventNamePL = "wszystko przepadło";
    private _tile: ITile | null = null;

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_GATHER.NEW_FLOCK,
            "nowe stado",
            false,
            game,
            "shuffle",
            ""
        );
    }

    resolveOption1(resolver: IPlayerCharacter) {
        this.shuffleIntoEventDeck();
        const tile = this.getTile();
        const foodSide = tile.getSideByResource("food");
        if (foodSide) {
            tile.tileResourceService?.addResourceBoostBySide(foodSide, this._namePL)
            this._tile = tile;
        }

    }

    triggerEventEffect() {
        if (this._tile) {
            const side = this._tile.getSideByResource("food");
            if (side) {
                if (this._tile.canResourceBeDepleted(side)) {
                    this._tile.depleteResource(side, this._eventNamePL);
                    this._tile.tileResourceService?.removeBoost(side, this._eventNamePL)
                }

            }
        }
    }
}
