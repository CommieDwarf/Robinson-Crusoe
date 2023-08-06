import {BuildAdventureCard} from "./BuildAdventureCard/BuildAdventureCard";
import {IAdventureCard} from "../../../../../../interfaces/AdventureService/AdventureCard";
import {IGame} from "../../../../../../interfaces/Game";
import {ADVENTURE_CARD_BUILD} from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "../../../../../../interfaces/Characters/PlayerCharacter";

export class PredatorInTheCamp
    extends BuildAdventureCard
    implements IAdventureCard {
    protected _eventNamePL = "nosił wilk razy kilka...";

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_BUILD.PREDATOR_IN_THE_CAMP,
            "bestia w obozie",
            false,
            game,
            "shuffle",
            ""
        );
    }

    option1(resolver: IPlayerCharacter) {
        //TODO: fight beast
        this.shuffleIntoEventDeck();
    }

    triggerEventEffect() {
        this._game.resourceService.addBasicResourceToOwned(
            "food",
            2,
            this.eventNamePL
        );
        this._game.resourceService.addBasicResourceToOwned(
            "leather",
            1,
            this.eventNamePL
        );
    }
}
