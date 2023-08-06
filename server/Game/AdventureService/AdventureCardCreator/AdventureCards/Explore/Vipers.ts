import {ExploreAdventureCard} from "./ExploreAdventureCard/ExploreAdventureCard";
import {IAdventureCard} from "../../../../../../interfaces/AdventureService/AdventureCard";
import {IGame} from "../../../../../../interfaces/Game";
import {ADVENTURE_CARD_EXPLORE} from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "../../../../../../interfaces/Characters/PlayerCharacter";

export class Vipers extends ExploreAdventureCard implements IAdventureCard {
    protected _eventNamePL = "gorączka";

    constructor(game: IGame) {
        super(ADVENTURE_CARD_EXPLORE.VIPERS, "żmije!", false, game, "shuffle", "");
    }

    option1(resolver: IPlayerCharacter) {
        //TODO: put wound.
        this.shuffleIntoEventDeck();
    }

    triggerEventEffect() {
        //TODO: implement.
    }
}
