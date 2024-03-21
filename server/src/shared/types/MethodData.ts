import {IGame} from "@shared/types/Game/Game";

export interface MethodData {
    userId: string,
    methodName: keyof IGame,
    methodArgs: any[]
}
