import { IMysteryCard } from "./MysteryCard";
import { IPlayerCharacter } from "../Characters/Character";

export interface IMysteryCardDrawer {
  creature: number;
  trap: number;
  treasure: number;
  acquiredTreasures: IMysteryCard[];

  drawer: IPlayerCharacter;

  canDraw: boolean;
  finished: boolean;
  canFinish: boolean


  finish: () => void;
  drawCard: () => IMysteryCard;
  disableDrawingCards: () => void;
}
