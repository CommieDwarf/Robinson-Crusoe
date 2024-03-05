import {GatherAdventureCard} from "./GatherAdventureCard/GatherAdventureCard";
import {IAdventureCard} from "../../../../../types/AdventureService/AdventureCard";
import {IGame} from "../../../../../types/Game";
import {ADVENTURE_CARD_GATHER} from "../../../../../types/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "../../../../../types/Characters/PlayerCharacter";

import {ITile} from "../../../../../types/TileService/ITile";

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

    option1(resolver: IPlayerCharacter) {
        this.shuffleIntoEventDeck();
        const tile = this.getTile();
        const foodSide = tile.getSideByResource("food");
        if (foodSide) {
            tile.tileResourceService?.addModifierBySide(foodSide, this._namePL)
            this._tile = tile;
        }

    }

    triggerEventEffect() {
        if (this._tile) {
            const side = this._tile.getSideByResource("food");
            if (side) {
                if (this._tile.canResourceBeDepleted(side)) {
                    this._tile.depleteResource(side, this._eventNamePL);
                    this._tile.tileResourceService?.removeModifier(side, this._eventNamePL)
                }

            }
        }
    }
}
