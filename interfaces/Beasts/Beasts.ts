import { IBeast } from "./Beast";

export interface IBeasts {
  getBeast: () => IBeast;
  deckCount: number;
}
