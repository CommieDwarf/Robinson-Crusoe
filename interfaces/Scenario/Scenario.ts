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

export interface ScenarioRenderData {
  weatherDays: WeatherDays;
  text: ScenarioText;
}
