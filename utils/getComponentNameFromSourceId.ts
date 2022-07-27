type ComponentName =
  | "map"
  | "inventions"
  | "structures"
  | "additionalActivities"
  | "threat"
  | "hunt"
  | "scenario"
  | "character";

const scenarioCards = ["mast", "axe"];

function stringIncludesSomeArrayElement(array: string[], str: string) {
  for (let element of array) {
    console.log(element, str);
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
  } else if (sourceId.includes("structure")) {
    return "structures";
  } else if (stringIncludesSomeArrayElement(scenarioCards, sourceId)) {
    return "scenario";
  } else if (sourceId.includes("invention")) {
    return "inventions";
  } else if (sourceId.includes("hunt")) {
    return "hunt";
  } else if (sourceId.includes("threat")) {
    return "threat";
  } else {
    return "character";
  }
}
