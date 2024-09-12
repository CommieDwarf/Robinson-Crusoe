import {SessionService} from "./src/Classes/SessionService/SessionService";
import { SocketService } from "./src/Classes/SocketService/SocketService";
import { HttpService } from "./src/Classes/HttpService/HttpService";
import express from "express";
import {Server} from "socket.io";
import { EmailService } from "./src/Classes/EmailService/EmailService";
import { config } from "./src/config/config";


//Don't delete. It configures passport and mopngoose globally.
require('./src/config/passport');
require("./src/config/mongoose");


const app = express();
const emailService = new EmailService();
const httpService = new HttpService(app, emailService);

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
server.listen(config.server.port, () => {
    console.log('server running on port:', config.server.port);
})




// async function migrateUserProfiles() {
//   await User.updateMany(
//       { emailVerified: { $exists: false } },
//       { $set: { emailVerified: false } } // Ustaw domyślną wartość
//   );
//   console.log('Migration completed');
// }

// migrateUserProfiles();