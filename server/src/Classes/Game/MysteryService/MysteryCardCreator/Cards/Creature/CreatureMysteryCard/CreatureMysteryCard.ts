import {IMysteryCard, IMysteryCardRenderData, MYSTERY_CARD_TYPE,} from "@shared/types/Game/MysteryService/MysteryCard";
import {IGame} from "@shared/types/Game/Game";
import {MysteryCard} from "../../MysteryCard";

export abstract class CreatureMysteryCard
    extends MysteryCard
    implements IMysteryCard {
    protected _type = MYSTERY_CARD_TYPE.CREATURE;

    declare renderData: IMysteryCardRenderData;

    protected constructor(
        game: IGame,
        name: string,
        namePL: string,
        shuffleable: boolean,
        eventName: string,
        eventLabel: string = "",
        drawLabel: string = "",
    ) {
        super(game, name, namePL, shuffleable, eventName, eventLabel, drawLabel);
    }

    protected getRenderData(): IMysteryCardRenderData {
        return super.getRenderData();
    }
}
