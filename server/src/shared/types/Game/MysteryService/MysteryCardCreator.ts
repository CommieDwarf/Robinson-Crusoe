import {IMysteryCard} from "./MysteryCard";
import {CREATURE_MYSTERY_CARD, TRAP_MYSTERY_CARD, TREASURE_MYSTERY_CARD,} from "./MYSTERY_CARD";

export interface IMysteryCardCreator {
    createAllMysteryCards: () => IMysteryCard[];

    createAllCreatureCards: () => IMysteryCard[];
    createAllTrapCards: () => IMysteryCard[];
    createAllTreasureCards: () => IMysteryCard[];

    createCreatureCard: (card: CREATURE_MYSTERY_CARD) => IMysteryCard;
    createTrapCard: (card: TRAP_MYSTERY_CARD) => IMysteryCard;
    createTreasureCard: (card: TREASURE_MYSTERY_CARD) => IMysteryCard;

    implemented: {
        treasure: TREASURE_MYSTERY_CARD[],
        creature: CREATURE_MYSTERY_CARD[],
        trap: TRAP_MYSTERY_CARD[],

    }
}
