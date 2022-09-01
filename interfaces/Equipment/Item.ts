import { EqList } from "../../server/constants/eqList";
import { IGame } from "../Game";

export type IItemRenderData = Omit<IItem, "game" | "use" | "renderData">;

export interface IItem {
  name: keyof EqList;
  namePL: string;
  uses: number;
  game: IGame;
  use: () => void;
  renderData: IItemRenderData;
}
