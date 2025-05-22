import { objectsEqual } from "@shared/utils/objectsEqual";

type CompareFunction<P> = (prevProps: P, nextProps: P) => boolean;

/**
 * Returns a function that compares two objects of type P, excluding specified keys.
 * 
 * @template P
 * @param {Array<keyof P>} excluded - An array of top-level keys of type P to be excluded from the comparison.
 * @returns {CompareFunction<P>} A function that compares two objects of type P.
 */

export function getObjectsComparator<P>(
	excluded?: (keyof P)[]
): CompareFunction<P> {
	return function compare(o1: P, o2: P): boolean {
		const [copy1, copy2]: [Partial<P>, Partial<P>] = [{ ...o1 }, { ...o2 }];
		[copy1, copy2].forEach((copy) => {
			Object.keys(copy).forEach((key) => {
				const k = key as keyof P;
				if (excluded && excluded.includes(k)) {
					// console.log("excluded detected", k);
					delete copy[k];
				} 
			});
		});


		return objectsEqual(copy1, copy2);
	};
}
