/**
 * Deeply compares 2 objects.
 * Objects cannot be recursive.
 */

export const objectsEqual = (o1: any, o2: any): boolean => {
	if (o1 && o2 && typeof o1 === "object" && Object.keys(o1).length > 0) {
		return (
			Object.keys(o1).length === Object.keys(o2).length &&
			Object.keys(o1).every((p) => objectsEqual(o1[p], o2[p]))
		);
	} else if (Object.keys(o1).length === 0 && Object.keys(o2).length === 0) {
		return true;
	} else {
		return o1 === o2;
	}
};
