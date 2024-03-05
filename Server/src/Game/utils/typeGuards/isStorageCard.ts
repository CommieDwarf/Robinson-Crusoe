import {StorageCard} from "../../types/MysteryService/StorageCard";

export const isStorageCard = (
    candidate: Object
): candidate is StorageCard => {
    return "stored" in candidate;
};
