import {ExploreAdventureCard} from "./ExploreAdventureCard/ExploreAdventureCard";
import {IAdventureCard} from "../../../../../types/AdventureService/AdventureCard";
import {IGame} from "../../../../../types/Game";
import {ADVENTURE_CARD_EXPLORE} from "../../../../../types/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "../../../../../types/Characters/PlayerCharacter";

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
