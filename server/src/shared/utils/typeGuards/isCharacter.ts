import { ICharacter } from "@shared/types/Game/Characters/Character";

export const isCharacter = (candidate: Object): candidate is ICharacter => {
	return "health" in candidate;
};
