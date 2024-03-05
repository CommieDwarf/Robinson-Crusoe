import {BuildAdventureCard} from "./BuildAdventureCard/BuildAdventureCard";
import {IAdventureCard} from "../../../../../types/AdventureService/AdventureCard";
import {IGame} from "../../../../../types/Game";
import {ADVENTURE_CARD_BUILD} from "../../../../../types/AdventureService/ADVENTURE_CARD";
import {CONSTRUCTION} from "../../../../../types/ConstructionService/Construction";
import {IPlayerCharacter} from "../../../../../types/Characters/PlayerCharacter";


export class FastWork extends BuildAdventureCard implements IAdventureCard {
    protected _eventNamePL = "co nagle to po diable";

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_BUILD.FAST_WORK,
            "pośpiech",
            true,
            game,
            "discard",
            "shuffle"
        );
    }

    option1(resolver: IPlayerCharacter) {
    }

    option2(resolver: IPlayerCharacter) {
        //TODO: implement building another item + rolling dices for it
    }

    triggerEventEffect() {
        this._game.constructionService.lvlDownOrGetHurt(
            CONSTRUCTION.PALISADE,
            1,
            this._eventNamePL
        );
    }
}
