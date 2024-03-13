import {
    IBaseMysteryCard,
    IMysteryCard,
    IBaseMysteryCardRenderData,
    MYSTERY_CARD_TYPE,
} from "@shared/types/Game/MysteryService/MysteryCard";
import {IGame} from "@shared/types/Game/Game";
import {MysteryCard} from "../../MysteryCard";
import {CREATURE_MYSTERY_CARD} from "@shared/types/Game/MysteryService/MYSTERY_CARD";

export abstract class CreatureMysteryCard
    extends MysteryCard<CREATURE_MYSTERY_CARD>
    implements IBaseMysteryCard<CREATURE_MYSTERY_CARD> {
    protected _type = MYSTERY_CARD_TYPE.CREATURE;


    protected constructor(
        game: IGame,
        name: CREATURE_MYSTERY_CARD,
        shuffleable: boolean,
        eventName: string,
        eventLabel: string = "",
        drawLabel: string = "",
    ) {
        super(game, name, shuffleable, eventName, eventLabel, drawLabel);
    }

    get renderData() {
        return this.getRenderData();
    }

    protected getRenderData(): IBaseMysteryCardRenderData<CREATURE_MYSTERY_CARD> {
        return super.getRenderData();
    }
}
