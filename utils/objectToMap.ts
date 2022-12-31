import Entries from "../interfaces/Entries";

export function objectToMap<T>(object: Object) {
  return new Map<keyof T, any>(Object.entries(object) as Entries<T>);
}