import {TrapMysteryCard} from "./TrapMysteryCard/TrapMysteryCard";
import {IMysteryCard} from "@shared/types/Game/MysteryService/MysteryCard";
import {IGame} from "@shared/types/Game/Game";
import {ICharacter} from "@shared/types/Game/Characters/Character";
import {LOG_CODE} from "@shared/types/Game/ChatLog/LOG_CODE";

export class TrapDoor extends TrapMysteryCard implements IMysteryCard {
    constructor(game: IGame) {
        super(game, "trap door", "zapadnia");
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
