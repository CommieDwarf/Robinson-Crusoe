import {GatherAdventureCard} from "./GatherAdventureCard/GatherAdventureCard";
import {IAdventureCard} from "@shared/types/Game/AdventureService/AdventureCard";
import {IGame} from "@shared/types/Game/Game";
import {ADVENTURE_CARD_GATHER} from "@shared/types/Game/AdventureService/ADVENTURE_CARD";
import {INVENTION_STARTER} from "@shared/types/Game/InventionService/Invention";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";

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

    resolveOption1(resolver: IPlayerCharacter) {
    }

    resolveOption2(resolver: IPlayerCharacter) {
        this._game.resourceService.addBasicResourceToOwned("food", this._game.playerService.players.length, this._namePL);
        this.shuffleIntoEventDeck();
    }

    triggerEventEffect() {
        if (!this._game.inventionService.isBuilt(INVENTION_STARTER.MEDICINE)) {
            this._game.characterService.hurtAllPlayerCharacters(1, this._eventNamePL);
        }
    }
}
