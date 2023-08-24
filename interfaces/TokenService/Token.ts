import {IPlayerCharacter} from "../Characters/Character";
import {IPlayerCharacter} from "../Characters/PlayerCharacter";

export interface IToken {
    name: DISCOVERY_TOKEN;
    namePL: string;
    description: string;
    used: boolean;
    renderData: ITokenRenderData;
    //TODO: ADD TARGET PARAMETER
    use: (user: IPlayerCharacter, target: IPlayerCharacter | null) => void;
    autoDiscard: () => void;
    id: string;
}

export interface ITokenRenderData {
    name: DISCOVERY_TOKEN;
    namePL: string;
    description: string;
    id: string;
}

export enum DISCOVERY_TOKEN {
    CANDLES = "candles",
    FALLEN_TREE = "fallen tree",
    GOAT = "goat",
    HERBS = "herbs",
    HEALING_HERBS = "healing herbs",
    LARGE_LEAVES = "large leaves",
    NOURISHING_LARVAE = "nourishing larvae",
    OLD_MACHETE = "old machete",
    POISON = "poison",
    TREASURE = "treasure",
    THORNY_BUSHES = "thorny bushes",
    TOBACCO = "tobacco",
    VEGETABLES = "vegetables",
    SCENARIO_1 = "scenario 1",
    SCENARIO_2 = "scenario 2",
    SCENARIO_3 = "scenario 3",
    SCENARIO_4 = "scenario 4",
}
