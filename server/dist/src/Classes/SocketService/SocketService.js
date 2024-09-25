"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketService = void 0;
const Socket_1 = require("../../shared/types/Requests/Socket");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../../Models/User");
const EventHandler_1 = require("./EventHandler/EventHandler");
const config_1 = require("../../config/config");
class SocketService {
    constructor(io, sessionService) {
        this._io = io;
        this._sessionService = sessionService;
    }
    startListening() {
        this._io.use(this.authenticateSocket.bind(this));
        this._io.on("connection", this.handleConnection.bind(this));
    }
    handleConnection(socket) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = this.getUserIdFromToken(socket.handshake.headers.authorization);
                const userDoc = yield User_1.User.findById(userId);
                if (!userDoc || !userDoc.emailVerified) {
                    socket.disconnect();
                    console.warn("no userDoc or mail not verified");
                    return;
                }
                console.log("user validated");
                const user = this._sessionService.getOrCreateUser(userDoc, socket);
                const eventHandler = new EventHandler_1.EventHandler(user, socket, this._io, this._sessionService);
                eventHandler.startListening();
                eventHandler.pingClient();
                this.socketEmit(socket, Socket_1.SOCKET_EVENT_SERVER.CONNECTED, null);
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    authenticateSocket(socket, next) {
        var _a;
        const token = (_a = socket.handshake.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            return next(new Error("Authentication error: Token missing"));
        }
        try {
            jsonwebtoken_1.default.verify(token, config_1.config.server.jwtSecret);
            next();
        }
        catch (error) {
            return next(new Error("Authentication error: Invalid token"));
        }
    }
    socketEmit(socket, event, payload) {
        socket.emit(event, payload);
    }
    getUserIdFromToken(authorization) {
        const token = authorization === null || authorization === void 0 ? void 0 : authorization.split(" ")[1];
        const decoded = jsonwebtoken_1.default.verify(token, config_1.config.server.jwtSecret);
        return decoded.userId;
    }
}
exports.SocketService = SocketService;
//# sourceMappingURL=SocketService.js.map