import { StorageCard } from "@shared/types/Game/MysteryService/StorageCard";

export const isStorageCard = (candidate: Object): candidate is StorageCard => {
	return "stored" in candidate;
};
