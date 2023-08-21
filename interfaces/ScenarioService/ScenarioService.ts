export enum SCENARIO_STATUS {
    DEFEAT = "defeat",
    WIN = "win",
    PENDING = "pending",
}

export interface IScenarioService {
    name: "castaways";
    weather: WeatherDays;
    text: ScenarioText;
    renderData: IScenarioServiceRenderData;
    status: SCENARIO_STATUS;
    checkWinLoseStatus: () => void;
    woodStashLvl: number;

    committedWood: number;

    addWood: () => void;
    onMastBuild: () => void;
}

export interface WeatherDays {
    rain: number[];
    winter: number[];
    animals: number[];
}

export interface ScenarioText {
    description: string;
    objective: string;
    mechanics: string;
}

export interface IScenarioServiceRenderData {
    weather: WeatherDays;
    text: ScenarioText;
    status: SCENARIO_STATUS;
    woodStashLvl: number,
    canAddWood: boolean,
    isFireBuilt: boolean,
    committedWood: number,
}
