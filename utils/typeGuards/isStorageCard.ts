import {StorageCard} from "../../interfaces/MysteryService/StorageCard";

export const isStorageCard = (
    candidate: Object
): candidate is StorageCard => {
    return "stored" in candidate;
};
