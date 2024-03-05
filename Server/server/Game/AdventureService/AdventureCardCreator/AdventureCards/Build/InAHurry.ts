import {BuildAdventureCard} from "./BuildAdventureCard/BuildAdventureCard";
import {IAdventureCard} from "../../../../../../../interfaces/AdventureService/AdventureCard";
import {IGame} from "../../../../../../../interfaces/Game";
import {ADVENTURE_CARD_BUILD} from "../../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import {CONSTRUCTION} from "../../../../../../../interfaces/ConstructionService/Construction";
import {IPlayerCharacter} from "../../../../../../../interfaces/Characters/PlayerCharacter";

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

    option1(resolver: IPlayerCharacter) {

    }

    option2(resolver: IPlayerCharacter) {
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
