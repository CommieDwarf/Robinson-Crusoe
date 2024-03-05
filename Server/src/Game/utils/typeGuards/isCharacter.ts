import {ICharacter} from "../../types/Characters/Character";

export const isCharacter = (
    candidate: Object
): candidate is ICharacter => {
    return (
        "health" in candidate
    );
};
