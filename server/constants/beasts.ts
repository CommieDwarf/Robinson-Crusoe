import { Beast } from "../Classes/Beasts/Beast";
import Entries from "../../interfaces/Entries";
import { IResources } from "../../interfaces/Resources/Resources";

function MapFromObject<T>(object: Object) {
  return new Map<keyof T, any>(Object.entries(object) as Entries<T>);
}

export const beasts = [
  new Beast(
    { pl: "kozły", en: "bucks" },
    4,
    1,
    MapFromObject<IResources>({ food: 3, leather: 1 })
  ),
];
