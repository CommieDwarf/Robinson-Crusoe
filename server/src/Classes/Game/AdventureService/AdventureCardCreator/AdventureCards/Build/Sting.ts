import {BuildAdventureCard} from "./BuildAdventureCard/BuildAdventureCard";
import {IAdventureCard} from "@shared/types/Game/AdventureService/AdventureCard";
import {IGame} from "@shared/types/Game/Game";
import {ADVENTURE_CARD_BUILD} from "@shared/types/Game/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";

export class Sting extends BuildAdventureCard implements IAdventureCard {
    protected _eventNamePL = "dreszcze";

    constructor(game: IGame) {
        super(ADVENTURE_CARD_BUILD.STING, "użądlenie", false, game, "shuffle", "");
    }

    resolveOption1(resolver: IPlayerCharacter) {
        this.setResolver(resolver);
        resolver.setWound("stomach", this._action, this._namePL);
    }

    triggerEventEffect() {
        //TODO: implement
    }
}
