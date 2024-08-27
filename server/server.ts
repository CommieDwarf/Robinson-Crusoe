import {SessionService} from "./src/Classes/SessionService/SessionService";
import { SocketService } from "./src/Classes/SocketService/SocketService";
import { HttpService } from "./src/Classes/HttpService/HttpService";
import { PORT } from "./src/config/http";
import express from "express";
import {Server} from "socket.io";


//Don't delete. It configures passport and mopngoose globally.
require('./src/config/passport');
require("./src/config/mongoose");

const app = express();
const httpService = new HttpService(app);

const server = httpService.createServer();
export const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["POST", "GET"]
    }
});

const sessionService = new SessionService();
const socketService = new SocketService(io, sessionService);



socketService.startListening();
server.listen(PORT, () => {
    console.log('server running on port:', PORT);
})


