import {BuildAdventureCard} from "./BuildAdventureCard/BuildAdventureCard";
import {IAdventureCard} from "../../../../../types/AdventureService/AdventureCard";
import {IGame} from "../../../../../types/Game";
import {ADVENTURE_CARD_BUILD} from "../../../../../types/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "../../../../../types/Characters/PlayerCharacter";

export class ComingToTerms
    extends BuildAdventureCard
    implements IAdventureCard {
    protected _eventNamePL = "brak pomysłów";

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_BUILD.COMING_TO_TERMS,
            "realna ocena sytuacji",
            false,
            game,
            "shuffle",
            ""
        );
    }

    option1(resolver: IPlayerCharacter) {
        //TODO: implement discarding inventions.
        this.shuffleIntoEventDeck();
    }

    triggerEventEffect() {
        this._game.moraleService.lvlDown(1, this._eventNamePL);
    }
}
