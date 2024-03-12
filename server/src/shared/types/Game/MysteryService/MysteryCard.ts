import {IBasicResourcesAmount} from "../Resources/Resources";
import {ICharacter} from "../Characters/Character";
import {IPawnService, IPawnServiceRenderData} from "../Pawns/PawnService";
import {PawnOwner} from "../PawnOwner/PawnOwner";
import {
    CREATURE_MYSTERY_CARD, MysteryCardName,
    TRAP_MYSTERY_CARD,
    TREASURE_MYSTERY_CARD
} from "@shared/types/Game/MysteryService/MYSTERY_CARD";

export enum MYSTERY_CARD_TYPE {
    CREATURE = "creature",
    TRAP = "trap",
    TREASURE = "treasure",
}


export interface ITreasureMysteryCard extends IBaseMysteryCard<TREASURE_MYSTERY_CARD>, PawnOwner<ITreasureMysteryCardRenderData> {

    name: TREASURE_MYSTERY_CARD
    addToResources: () => void;

    use: (...args: any[]) => void; //TODO: do zmiany potem
    pawnService: IPawnService<ITreasureMysteryCard>;

    renderData: ITreasureMysteryCardRenderData
}

export interface ITreasureMysteryCardRenderData extends IBaseMysteryCardRenderData<TREASURE_MYSTERY_CARD> {
    pawnService: IPawnServiceRenderData<ITreasureMysteryCardRenderData> | null;
    uses: number;
}

export interface IMysteryCard extends IBaseMysteryCard<MysteryCardName> {
}

export interface IMysteryCardRenderData extends IBaseMysteryCardRenderData<MysteryCardName> {
}

export interface IBaseMysteryCard<Name> {
    name: Name
    namePL: string;
    type: MYSTERY_CARD_TYPE;
    shuffleable: boolean;
    eventName: string;
    requiresTarget: boolean;
    drawLabel: string;
    drawResolved: boolean;


    triggerDrawEffect: (drawer: ICharacter) => void;
    triggerEventEffect: () => void;

    renderData: IBaseMysteryCardRenderData<Name>

}

export interface IBaseMysteryCardRenderData<Name> {
    name: Name;
    namePL: string;
    type: MYSTERY_CARD_TYPE;
    shuffleable: boolean;
    drawLabel: string;
    drawResolved: boolean;
    eventLabel: string;
    usedCount: number;
    stored?: IBasicResourcesAmount;
}
