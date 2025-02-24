import { IPlayerRenderData } from "../PlayerService/Player";
import { SCENARIO_STATUS } from "../ScenarioService/ScenarioService";

interface EndGameSummaryData {
	roundsSurvived: number;
}

export interface EndGameSummary extends EndGameSummaryData {
	status: SCENARIO_STATUS.DEFEAT | SCENARIO_STATUS.WIN;
	defeatReason: "death" | "failedObjective" | null;
	players: IPlayerRenderData[];
}
