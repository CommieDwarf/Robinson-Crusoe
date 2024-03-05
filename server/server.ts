import {Socket} from "socket.io";

const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const server = http.createServer(app);
const {Server} = require("socket.io");
const {gameService} = require("./src/Game/gameService");


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


io.on("connection", (socket: Socket) => {


    socket.on("game_instance_requested", () => {
        gameService.createGame();
        socket.emit("game_instance_sent", gameService.game.renderData)
    })

    console.log("connected!", socket)
})


server.listen(PORT, () => {
    gameService.createGame()
    console.log('server running on port:', PORT);
})

export {}
