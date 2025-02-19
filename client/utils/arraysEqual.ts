import { objectsEqual } from "@shared/utils/objectsEqual";

export const arraysEqual = (a1: any[], a2: any[]) =>
	a1.length === a2.length && a1.every((o, idx) => objectsEqual(o, a2[idx]));
