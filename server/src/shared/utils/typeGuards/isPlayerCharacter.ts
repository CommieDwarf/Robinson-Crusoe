import {IPlayerCharacter} from "../../server/src/types/Characters/PlayerCharacter";

export const isPlayerCharacter = (
    candidate: Object
): candidate is IPlayerCharacter => {
    return (
        "player" in candidate
    );
};
