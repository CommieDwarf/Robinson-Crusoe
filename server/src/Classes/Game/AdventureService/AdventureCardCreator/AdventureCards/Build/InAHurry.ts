import {BuildAdventureCard} from "./BuildAdventureCard/BuildAdventureCard";
import {IAdventureCard} from "@shared/types/Game/AdventureService/AdventureCard";
import {IGame} from "@shared/types/Game/Game";
import {ADVENTURE_CARD_BUILD} from "@shared/types/Game/AdventureService/ADVENTURE_CARD";
import {CONSTRUCTION} from "@shared/types/Game/ConstructionService/Construction";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";

export class InAHurry extends BuildAdventureCard implements IAdventureCard {
    protected _eventNamePL = "trzask!";

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_BUILD.IN_A_HURRY,
            "w pośpiechu",
            true,
            game,
            "discard",
            "shuffle"
        );
    }

    resolveOption1(resolver: IPlayerCharacter) {

    }

    resolveOption2(resolver: IPlayerCharacter) {
        this._game.tokenService.addRandomTokensToOwned(2);
        this.shuffleIntoEventDeck();
    }

    triggerEventEffect() {
        this._game.constructionService.lvlDownOrGetHurt(
            CONSTRUCTION.PALISADE,
            1,
            this.eventNamePL
        );
    }

}
