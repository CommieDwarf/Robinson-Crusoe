export interface IMorale {
  lvl: number;
  lvlUp: (by: number, sourceLog: string) => void;
  lvlDown: (by: number, sourceLog: string) => void;
  getDetermination: () => void;
  renderData: IMoraleRenderData;
}

export interface IMoraleRenderData {
  lvl: number;
}
