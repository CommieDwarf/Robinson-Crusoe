import {BuildAdventureCard} from "./BuildAdventureCard/BuildAdventureCard";
import {IAdventureCard} from "../../../../../types/AdventureService/AdventureCard";
import {IGame} from "../../../../../types/Game";
import {ADVENTURE_CARD_BUILD} from "../../../../../types/AdventureService/ADVENTURE_CARD";
import {CONSTRUCTION} from "../../../../../types/ConstructionService/Construction";
import {IPlayerCharacter} from "../../../../../types/Characters/PlayerCharacter";

export class DarkCloudsInTheSky
    extends BuildAdventureCard
    implements IAdventureCard {
    protected _eventNamePL = "koniec ulewy";

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_BUILD.DARK_CLOUDS_IN_THE_SKY,
            "zachmurzone niebo",
            false,
            game,
            "shuffle",
            ""
        );
    }

    option1(resolver: IPlayerCharacter) {
        this._game.weatherService.setToken("rain", true, this.namePL);
        this.shuffleIntoEventDeck();
    }

    triggerEventEffect() {
        if (this._game.constructionService.isBuilt(CONSTRUCTION.SHELTER)) {
            this._game.constructionService.lvlUpConstruction(
                CONSTRUCTION.PALISADE,
                1,
                this._eventNamePL
            );
        }
    }
}
