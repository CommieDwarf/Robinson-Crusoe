import {GatherAdventureCard} from "./GatherAdventureCard/GatherAdventureCard";
import {IAdventureCard} from "../../../../../types/AdventureService/AdventureCard";
import {IGame} from "../../../../../types/Game";
import {ADVENTURE_CARD_GATHER} from "../../../../../types/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "../../../../../types/Characters/PlayerCharacter";


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
