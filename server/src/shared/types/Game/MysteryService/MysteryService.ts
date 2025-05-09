import {
	IMysteryCard,
	ITreasureMysteryCard,
	IMysteryCardRenderData,
} from "./MysteryCard";
import { ICharacter, ICharacterRenderData } from "../Characters/Character";
import { IPlayerCharacter } from "../Characters/PlayerCharacter";
import { TREASURE_MYSTERY_CARD } from "./MYSTERY_CARD";

export interface IMysteryService {
	cardsAsReminders: IMysteryCard[];
	cardStack: IMysteryCard[];
	shuffleBackIntoStack: (cards: IMysteryCard[]) => void;
	isDrawingOn: boolean;

	startDrawingCards: (
		creature: number,
		trap: number,
		treasure: number,
		drawer: ICharacter,
		max?: number
	) => void;
	addCardAsReminder: (card: IMysteryCard) => void;
	removeCardAsReminder: (card: IMysteryCard) => void;
	addTreasureToResources: (card: ITreasureMysteryCard) => void;
	useCard: (
		user: IPlayerCharacter | string,
		cardName: string,
		target1?: any,
		target2?: any
	) => void;
	drawCard: () => void;
	finish: () => void;
	disableFurtherCardDraw: () => void;
	triggerDrawEffect: () => void;
	depositResource: (cardName: string) => void;
	withdrawResource: (cardName: string) => void;
	hasTreasureCard: (cardName: TREASURE_MYSTERY_CARD) => boolean;
	dropTreasures: () => void;

	renderData: IMysteryServiceRenderData;
}

export interface MysteryCardsAmount {
	creature: number;
	trap: number;
	treasure: number;
}

export interface IMysteryServiceRenderData {
	isDrawingOn: boolean;
	canDraw: boolean;
	currentResolve: IMysteryCardRenderData | null;
	canFinish: boolean;
	drawer: ICharacterRenderData | null;
	cardsLeft: MysteryCardsAmount;
	cardsAsReminders: IMysteryCardRenderData[];
}
