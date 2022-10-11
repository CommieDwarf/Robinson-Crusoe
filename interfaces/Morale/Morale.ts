export interface IMorale {
  lvl: number;
  lvlUp: (by: number) => void;
  lvlDown: (by: number) => void;
  getDetermination: () => void;
  renderData: IMoraleRenderData;
}

export interface IMoraleRenderData {
  lvl: number;
}