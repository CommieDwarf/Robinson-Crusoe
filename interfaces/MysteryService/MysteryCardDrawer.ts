import { IMysteryCard } from "./MysteryCard";
import { IPlayerCharacter } from "../Characters/Character";

export interface IMysteryCardDrawer {
  creature: number;
  trap: number;
  treasure: number;

  drawer: IPlayerCharacter;

  canDraw: boolean;
  finished: boolean;
  canFinish: boolean;

  finish: () => void;
  drawCard: () => IMysteryCard;
}
