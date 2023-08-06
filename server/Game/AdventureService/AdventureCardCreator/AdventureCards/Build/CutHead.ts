import {BuildAdventureCard} from "./BuildAdventureCard/BuildAdventureCard";
import {IAdventureCard} from "../../../../../../interfaces/AdventureService/AdventureCard";
import {IGame} from "../../../../../../interfaces/Game";
import {ADVENTURE_CARD_BUILD} from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "../../../../../../interfaces/Characters/PlayerCharacter";
import {INVENTION_STARTER} from "../../../../../../interfaces/InventionService/Invention";

export class CutHead extends BuildAdventureCard implements IAdventureCard {
    protected _eventNamePL = "ból głowy";

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_BUILD.CUT_HEAD,
            "skaleczenie",
            false,
            game,
            "shuffle",
            ""
        );
    }

    option1(resolver: IPlayerCharacter) {
        const character = this.getPrimeCharacter();
        this._game.characterService.incrDetermination(character, 2, this._namePL);
        this._game.characterService.hurt(character, 1, this._namePL);
        this.setResolver(resolver);
        resolver.setWound("head", this._action, this._namePL);
        this.shuffleIntoEventDeck();
    }

    triggerEventEffect() {
        if (!this._game.inventionService.isBuilt(INVENTION_STARTER.MEDICINE)) {
            this._game.characterService.hurt(this.getResolver(), 2, this._eventNamePL);
        }
        this.getResolver().unsetWound("head", this._action, this._namePL);
    }
}
