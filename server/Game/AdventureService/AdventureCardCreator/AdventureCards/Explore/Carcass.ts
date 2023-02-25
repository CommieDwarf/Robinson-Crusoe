import {ExploreAdventureCard} from "./ExploreAdventureCard/ExploreAdventureCard";
import {IAdventureCard} from "../../../../../../interfaces/AdventureService/AdventureCard";
import {IGame} from "../../../../../../interfaces/Game";
import {ADVENTURE_CARD_EXPLORE} from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import {ICharacter} from "../../../../../../interfaces/Characters/Character";

export class Carcass extends ExploreAdventureCard implements IAdventureCard {
    protected _eventNamePL = "biegunka";

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_EXPLORE.CARCASS,
            "padlina",
            true,
            game,
            "discard",
            "shuffle"
        );
    }


    option1(resolver: ICharacter) {
    }

    option2(resolver: ICharacter) {
        this._game.resourceService.addResourceToOwned("food", 2, this._namePL);
        this._game.resourceService.addResourceToOwned("leather", 1, this._namePL);
        this.shuffleIntoEventDeck();
    }

    triggerEventEffect() {
        this._game.characterService.hurtAllPlayerCharacters(1, this._eventNamePL);
    }
}
