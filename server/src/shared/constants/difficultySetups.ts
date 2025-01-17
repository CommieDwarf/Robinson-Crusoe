import { DifficultySetup } from "@shared/types/SessionSettings";

export const defaultEquipmentAmount = 2;

export const difficultySetups: DifficultySetup[] = [
    { // 1 player
        friday: true,
        dog: true
    },// 2 players
    {
        dog: true,
        friday: false,
    },
    { // 3 players
        dog: true,
        friday: false,
    },
    { // 4 players
        dog: false,
        friday: false,
    }
]
