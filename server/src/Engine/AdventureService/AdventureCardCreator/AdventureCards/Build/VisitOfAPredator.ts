import {BuildAdventureCard} from "./BuildAdventureCard/BuildAdventureCard";
import {IAdventureCard} from "../../../../../types/AdventureService/AdventureCard";
import {IGame} from "../../../../../types/Game";
import {ADVENTURE_CARD_BUILD} from "../../../../../types/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "../../../../../types/Characters/PlayerCharacter";

export class VisitOfAPredator
    extends BuildAdventureCard
    implements IAdventureCard {
    protected _eventNamePL = "nocna wizyta";

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_BUILD.UNMOTIVATED,
            "wizyta bestii",
            false,
            game,
            "shuffle",
            ""
        );
    }

    option1(resolver: IPlayerCharacter) {
        this._game.resourceService.spendBasicResourceOrGetHurt(
            "food",
            1,
            this._namePL
        );
        this.shuffleIntoEventDeck();
    }

    triggerEventEffect() {
        //TODO: implement throw animals weather dice.
    }
}
