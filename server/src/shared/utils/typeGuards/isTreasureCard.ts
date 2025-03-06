import {
	IMysteryCard,
	IMysteryCardRenderData,
	ITreasureMysteryCard,
	ITreasureMysteryCardRenderData,
} from "@shared/types/Game/MysteryService/MysteryCard";

export function isTreasureCard(
	candidate: IMysteryCard
): candidate is ITreasureMysteryCard {
	return "uses" in candidate;
}

export function isTreasureCardRenderData(
	candidate: IMysteryCardRenderData
): candidate is ITreasureMysteryCardRenderData {
	return "uses" in candidate;
}
