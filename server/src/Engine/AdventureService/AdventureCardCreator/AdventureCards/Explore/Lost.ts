import {ExploreAdventureCard} from "./ExploreAdventureCard/ExploreAdventureCard";
import {IAdventureCard} from "../../../../../types/AdventureService/AdventureCard";
import {IGame} from "../../../../../types/Game";
import {ADVENTURE_CARD_EXPLORE} from "../../../../../types/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "../../../../../types/Characters/PlayerCharacter";

export class Lost extends ExploreAdventureCard implements IAdventureCard {
    protected _eventNamePL = "";

    constructor(game: IGame) {
        super(ADVENTURE_CARD_EXPLORE.LOST, "zagubiony", false, game, "discard", "");
    }

    option1(resolver: IPlayerCharacter) {
        //TODO: implement night out of camp and Morale down just before event Phase
    }
}
