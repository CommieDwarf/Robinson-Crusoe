import {BuildAdventureCard} from "./BuildAdventureCard/BuildAdventureCard";
import {IAdventureCard} from "@shared/types/Game/AdventureService/AdventureCard";
import {IGame} from "@shared/types/Game/Game";
import {ADVENTURE_CARD_BUILD} from "@shared/types/Game/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";

export class PredatorInTheCamp
    extends BuildAdventureCard
    implements IAdventureCard {

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_BUILD.PREDATOR_IN_THE_CAMP,
            "what goes around...",
            false,
            game,
            "shuffle",
            ""
        );
    }

    resolveOption1(resolver: IPlayerCharacter) {
        //TODO: fight beast
        this.shuffleIntoEventDeck();
    }

    triggerEventEffect() {
        this._game.resourceService.addBasicResourceToOwned(
            "food",
            2,
            this.eventName
        );
        this._game.resourceService.addBasicResourceToOwned(
            "leather",
            1,
            this.eventName
        );
    }
}
