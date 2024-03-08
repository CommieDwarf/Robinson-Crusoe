const {Socket} = require("socket.io");
const {CONTROLLER_ACTION} = require("./src/shared/types/CONTROLLER_ACTION");
const {SessionData} = require("./src/types/Session/Session");
const {BaseController} = require("./src/types/GameController/Controllers");
const {IGame} = require("./src/shared/types/Game/Game");
const {UserData} = require("./src/types/UserData/UserData");
const {SessionService} = require("./src/Classes/SessionService/SessionService");
const {User} = require("./src/Classes/User/User");
const {MethodData} = require("./src/shared/types/MethodData");


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


export interface ActionPayload {
    actionType: typeof CONTROLLER_ACTION,
    arguments: any[],

}

const user = new User("ID", "Konrad");
const session = sessionService.createSession(user);
const gameController: typeof BaseController = session.startGame();
const game: typeof IGame = gameController.game;

io.on("connection", (socket: typeof Socket) => {

    if (!session) {
        throw new Error("SHIT");
    }


    socket.on("game_instance_requested", () => {
        socket.emit("game_instance_sent", game.renderData);
    })

    socket.on("disconnect", () => {
        sessionService.closeSession(session.id);
    })

    socket.on("playerAction", (actionData: ActionPayload) => {
        console.log("playerAction", actionData)
        session.handleAction(user, actionData.actionType, ...actionData.arguments);
        socket.emit("game_instance_sent", game.renderData);
    })

    socket.on("executeGameMethodAndSendResponse", (methodData: typeof MethodData) => {
        const {methodName, methodArgs} = methodData;

        if (typeof game[methodName] === 'function') {
            const func = game[methodName].bind(game) as Function;
            console.log(func.prototype)
            const result = func(...methodArgs);

            socket.emit("gameMethodResponse", {result});
        } else {
            console.error(`Method ${methodName} does not exist on game instance.`);
        }
    });

    console.log("connected!", socket.id)

})


server.listen(PORT, () => {
    console.log('server running on port:', PORT);
})

