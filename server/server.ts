import {Socket} from "socket.io";
import {SessionService} from "./src/SessionService/SessionService";
import {User} from "./src/User/User";
import {CONTROLLER_ACTION} from "@shared/types/CONTROLLER_ACTION";
import {SessionData} from "./src/types/Session/Session";
import {BaseController} from "./src/types/GameController/Controllers";
import {IGame} from "@shared/types/Game/Game";
import {UserData} from "./src/types/UserData/UserData";

const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const server = http.createServer(app);
const {Server} = require("socket.io");

const PORT = 3030;

app.use(cors({
    origin: '*'
}));

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["POST", "GET"]
    }
});


const sessionService = new SessionService();
const user = new User("ID", "Konrad");

const session = sessionService.createSession(user);


export interface ActionPayload {
    actionType: CONTROLLER_ACTION,
    arguments: any[],

}

io.on("connection", (socket: Socket) => {
    const session: SessionData = user.session;
    if (!session) {
        throw new Error("SHIT");
    }
    const gameController: BaseController = session.startGame();
    const game: IGame = gameController.game;

    socket.on("game_instance_requested", (payload) => {
        console.log(payload);
        socket.emit("game_instance_sent", game.renderData);
    })

    socket.on("disconnect", () => {
        sessionService.closeSession(session.id);
    })

    socket.on("playerAction", (actionData: ActionPayload) => {
        session.handleAction(user, actionData.actionType, ...actionData.arguments)
    })

    console.log("connected!", socket)

})


server.listen(PORT, () => {
    console.log('server running on port:', PORT);
})

export {}
