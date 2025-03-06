import {SessionService} from "./src/Classes/SessionService/SessionService";
import { SocketService } from "./src/Classes/SocketService/SocketService";
import { HttpService } from "./src/Classes/HttpService/HttpService";
import express from "express";
import {Server} from "socket.io";
import { config } from "./src/config/config";


//global configs
require('./src/config/passport');
require("./src/config/mongoose");
require('./src/i18next/i18next');


const app = express();
const httpService = new HttpService(app);

const httpServer = httpService.createServer();
export const io = new Server(httpServer, {
    cors: {
        origin: config.server.clientUrls,
        methods: ["POST", "GET"]
    }
});

const sessionService = new SessionService();
const socketService = new SocketService(io, sessionService);


socketService.startListening();
httpServer.listen(config.server.port, () => {
    console.log('server running on port:', config.server.port);
})

