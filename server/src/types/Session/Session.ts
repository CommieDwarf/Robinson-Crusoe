import {IUser} from "../UserData/IUser";
import {IPlayer} from "@shared/types/Game/PlayerService/Player";
import {PAWN_COLOR} from "@shared/types/Game/PAWN_COLOR";
import {BaseController} from "../GameController/Controllers";
import {CONTROLLER_ACTION} from "@shared/types/CONTROLLER_ACTION";
import {IGame} from "@shared/types/Game/Game";


export interface SessionData {
    players: IPlayer[];
    id: string;

    mode: GAME_SESSION_MODE;
    joinSession: (user: IUser) => void;
    leaveSession: (user: IUser) => void;
    startGame: () => BaseController;
    assignColor: (userId: string, color: PAWN_COLOR) => void;

    handleAction: (userId: string, action: CONTROLLER_ACTION, ...args: any[]) => void;

    gameController: BaseController | null;

    getGame: () => IGame | undefined;
}

export enum GAME_SESSION_MODE {
    PRIVATE = "private",
    PUBLIC = "public",
    QUICK = "quick"
}
