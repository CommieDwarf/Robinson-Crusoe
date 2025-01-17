export interface IMoraleService {
    lvl: number;
    lvlUp: (by: number, sourceLog: string) => void;
    lvlDown: (by: number, sourceLog: string) => void;
    triggerPhaseEffect: () => void;
    renderData: IMoraleRenderData;
    diary: boolean;
    drums: boolean;
    prePhaseEffect: () => void;
}

export interface IMoraleRenderData {
    lvl: number;
}
