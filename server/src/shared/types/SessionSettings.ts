import { SCENARIO } from "@shared/types/Game/ScenarioService/SCENARIO";

export interface DifficultySetup {
	dog: boolean;
	friday: boolean;
}

export interface DifficultySettings extends DifficultySetup {
	startingEquipment: number;
    scaled: boolean;
}

export interface SessionSettings {
	scenario: SCENARIO;
	name: string;
	quickGame: boolean;
	private: boolean;
	password: string;
	maxPlayers: number;
	difficultySettings: DifficultySettings;
}

interface SettingsDifficultyPartialOnly {
	difficultySettings?: Partial<DifficultySettings>;
}

export interface PartialSessionSettings
	extends Partial<Omit<SessionSettings, "difficultySettings">>,
		SettingsDifficultyPartialOnly {}
