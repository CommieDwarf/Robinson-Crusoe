import {IGame} from "@shared/types/Game/Game";

export interface MethodData {
    methodName: keyof IGame,
    methodArgs: any[]
}
