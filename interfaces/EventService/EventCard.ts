import {IBasicResources} from "../Resources/Resources";
import {CONSTRUCTION} from "../ConstructionService/Construction";
import {INVENTION_STARTER} from "../InventionService/Invention";
import {AdventureAction} from "../ACTION";
import {IAssignablePawnsItem, IAssignablePawnsItemRenderData} from "../AssignablePawnsItem/AssignablePawnsItem";


export interface IEventCard extends IAssignablePawnsItem {
    id: string;
    name: string;
    namePL: string;
    resolutionPL: string;
    renderData: IEventCardRenderData;
    cardType: AdventureAction | EVENT_TYPE;
    requirements: EventResolveRequirements;
    requiredPawnAmount: number;

    triggerEventEffect(): void;

    fullFill(): void;

    triggerThreatEffect(): void;

    setAdventureToken: () => void;
}


export interface IEventCardRenderData extends IAssignablePawnsItemRenderData {
    id: string;
    name: string;
    cardType: AdventureAction | EVENT_TYPE;
    requiredPawnAmount: number;
}

export enum EVENT_TYPE {
    BOOK = "book",
    WRECKAGE = "wreckage",
}

export interface EventResolveRequirements {
    pawns: number;
    invention: INVENTION_STARTER | null;
    construction: {
        type: CONSTRUCTION;
        lvl: number;
    } | null;
    resource: IBasicResources | null;
}

