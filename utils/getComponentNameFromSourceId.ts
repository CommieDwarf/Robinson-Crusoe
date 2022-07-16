type ComponentName =
  | "map"
  | "inventions"
  | "structures"
  | "additionalActivities"
  | "threat"
  | "hunt";

export default function getComponentNameFromSourceId(
  sourceId: string
): ComponentName {
  if (sourceId.includes("tile")) {
    return "map";
  } else if (sourceId.includes("structure")) {
    return "structures";
  } else if (sourceId.includes("invention")) {
    return "inventions";
  } else if (sourceId.includes("hunt")) {
    return "hunt";
  } else {
    return "threat";
  }
}