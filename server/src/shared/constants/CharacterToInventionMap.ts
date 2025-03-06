import { CHARACTER } from "@shared/types/Game/Characters/Character";
import { INVENTION_PERSONAL } from "@shared/types/Game/InventionService/Invention";

export const characterToInventionMap = {
	[CHARACTER.SOLDIER]: INVENTION_PERSONAL.SPEAR,
	[CHARACTER.COOK]: INVENTION_PERSONAL.FIREPLACE,
	[CHARACTER.DOG]: "",
	[CHARACTER.FRIDAY]: "",
	[CHARACTER.CARPENTER]: INVENTION_PERSONAL.SNARE,
	[CHARACTER.EXPLORER]: INVENTION_PERSONAL.SHORTCUT,
};
