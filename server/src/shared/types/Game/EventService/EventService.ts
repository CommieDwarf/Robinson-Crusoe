import {IEventCard, IEventCardRenderData} from "./EventCard";
import {IAdventureCard, IAdventureCardRenderData} from "../AdventureService/AdventureCard";
import {IMysteryCard, IBaseMysteryCardRenderData, IMysteryCardRenderData} from "../MysteryService/MysteryCard";
import { ICharacter, ICharacterRenderData } from "../Characters/Character";


export interface CurrentResolve<C extends IAdventureCard | IMysteryCard> {
    card: C,
    resolver: ICharacter,
}

export interface CurrentResolveRenderData<C extends IAdventureCard | IMysteryCard> {
    card: C["renderData"],
    resolver: ICharacterRenderData,
}

export interface IEventServiceRenderData {
    leftSlot: IEventCardRenderData | null;
    rightSlot: IEventCardRenderData | null;
    currentAdventureResolve: CurrentResolveRenderData<IAdventureCard> | null;
    currentMysteryResolve: CurrentResolveRenderData<IMysteryCard> | null;
}

export interface ThreatSpecialEffects {
    argument: boolean;
}

export interface IEventService {
    left: IEventCard | null;
    right: IEventCard | null;
    currentAdventureResolve: CurrentResolve<IAdventureCard> | null;
    currentMysteryResolve: CurrentResolve<IMysteryCard> | null;
    adventureNeedsToBeResolved: boolean;
    renderData: IEventServiceRenderData;
    specialEffects: ThreatSpecialEffects;

    addCardToTopOfStack: (card: unknown) => void;
    shuffleCardInToDeck: (card: IAdventureCard | IMysteryCard) => void;
    switchCardFromTopToBottomOfStack: () => void;
    pullCard: (resolver: ICharacter) => void;
    setSpecialEffect: (
        effect: keyof ThreatSpecialEffects,
        value: boolean,
        logSource: string
    ) => void;
    fullFill: (cardID: string) => void;
    resolveEventAdventure: (option: 1 | 2, resolver: ICharacter) => void;
    resolveEventMystery: (resolver: ICharacter) => void;
    getSlotByCardName: (cardName: string) => "left" | "right";
    getCardSlotByDroppableId: (droppableId: string) => IEventCard;
    canGoNextPhase: () => boolean;
    isEventCardPulledThisRound: () => boolean;
}
