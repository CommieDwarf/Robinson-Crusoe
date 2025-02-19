export interface StorageCard {
	withdraw: () => void;
	deposit: () => void;
}

export type StorageAction = "withdraw" | "deposit";
