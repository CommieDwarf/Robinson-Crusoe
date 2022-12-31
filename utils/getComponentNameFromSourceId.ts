type ComponentName =
  | "map"
  | "inventions"
  | "constructions"
  | "additionalActivities"
  | "event"
  | "hunt"
  | "scenario"
  | "character";

const scenarioCards = ["mast", "axe"];

function stringIncludesSomeArrayElement(array: string[], str: string) {
  for (let element of array) {
    if (str.includes(element)) {
      return true;
    }
  }
  return false;
}

export default function getComponentNameFromSourceId(
  sourceId: string
): ComponentName {
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
