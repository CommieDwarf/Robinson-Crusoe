export function compareMapValues<key, value>(
	map1: Map<key, value>,
	map2: Map<key, value>
) {
	let areEqual = true;
	map1.forEach((value, key) => {
		if (map2.get(key) !== value) {
			areEqual = false;
		}
	});
	return areEqual;
}
