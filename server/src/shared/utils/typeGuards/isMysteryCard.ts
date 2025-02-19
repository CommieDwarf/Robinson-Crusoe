import { IMysteryCardRenderData } from "@shared/types/Game/MysteryService/MysteryCard";

export const isMysteryCard = (
	candidate: Object
): candidate is IMysteryCardRenderData => {
	return "drawLabel" in candidate;
};
