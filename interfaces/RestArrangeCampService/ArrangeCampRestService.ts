export interface IArrangeCampRestService {
  pawnAmount: {
    rest: number;
    arrangeCamp: number;
  };
  arrangeCampBonus: "determination" | "morale" | null;
  renderData: IArrangeCampRestServiceRenderData;
  bed: boolean;
}

export interface IArrangeCampRestServiceRenderData {
  pawnAmount: {
    rest: number;
    arrangeCamp: number;
  };

  arrangeCampBonus: "determination" | "morale" | null;
}
