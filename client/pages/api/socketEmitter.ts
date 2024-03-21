import {CONTROLLER_ACTION} from "@shared/types/CONTROLLER_ACTION";
import {ActionPayload} from "@shared/types/Game/ActionPayload";
import {ActionArgMap} from "@shared/types/ActionArgMap";
import {Socket} from "socket.io-client";
import {IGame} from "@shared/types/Game/Game";


export class SocketEmitter {
    private _userId: string = "";
    private _socket: Socket;

    constructor(socket: Socket) {
        this._socket = socket;
    }

    public initialize(userId: string) {
        console.log("init", userId);
        if (!userId) {
            throw new Error(`userId is ${userId}`)
        }
        this._userId = userId;
    }

    public emitAction<T extends CONTROLLER_ACTION>(action: T, ...args: ActionArgMap[T]) {
        const payload: ActionPayload = {
            actionType: action,
            arguments: args,
            userId: this._userId,
        }
        this._socket.emit("player_action", payload);
    }

    public connectSocketWithAuthToken(authToken: string) {
        if (!authToken) {
            throw new Error("authToken is missing")
        }
        console.log("connecting!", authToken);
        this._socket.io.opts.extraHeaders = {
            Authorization: authToken,
        };
        this._socket.connect();

        this._socket.on("connect", () => {
            console.log("socket connected!")
        })
    }

    public createQuickGame() {
        console.log(this._userId, "userID");
        this._socket.emit("create_quick_game", {userId: this._userId});
    }

    public requestGameInstance() {
        console.log("emitting request game instance", this._userId);
        this._socket.emit("game_instance_requested", {userId: this._userId});
    }

    public executeGameMethodAndSendResponse(methodName: keyof IGame, methodArgs: any[]) {
        this._socket.emit("execute_game_method_and_send_response", {methodName, methodArgs, userId: this._userId})
    }
}


