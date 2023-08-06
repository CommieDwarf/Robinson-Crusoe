import {BuildAdventureCard} from "./BuildAdventureCard/BuildAdventureCard";
import {IAdventureCard} from "../../../../../../interfaces/AdventureService/AdventureCard";
import {IGame} from "../../../../../../interfaces/Game";
import {ADVENTURE_CARD_BUILD} from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "../../../../../../interfaces/Characters/PlayerCharacter";
import {INVENTION_STARTER} from "../../../../../../interfaces/InventionService/Invention";

export class NastyWound extends BuildAdventureCard implements IAdventureCard {
    protected _eventNamePL = "zakażenie";

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_BUILD.NASTY_WOUND,
            "paskudna rana",
            false,
            game,
            "shuffle",
            ""
        );
    }

    option1(resolver: IPlayerCharacter) {
        this.setResolver(resolver);
        resolver.setWound("arm", this._action, this._namePL);
        this.shuffleIntoEventDeck();
    }

    triggerEventEffect() {
        if (!this._game.inventionService.isBuilt(INVENTION_STARTER.MEDICINE)) {
            this._game.characterService.hurt(this.getResolver(), 2, this._eventNamePL);
        }
        this.getResolver().unsetWound("arm", this._action, this._eventNamePL);
    }
}
