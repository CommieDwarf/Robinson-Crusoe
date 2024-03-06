import {IBasicResourcesAmount} from "../Resources/Resources";
import {ICharacter} from "../Characters/Character";
import {IPawnService, IPawnServiceRenderData} from "../Pawns/PawnService";
import {PawnOwner} from "../PawnOwner/PawnOwner";

export enum MYSTERY_CARD_TYPE {
    CREATURE = "creature",
    TRAP = "trap",
    TREASURE = "treasure",
}


export interface ITreasureMysteryCard extends IMysteryCard, PawnOwner<ITreasureMysteryCardRenderData> {
    addToResources: () => void;
    pawnService: IPawnService<ITreasureMysteryCard>;

    renderData: ITreasureMysteryCardRenderData
}

export interface ITreasureMysteryCardRenderData extends IMysteryCardRenderData {
    pawnService: IPawnServiceRenderData<ITreasureMysteryCardRenderData> | null;
}

export interface IMysteryCard {
    name: string;
    namePL: string;
    type: MYSTERY_CARD_TYPE;
    shuffleable: boolean;
    eventName: string;
    requiresTarget: boolean;
    drawLabel: string;
    drawResolved: boolean;

    getRenderData: () => IMysteryCardRenderData;

    triggerDrawEffect: (drawer: ICharacter) => void;
    triggerEventEffect: () => void;
    uses: number;
    use: (...args: any[]) => void;

}

export interface IMysteryCardRenderData {
    name: string;
    namePL: string;
    type: MYSTERY_CARD_TYPE;
    shuffleable: boolean;
    drawLabel: string;
    drawResolved: boolean;
    eventLabel: string;
    uses: number;
    usedCount: number;
    stored?: IBasicResourcesAmount;
}
