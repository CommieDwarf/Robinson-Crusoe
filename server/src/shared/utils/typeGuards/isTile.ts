import { ITile } from "@shared/types/Game/TileService/ITile";

export const isTile = (candidate: any): candidate is ITile => {
	return candidate instanceof Object && "hasBasicResource" in candidate;
};

