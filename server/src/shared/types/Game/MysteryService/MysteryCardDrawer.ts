import { IMysteryCard } from "./MysteryCard";
import { ICharacter } from "../Characters/Character";

export interface IMysteryCardDrawer {
	creature: number;
	trap: number;
	treasure: number;
	acquiredTreasures: IMysteryCard[];

	drawer: ICharacter;

	canDraw: boolean;
	finished: boolean;
	canFinish: boolean;

	finish: () => void;
	drawCard: () => IMysteryCard;
	disableDrawingCards: () => void;
}
