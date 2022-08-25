import { IBeast, IBeastRenderData } from "./Beast";

export interface IBeastsRenderData {
  deckCount: number;
}

export interface IBeasts {
  getBeast: () => IBeast;
  deckCount: number;
  renderData: IBeastsRenderData;
}
