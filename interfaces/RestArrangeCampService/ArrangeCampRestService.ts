export interface IArrangeCampRestService {
  pawnAmount: {
    rest: number;
    arrangeCamp: number;
  };
  arrangeCampBonus: "determination" | "morale" | null;
  renderData: IArrangeCampRestServiceRenderData;
}

export interface IArrangeCampRestServiceRenderData {
  pawnAmount: {
    rest: number;
    arrangeCamp: number;
  };
  arrangeCampBonus: "determination" | "morale" | null;
}
