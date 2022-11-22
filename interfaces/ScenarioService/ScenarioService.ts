export enum SCENARIO_STATUS {
  DEFEAT = "defeat",
  WIN = "win",
  PENDING = "pending",
}

export interface IScenarioService {
  weather: WeatherDays;
  text: ScenarioText;
  renderData: IScenarioServiceRenderData;
  status: SCENARIO_STATUS;
  checkStatus: () => void;
  woodStashLvl: number;
}

export interface WeatherDays {
  rain: number[];
  snow: number[];
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
}
