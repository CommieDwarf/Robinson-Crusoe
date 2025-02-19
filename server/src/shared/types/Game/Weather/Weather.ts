import { WeatherDiceResult, WeatherDiceResults } from "../RollDice/RollDice";

export type Cloud = "rain" | "snow";

export interface IWeatherTokens {
	rain: boolean;
	snow: boolean;
	storm: boolean;
}

export interface OverallWeather {
	rain: number;
	snow: number;
	animals: WeatherDiceResult | null;
	storm: boolean;
}

export interface WeatherModifiers {
	rain: number;
	snow: number;
}

export interface IWeatherService {
	tokens: IWeatherTokens;
	modifiers: WeatherModifiers;
	rollDiceResult: WeatherDiceResults | null;
	shouldRollDices: boolean;
	furnace: boolean;
	getOverallWeather: () => OverallWeather;
	setToken: (
		type: keyof IWeatherTokens,
		value: boolean,
		logSource: string
	) => void;
	rollDices: () => void;
	incrementModifier: (
		type: keyof WeatherModifiers,
		value: number,
		sourceLog: string
	) => void;
	applyEffects: () => void;
	renderData: IWeatherServiceRenderData;
}

export interface IWeatherServiceRenderData {
	tokens: IWeatherTokens;
	overallWeather: OverallWeather;
	rollDiceResult: WeatherDiceResults | null;
	shouldRollDices: boolean;
}
