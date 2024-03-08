import {IBaseMysteryCard, IMysteryCard, MYSTERY_CARD_TYPE,} from "@shared/types/Game/MysteryService/MysteryCard";
import {IGame} from "@shared/types/Game/Game";
import {MysteryCard} from "../../MysteryCard";
import {TRAP_MYSTERY_CARD} from "@shared/types/Game/MysteryService/MYSTERY_CARD";

export abstract class TrapMysteryCard
    extends MysteryCard<TRAP_MYSTERY_CARD>
    implements IBaseMysteryCard<TRAP_MYSTERY_CARD> {
    protected _type = MYSTERY_CARD_TYPE.TRAP;

    protected constructor(game: IGame, name: TRAP_MYSTERY_CARD, namePL: string, eventLabel: string = "", drawLabel: string = "") {
        super(game, name, namePL, false, "", eventLabel, drawLabel);
    }

    get renderData() {
        return super.getRenderData()
    }
}
