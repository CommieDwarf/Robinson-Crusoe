import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";

export const isPlayerCharacter = (
    candidate: Object
): candidate is IPlayerCharacter => {
    return (
        "player" in candidate
    );
};
