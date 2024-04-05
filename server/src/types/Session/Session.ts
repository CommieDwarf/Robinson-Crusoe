import {IUser} from "../UserData/IUser";
import {IPlayer} from "@shared/types/Game/PlayerService/Player";
import {PAWN_COLOR} from "@shared/types/Game/PAWN_COLOR";
import {BaseController} from "../GameController/Controllers";
import {CONTROLLER_ACTION} from "@shared/types/CONTROLLER_ACTION";
import {IGame} from "@shared/types/Game/Game";
import {SessionSettings} from "@shared/types/SessionSettings";


export interface SessionData {
    players: IPlayer[];
    id: string;
    
    settings: SessionSettings;
    joinSession: (user: IUser) => void;
    leaveSession: (user: IUser) => void;
    startGame: () => BaseController;
    assignColor: (userId: string, color: PAWN_COLOR) => void;
    handleAction: (userId: string, action: CONTROLLER_ACTION, ...args: any[]) => void;
    gameController: BaseController | null;
    getGame: () => IGame | undefined;
}
