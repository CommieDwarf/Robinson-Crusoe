import {GatherAdventureCard} from "./GatherAdventureCard/GatherAdventureCard";
import {IAdventureCard} from "../../../../../../interfaces/AdventureService/AdventureCard";
import {IGame} from "../../../../../../interfaces/Game";
import {ADVENTURE_CARD_GATHER} from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "../../../../../../interfaces/Characters/PlayerCharacter";


export class SurpriseInTheBushes
    extends GatherAdventureCard
    implements IAdventureCard {
    protected _eventNamePL = "wspomnienia";

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_GATHER.SURPRISE_IN_THE_BUSHES,
            "znalezisko w krzakach",
            true,
            game,
            "discard",
            "shuffle"
        );
    }

    option1(resolver: IPlayerCharacter) {
    }

    option2(resolver: IPlayerCharacter) {
        //TODO: implement picking starting equipment item.
    }

    triggerEventEffect() {
        this._game.moraleService.lvlDown(1, this._eventNamePL);
    }
}
