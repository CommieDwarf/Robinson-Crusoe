import {Dispatch, Middleware, MiddlewareAPI} from "redux";
import {SOCKET_EVENT, SocketPayloadMap} from "@shared/types/Requests/Socket";
import {store, RootState} from "../store/store";
import {Socket} from "socket.io-client";
import {connectedUpdated} from "../reduxSlices/auth";
import {
    ModifiedPayload, SocketActions,
    SocketConnectAction,
    SocketDisconnectAction,
    SocketEmitAction
} from "../types/middleware/SocketMiddleware";
import {ActionArgMap} from "@shared/types/ActionArgMap";

export const SOCKET_CONNECT = "socket connect";
export const SOCKET_DISCONNECT = "socket disconnect";
export const SOCKET_EMIT = "socket emit";
export const SOCKET_EMIT_ACTION = "socket emit action";

export const socketConnect = (payload: { authToken: string }): SocketConnectAction => ({
    type: SOCKET_CONNECT,
    payload
});
export const socketDisconnect = (): SocketDisconnectAction => ({type: SOCKET_DISCONNECT});
export const socketEmit = <T extends SOCKET_EVENT>(event: T, payload: ModifiedPayload<T>): SocketEmitAction<T> => ({
    type: SOCKET_EMIT,
    event,
    payload
});


export const socketEmitAction = <A extends keyof ActionArgMap>(action: A, ...args: ActionArgMap[A]) => {
    return socketEmit(SOCKET_EVENT.PLAYER_ACTION, {
        actionType: action,
        arguments: args,
        hydrateSessionId: true
    })
}


const socketMiddleware = (socket: Socket): Middleware => (api: MiddlewareAPI<Dispatch<SocketActions>, typeof store>) => (next: Dispatch<SocketActions>) => {
    const emitQueue: SocketEmitAction<SOCKET_EVENT>[] = [];
    return (action: any) => {

        if (api) {
            const store = api.getState();

            switch (action.type) {
                case SOCKET_CONNECT:
                    console.log(action);
                    socket.io.opts.extraHeaders = {
                        Authorization: action.payload.authToken,
                    };
                    socket.on(SOCKET_EVENT.CONNECTED, () => {
                        console.log('Socket connected');
                        // store.dispatch(connectedUpdated(true))
                        if (emitQueue.length > 0) {
                            emitQueue.forEach((action) => {
                                socket.emit(action.event, hydratePayload(action.payload));
                            })
                        }
                    });
                    socket.on('disconnect', () => {
                        console.log('Socket disconnected');
                        store.dispatch(connectedUpdated(false))
                    });
                    
                    console.log("TRYING TO CONNECT");
                    socket.connect()
                    break;
                case SOCKET_DISCONNECT:
                    socket.close();
                    break;
                case SOCKET_EMIT:
                    if (!socket.connected) {
                        emitQueue.push(action);
                    }
                    console.log('emiting', action.event, hydratePayload(action.payload))
                    socket.emit(action.event, hydratePayload(action.payload));
                    break;
                case SOCKET_EMIT_ACTION:
                    if (!socket.connected) {
                        emitQueue.push(action);
                        socket.emit(action.event, hydratePayload({
                            ...action.payload,
                            hydrateSessionId: true
                        }))
                    }
            }
        }


        return next(action);


        function hydratePayload<T extends keyof SocketPayloadMap, P extends ModifiedPayload<T>>(payload: P): SocketPayloadMap[T] {
            if (payload && "hydrateSessionId" in payload) {
                // const sessionId = api.getState().getState().gameSession.data?.id;
                const state = api.getState() as unknown as RootState;
                return {
                    ...payload,
                    sessionId: state.gameSession.sessionId
                }
            }
            return payload;
        }
    };
};

export default socketMiddleware;
