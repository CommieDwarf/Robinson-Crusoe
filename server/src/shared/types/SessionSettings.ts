import {SCENARIO} from "@shared/types/Game/ScenarioService/SCENARIO";

export interface SessionSettings {
    scenario: SCENARIO,
    private: boolean,
    password: string,
    maxPlayers: number,
}
