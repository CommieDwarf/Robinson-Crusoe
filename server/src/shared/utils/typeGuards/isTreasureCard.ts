import {
    IMysteryCard,
    IMysteryCardRenderData,
    ITreasureMysteryCard
} from "@shared/types/Game/MysteryService/MysteryCard";
import {TREASURE_MYSTERY_CARD} from "@shared/types/Game/MysteryService/MYSTERY_CARD";

export function isTreasureCard(candidate: IMysteryCard): candidate is ITreasureMysteryCard {
    return candidate.name in Object.values(TREASURE_MYSTERY_CARD)
}

export function isTreasureCardRenderData(candidate: IMysteryCardRenderData): candidate is IMysteryCardRenderData {
    return candidate.name in Object.values(TREASURE_MYSTERY_CARD)
}
