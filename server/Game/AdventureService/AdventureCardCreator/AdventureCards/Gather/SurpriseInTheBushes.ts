import {GatherAdventureCard} from "./GatherAdventureCard/GatherAdventureCard";
import {IAdventureCard} from "../../../../../../interfaces/AdventureService/AdventureCard";
import {IGame} from "../../../../../../interfaces/Game";
import {ADVENTURE_CARD_GATHER} from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import {ICharacter} from "../../../../../../interfaces/Characters/Character";

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

    option1(resolver: ICharacter) {
    }

    option2(resolver: ICharacter) {
        //TODO: implement picking starting equipment item.
        //I don't think i can manage to fit extra item in the UI for now.
    }

    triggerEventEffect() {
        this._game.moraleService.lvlDown(1, this._eventNamePL);
    }
}
