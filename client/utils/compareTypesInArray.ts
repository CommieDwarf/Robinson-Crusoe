export function compareArrayTypes(arr1: any[], arr2: any[]) {
	if (arr1.length !== arr2.length) {
		return false;
	}

	for (let i = 0; i < arr1.length; i++) {
		if (typeof arr1[i] !== typeof arr2[i]) {
			return false;
		}
	}

	return true;
}
