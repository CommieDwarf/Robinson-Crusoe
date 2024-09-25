"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const SessionService_1 = require("./src/Classes/SessionService/SessionService");
const SocketService_1 = require("./src/Classes/SocketService/SocketService");
const HttpService_1 = require("./src/Classes/HttpService/HttpService");
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const EmailService_1 = require("./src/Classes/EmailService/EmailService");
const config_1 = require("./src/config/config");
//Don't delete. It configures passport and mopngoose globally.
require('./src/config/passport');
require("./src/config/mongoose");
const app = (0, express_1.default)();
const emailService = new EmailService_1.EmailService();
const httpService = new HttpService_1.HttpService(app, emailService);
const server = httpService.createServer();
exports.io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["POST", "GET"]
    }
});
const sessionService = new SessionService_1.SessionService();
const socketService = new SocketService_1.SocketService(exports.io, sessionService);
socketService.startListening();
server.listen(config_1.config.server.port, () => {
    console.log('server running on port:', config_1.config.server.port);
});
// async function migrateUserProfiles() {
//   await User.updateMany(
//       { emailVerified: { $exists: false } },
//       { $set: { emailVerified: false } } // Ustaw domyślną wartość
//   );
//   console.log('Migration completed');
// }
// migrateUserProfiles();
//# sourceMappingURL=server.js.map