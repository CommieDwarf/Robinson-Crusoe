import {ICharacter} from "../../server/src/types/Characters/Character";

export const isCharacter = (
    candidate: Object
): candidate is ICharacter => {
    return (
        "health" in candidate
    );
};
