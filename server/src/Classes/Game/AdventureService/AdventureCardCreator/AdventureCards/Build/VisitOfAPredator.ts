import {BuildAdventureCard} from "./BuildAdventureCard/BuildAdventureCard";
import {IAdventureCard} from "@shared/types/Game/AdventureService/AdventureCard";
import {IGame} from "@shared/types/Game/Game";
import {ADVENTURE_CARD_BUILD} from "@shared/types/Game/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";

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

    resolveOption1(resolver: IPlayerCharacter) {
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
