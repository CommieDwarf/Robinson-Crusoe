import {TrapMysteryCard} from "./TrapMysteryCard/TrapMysteryCard";
import {IGame} from "@shared/types/Game/Game";
import {ICharacter} from "@shared/types/Game/Characters/Character";
import {LOG_CODE} from "@shared/types/Game/ChatLog/LOG_CODE";
import {TRAP_MYSTERY_CARD} from "@shared/types/Game/MysteryService/MYSTERY_CARD";

export class TrapDoor extends TrapMysteryCard {
    constructor(game: IGame) {
        super(game, TRAP_MYSTERY_CARD.TRAP_DOOR, "zapadnia");
    }

    triggerDrawEffect(drawer: ICharacter) {
        this._game.mysteryService.dropTreasures();
        this._game.logService.addMessage({
            code: LOG_CODE.LOST_GAINED_TREASURES,
            amount: 0,
            subject1: "",
            subject2: ""
        }, "negative", this._name)
    }
}
