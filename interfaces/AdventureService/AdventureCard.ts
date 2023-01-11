import { ACTION } from "../ACTION";
import { ADVENTURE_CARD } from "./ADVENTURE_CARD";

export interface IAdventureCard {
  name: ADVENTURE_CARD;
  namePL: string;
  eventNamePL: string;
  action: ACTION;
  decide: boolean;

  option1: () => void;
  option2: () => void;
  eventEffect: () => void;
}
