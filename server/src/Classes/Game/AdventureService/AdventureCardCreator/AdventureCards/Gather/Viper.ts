import {GatherAdventureCard} from "./GatherAdventureCard/GatherAdventureCard";
import {IAdventureCard} from "@shared/types/Game/AdventureService/AdventureCard";
import {IGame} from "@shared/types/Game/Game";
import {ADVENTURE_CARD_GATHER} from "@shared/types/Game/AdventureService/ADVENTURE_CARD";
import {INVENTION_STARTER} from "@shared/types/Game/InventionService/Invention";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";

export class Viper extends GatherAdventureCard implements IAdventureCard {

    constructor(game: IGame) {
        super(ADVENTURE_CARD_GATHER.VIPER, "bite", false, game, "shuffle", "");
    }

    resolveOption1(resolver: IPlayerCharacter) {
        this.shuffleIntoEventDeck();
    }

    triggerEventEffect() {
        if (this._game.inventionService.isBuilt(INVENTION_STARTER.MEDICINE)) {
            this._game.characterService.hurt(
                this.getPrimeCharacter(),
                1,
                this._eventName
            );
        } else {
            this._game.characterService.hurt(
                this.getPrimeCharacter(),
                3,
                this._eventName
            );
        }
    }
}
