import {ExploreAdventureCard} from "./ExploreAdventureCard/ExploreAdventureCard";
import {IAdventureCard} from "../../../../../../interfaces/AdventureService/AdventureCard";
import {IGame} from "../../../../../../interfaces/Game";
import {ADVENTURE_CARD_EXPLORE} from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "../../../../../../interfaces/Characters/PlayerCharacter";

export class OldHut extends ExploreAdventureCard implements IAdventureCard {
    protected _eventNamePL = "duch rozbitka";

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_EXPLORE.OLD_HUT,
            "stara chata",
            true,
            game,
            "discard",
            "shuffle"
        );
    }

    option1(resolver: IPlayerCharacter) {
    }

    option2(resolver: IPlayerCharacter) {
        this.startDrawingMysteryCards(1, 0, 1, resolver, 1);
        this.shuffleIntoEventDeck();
    }

    triggerEventEffect() {
        this._game.characterService.decrDeterminationAllPlayerCharacters(
            1,
            this._eventNamePL
        );
    }
}
