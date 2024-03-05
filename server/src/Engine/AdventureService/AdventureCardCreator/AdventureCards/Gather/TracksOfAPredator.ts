import {GatherAdventureCard} from "./GatherAdventureCard/GatherAdventureCard";
import {IAdventureCard} from "../../../../../types/AdventureService/AdventureCard";
import {IGame} from "../../../../../types/Game";
import {ADVENTURE_CARD_GATHER} from "../../../../../types/AdventureService/ADVENTURE_CARD";
import {CONSTRUCTION} from "../../../../../types/ConstructionService/Construction";
import {IPlayerCharacter} from "../../../../../types/Characters/PlayerCharacter";

export class TracksOfAPredator
    extends GatherAdventureCard
    implements IAdventureCard {
    protected _eventNamePL = "atak wygłodniałego drapieżnika";

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_GATHER.TRACKS_OF_A_PREDATOR,
            "niebezpieczne ślady",
            false,
            game,
            "shuffle",
            ""
        );
    }

    option1(resolver: IPlayerCharacter) {
        this.shuffleIntoEventDeck();
    }

    triggerEventEffect() {
        if (
            this._game.constructionService.getConstruction(CONSTRUCTION.WEAPON).lvl <
            3
        ) {
            const campTile = this._game.tileService.campTile;
            const side = campTile.getSideByResource("food");
            if (side) {
                campTile.depleteResource(side, this._eventNamePL);
            } else {
                this._game.characterService.hurtAllPlayerCharacters(1, this._eventNamePL);
            }
        }
    }
}
