import {SCENARIO} from "@shared/types/Game/ScenarioService/SCENARIO";

export interface SessionSettings {
    scenario: SCENARIO,
    name: string,
    quickGame: boolean,
    private: boolean,
    password: string,
    maxPlayers: number,
}
