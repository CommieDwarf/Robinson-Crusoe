export type ComponentName =
	| "map"
	| "inventions"
	| "constructions"
	| "additionalActivities"
	| "event"
	| "hunt"
	| "scenario"
	| "character";

const scenarioCards = ["mast", "axe"];

export function stringIncludesSomeArrayElement(array: string[], str: string) {
	for (const element of array) {
		if (str.includes(element)) {
			return true;
		}
	}
	return false;
}

export function getComponentNameFromSourceId(sourceId: string): ComponentName {
	if (sourceId.includes("tile")) {
		return "map";
	} else if (sourceId.includes("construction")) {
		return "constructions";
	} else if (stringIncludesSomeArrayElement(scenarioCards, sourceId)) {
		return "scenario";
	} else if (sourceId.includes("invention")) {
		return "inventions";
	} else if (sourceId.includes("hunt")) {
		return "hunt";
	} else if (sourceId.includes("event")) {
		return "event";
	} else {
		return "character";
	}
}
