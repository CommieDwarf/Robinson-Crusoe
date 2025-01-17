import { defaultEquipmentAmount, difficultySetups } from "@shared/constants/difficultySetups";
import { DifficultySettings } from "@shared/types/SessionSettings";



export function getScaledDifficultySettings(playerAmount: number): DifficultySettings {
    return {
        ...difficultySetups[playerAmount - 1],
        startingEquipment: defaultEquipmentAmount,
        scaled: true,
    }
}