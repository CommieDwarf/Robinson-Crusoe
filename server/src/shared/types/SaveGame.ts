import {CONTROLLER_ACTION} from "@shared/types/CONTROLLER_ACTION";
import {SCENARIO} from "@shared/types/Game/ScenarioService/SCENARIO";
import {IPlayerSaveData} from "@shared/types/Game/PlayerService/Player";

export interface SaveStep {
    userId: string,
    action: CONTROLLER_ACTION,
    args: any[],
}


export interface SaveOverview {
    id: string,
    name: string,
    timestamp: number,
    round: number,
    scenario: SCENARIO,
    playerAmount: number,
    maxPlayers: number,
}
