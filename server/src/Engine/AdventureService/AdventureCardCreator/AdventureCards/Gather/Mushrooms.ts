import {GatherAdventureCard} from "./GatherAdventureCard/GatherAdventureCard";
import {IAdventureCard} from "../../../../../types/AdventureService/AdventureCard";
import {IGame} from "../../../../../types/Game";
import {ADVENTURE_CARD_GATHER} from "../../../../../types/AdventureService/ADVENTURE_CARD";
import {INVENTION_STARTER} from "../../../../../types/InventionService/Invention";
import {IPlayerCharacter} from "../../../../../types/Characters/PlayerCharacter";

export class Mushrooms extends GatherAdventureCard implements IAdventureCard {
    protected _eventNamePL = "rozwolnienie";

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_GATHER.MUSHROOMS,
            "grzyby",
            true,
            game,
            "discard",
            "shuffle"
        );
    }

    option1(resolver: IPlayerCharacter) {
    }

    option2(resolver: IPlayerCharacter) {
        this._game.resourceService.addBasicResourceToOwned("food", this._game.playerService.players.length, this._namePL);
        this.shuffleIntoEventDeck();
    }

    triggerEventEffect() {
        if (!this._game.inventionService.isBuilt(INVENTION_STARTER.MEDICINE)) {
            this._game.characterService.hurtAllPlayerCharacters(1, this._eventNamePL);
        }
    }
}
