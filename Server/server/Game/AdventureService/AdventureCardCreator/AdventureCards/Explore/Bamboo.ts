import {IAdventureCard} from "../../../../../../../interfaces/AdventureService/AdventureCard";
import {IGame} from "../../../../../../../interfaces/Game";
import {ADVENTURE_CARD_EXPLORE} from "../../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import {ExploreAdventureCard} from "./ExploreAdventureCard/ExploreAdventureCard";
import {IPlayerCharacter} from "../../../../../../../interfaces/Characters/PlayerCharacter";

export class Bamboo extends ExploreAdventureCard implements IAdventureCard {
    protected _eventNamePL = "trzask łamanego drewna!";

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_EXPLORE.BAMBOO,
            "bambus",
            true,
            game,
            "discard",
            "shuffle"
        );
    }

    option1(resolver: IPlayerCharacter) {
    }

    option2(resolver: IPlayerCharacter) {
        this._game.resourceService.addBasicResourceToOwned("wood", 2, this._namePL);
        this.shuffleIntoEventDeck();
    }

    triggerEventEffect() {
        //TODO: implement choice between -1 roof and -1 palisade.
    }
}
