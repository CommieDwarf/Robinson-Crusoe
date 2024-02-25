import {IPlayerCharacter} from "../interfaces/Characters/PlayerCharacter";

export const isPlayerCharacter = (
    candidate: Object
): candidate is IPlayerCharacter => {
    return (
        "player" in candidate
    );
};
