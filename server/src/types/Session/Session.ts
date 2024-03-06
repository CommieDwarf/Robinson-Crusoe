import {UserData} from "../UserData/UserData";
import {IPlayer} from "@shared/types/Game/PlayerService/Player";
import {PAWN_COLOR} from "@shared/types/Game/PAWN_COLOR";
import {BaseController} from "../GameController/Controllers";
import {CONTROLLER_ACTION} from "@shared/types/CONTROLLER_ACTION";


export interface SessionData {
    players: IPlayer[];
    id: string;
    joinSession: (user: UserData) => void;
    leaveSession: (user: UserData) => void;
    startGame: () => BaseController;
    assignColor: (user: UserData, color: PAWN_COLOR) => void;

    handleAction: (user: UserData, action: CONTROLLER_ACTION, ...args: any[]) => void;

    gameController: BaseController | null;

}
