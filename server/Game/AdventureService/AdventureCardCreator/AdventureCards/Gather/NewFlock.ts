import {GatherAdventureCard} from "./GatherAdventureCard/GatherAdventureCard";
import {IAdventureCard} from "../../../../../../interfaces/AdventureService/AdventureCard";
import {IGame} from "../../../../../../interfaces/Game";
import {ADVENTURE_CARD_GATHER} from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import {ICharacter} from "../../../../../../interfaces/Characters/Character";
import {ITile} from "../../../../../../interfaces/TileService/ITile";

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

    option1(resolver: ICharacter) {
        this.shuffleIntoEventDeck();
        const tile = this.getTile();
        tile.tileResourceService?.addModifier(this.getSide(), this._namePL);
        this._tile = tile;
    }

    triggerEventEffect() {
        if (this._tile) {
            if (this._tile.canResourceBeDepleted("left")) {
                this._tile.depleteResource("left", this._eventNamePL);
            }
            if (this._tile.canResourceBeDepleted("right")) {
                this._tile.depleteResource("right", this._eventNamePL);
            }
        }
    }
}
