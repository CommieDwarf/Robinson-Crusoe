import {User, UserDocument} from "./src/Models/User";
import {NextFunction} from "express";
import {body, validationResult} from "express-validator";
import {jwtSecret} from "./src/config/jwt";
import {SessionService} from "./src/Classes/SessionService/SessionService";
import {jwtDecode} from "jwt-decode";
import {SOCKET_EMITTER, SocketPayloadMap} from "./src/shared/types/Requests/Socket";
import {ForbiddenPlayerAction} from "./src/Errors/ForbiddenPlayerAction";
import {SessionConnectError} from "./src/Errors/Session/SessionConnectError";

const passport = require("passport");
const {Socket} = require("socket.io");


const express = require("express");
const {Request, Response} = require('express');
const app = express();
const http = require("http");
const cors = require("cors");
const server = http.createServer(app);
const {Server} = require("socket.io");
const session = require('express-session');
const jwt = require("jsonwebtoken")

require('./src/config/passport');
require("./src/config/mongoose");

const PORT = 3030;

app.use(cors({
    origin: '*',
    exposedHeaders: "authorization"
}));

app.use(express.json())

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


export const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["POST", "GET"]
    }
});


// @ts-ignore
app.post('/login', (req, res, next: NextFunction) => {
    passport.authenticate('local', (err: Error, user: UserDocument, info: any) => {
        if (err || !user) {
            return res.status(401).json({message: 'Nieprawidłowe dane logowania.'});
        }

        req.login(user, {session: false}, (err: Error) => {
            if (err) {
                res.status(500).json({message: 'Błąd logowania.'});
            }
            const token = jwt.sign({_id: user._id}, jwtSecret, {expiresIn: '1h'});
            res.setHeader('Authorization', `Bearer ${token}`);
            return res.json({message: "Logged in successfully"});
        });
    })(req, res, next);
});

app.post("/register",
    body("username").trim().notEmpty().escape().custom(async (username) => {
        const user = await User.findOne({username});
        if (user) {
            throw new Error("Username already exists.")
        }
        return true;
    }),
    body("email").trim().notEmpty().isEmail().custom(async (email) => {
        const user = await User.findOne({email});
        if (user) {
            throw new Error("E-mail already exists.")
        }
        return true;
    }),
    body("password").trim().notEmpty().isLength({min: 8, max: 16}),
    async (req: typeof Request, res: typeof Response, next: NextFunction) => {
        const body = req.body as UserDocument;
        try {
            const result = validationResult(req);
            if (!result.isEmpty()) {
                return res.status(422).json({message: "Validation failed."})
            } else {
                const user = new User({
                    username: body.username,
                    email: body.email,
                    password: body.password
                })
                user.save();
                const token = jwt.sign({_id: user._id}, jwtSecret, {expiresIn: '1h'});
                res.setHeader('Authorization', `Bearer ${token}`);
                return res.status(201).json({
                    message: "Account created successfully"
                })
            }
        } catch (error) {
            return res.status(500).json({message: "Internal server error"})
        }
    })

app.post("/getUser", passport.authenticate("jwt", {session: false}), async (req: typeof Request, res: typeof Response) => {
    try {
        const user = req.user;
        if (!user) {
            throw new Error("User not found")
        }
        return res.status(200).json({
            username: user.username,
            email: user.email,
            _id: user._id,
        });
    } catch (error) {
        console.error('Błąd podczas pobierania danych użytkownika:', error);
        return res.status(500).json({message: "Internal server error"});
    }
});


app.get("/usernameExists/:username", async (req: typeof Request, res: typeof Request) => {
    const {username} = req.params;
    try {
        const user = await User.findOne({username});
        if (user) {
            return res.status(409).json({message: "Username is taken"});
        } else {
            return res.status(200).json({message: "Username is available"});
        }
    } catch (error) {
        return res.status(500).json({message: "Internal server error"});
    }
})
app.get("/emailExists/:email", async (req: typeof Request, res: typeof Request) => {
    const {email} = req.params;
    try {
        const user = await User.findOne({email});
        if (user) {
            return res.status(409).json({message: "Email is taken"});
        } else {
            return res.status(200).json({message: "Email is available"});
        }
    } catch (error) {
        return res.status(500).json({message: 'Wystąpił błąd serwera.'});
    }
})


io.use((socket: typeof Socket, next: Function) => {
    let token = socket.handshake.headers.authorization;
    token = token.split(" ")[1]; // removing "Bearer ";
    if (!token) {
        console.log("!token")
        return next(new Error("Authentication error: Token missing"));
    }

    try {
        socket.user = jwt.verify(token, jwtSecret, {});
        console.log(socket.user, "user verified");
        console.log("socked verified")
        next();
    } catch (error) {
        console.error(error);
        return next(new Error("Authentication error: Invalid token"));
    }
});

const sessionService = new SessionService();


interface TokenPayload {
    _id: string;
}


io.on("connection", async (socket: typeof Socket) => {
    try {
        const userId = jwtDecode<TokenPayload>(socket.handshake.headers.authorization)._id;

        const userDocument = await User.findOne({_id: userId});
        if (!userDocument) {
            socket.disconnect();
            return;
        }


        const emitSocket = getEmitSocket(socket);
        const setListener = getSetListener(socket);
        const user = sessionService.addToActiveUsers(userDocument, socket);

        socket.on(SOCKET_EMITTER.DISCONNECT, () => {
            console.log("disconnected")
            user.removeSocket(socket);
        })


        socket.on(SOCKET_EMITTER.CREATE_QUICK_GAME, async () => {
            console.log("CREATE QUICK GAME")
            sessionService.createQuickGameSession(user.id);
            emitSocket(SOCKET_EMITTER.GAME_SESSION_CREATED, {sessionId: "quickgame"})
        })

        socket.on(SOCKET_EMITTER.CREATE_SESSION, async (payload: SocketPayloadMap[SOCKET_EMITTER.CREATE_SESSION]) => {
            const settings = {...payload.settings, quickGame: false};
            const session = sessionService.createSession(user.id, settings);
            socket.join(session.id);
            if (!session.settings.private) {
                emitSocket(SOCKET_EMITTER.SESSION_LIST_CHANGED, {});
            }
            emitSocket(SOCKET_EMITTER.GAME_SESSION_CREATED, {sessionId: session.id})
        })

        socket.on(SOCKET_EMITTER.SESSION_DATA_REQUESTED, (payload: SocketPayloadMap[SOCKET_EMITTER.SESSION_DATA_REQUESTED]) => {
            let session;
            console.log("requested")
            if (payload.sessionId === "quickgame") {
                session = sessionService.getQuickGameByUserId(user.id);
                if (!session) {
                    session = sessionService.createQuickGameSession(user.id);
                }
            } else {
                console.log("searching for SESSION ID: ", payload.sessionId);
                session = sessionService.getSession(user.id, payload.sessionId);
                console.log("getting session", session);
                if (session && !session.isUserInSession(userId)) {
                    console.error("user not in session");
                    return;
                }
            }

            if (session) {
                console.log("sending data!")
                emitSocket(SOCKET_EMITTER.SESSION_DATA_SENT, {sessionData: session.getRenderData(user.id)})
            } else {
                //TODO: obsłuż wyjątek
            }
        })


        socket.on(SOCKET_EMITTER.PLAYER_ACTION,
            async (actionData: SocketPayloadMap[SOCKET_EMITTER.PLAYER_ACTION]) => {
                try {
                    console.log("SESSION ID", actionData.sessionId);
                    const session = sessionService.getSession(user.id, actionData.sessionId);
                    if (!session) {
                        throw new Error("Game session not found")
                    }
                    session.handleAction(user.id, actionData.actionType, ...actionData.arguments);
                    //TODO: Zrób autoryzację gracz - sesja
                    emitSocket(SOCKET_EMITTER.SESSION_DATA_SENT, {sessionData: session.getRenderData(user.id)});
                } catch (e) {
                    if (e instanceof ForbiddenPlayerAction) {
                        socket.emit("alert_sent", {message: e.message});
                    } else {
                        console.error(e);
                    }
                }

            })

        socket.on(SOCKET_EMITTER.EXECUTE_GAME_METHOD_AND_SEND_RESPONSE,
            (payload: SocketPayloadMap[SOCKET_EMITTER.EXECUTE_GAME_METHOD_AND_SEND_RESPONSE]) => {
                try {
                    const game = sessionService.getSession(user.id, payload.sessionId)?.getGame();
                    if (!game) {
                        throw new Error("Can't find game session")
                    }
                    const {methodName, methodArgs} = payload;
                    if (typeof game[methodName] === 'function') {
                        //@ts-ignore
                        const func = game[methodName].bind(game) as Function;
                        const result = func(...methodArgs);
                        socket.emit("game_method_response", {result});
                        emitSocket(SOCKET_EMITTER.GAME_METHOD_RESPONDED, {result, requestId: payload.requestId})
                    } else {
                        throw new Error(`Method ${String(methodName)} does not exist on game instance.`);
                    }
                } catch (e) {
                    console.error(e);
                }
            });

        socket.on(SOCKET_EMITTER.IS_QUICK_GAME_IN_PROGRESS_RESPONSE, () => {
            try {
                const game = sessionService.getQuickGameByUserId(user.id)?.getGame();
                emitSocket(SOCKET_EMITTER.IS_QUICK_GAME_IN_PROGRESS_RESPONSE, {value: Boolean(game)});
            } catch (e) {
                console.error(e);
            }
        })

        socket.on(SOCKET_EMITTER.SESSION_LIST_REQUESTED, () => {
            emitSocket(SOCKET_EMITTER.SESSION_LIST_SENT, {sessionList: sessionService.getPublicSessionList()});
        })

        socket.on(SOCKET_EMITTER.JOIN_SESSION, (payload: SocketPayloadMap[SOCKET_EMITTER.JOIN_SESSION]) => {
            try {
                if (sessionService.userInSession(user.id, payload.sessionId)) {
                    emitSocket(SOCKET_EMITTER.JOIN_SESSION_RESPONSE, {
                        sessionId: payload.sessionId,
                    })
                    return;
                }
                sessionService.joinSession(user, payload.sessionId, payload.password);
                socket.join(payload.sessionId);
                socket.to(payload.sessionId).emit(SOCKET_EMITTER.SESSION_CHANGED)
                emitSocket(SOCKET_EMITTER.JOIN_SESSION_RESPONSE, {
                    sessionId: payload.sessionId,
                })
                emitSocket(SOCKET_EMITTER.SESSION_LIST_CHANGED, {});
            } catch (error) {
                if (error instanceof SessionConnectError) {
                    emitSocket(SOCKET_EMITTER.JOIN_SESSION_RESPONSE, {
                        sessionId: payload.sessionId,
                        error: error.code,
                    })
                }
            }
        })

        socket.on(SOCKET_EMITTER.LEAVE_SESSION, (payload: SocketPayloadMap[SOCKET_EMITTER.LEAVE_SESSION]) => {
            console.log("got leave session request!")
            sessionService.leaveSession(user, payload.sessionId);
            socket.to(payload.sessionId).except(socket.id).emit(SOCKET_EMITTER.SESSION_CHANGED);
            emitSocket(SOCKET_EMITTER.SESSION_LIST_CHANGED, {});
            socket.leave(payload.sessionId);
        })

        socket.on(SOCKET_EMITTER.CHANGE_CHARACTER, (payload: SocketPayloadMap[SOCKET_EMITTER.CHANGE_CHARACTER]) => {
            const session = sessionService.getSession(userId, payload.sessionId);
            if (!session || (session && session.isGameInProgress)) {
                return;
            }
            session.changeCharacter(user.id, payload.character);
            console.log("character changed!", payload.character.char);
            io.to(session.id).emit(SOCKET_EMITTER.SESSION_CHANGED);
        })

        socket.on(SOCKET_EMITTER.SET_PLAYER_READY, (payload: SocketPayloadMap[SOCKET_EMITTER.SET_PLAYER_READY]) => {
            const session = sessionService.getSession(userId, payload.sessionId);
            if (!session || (session && session.isGameInProgress)) {
                return;
            }
            session.setPlayerReady(userId, payload.value);
            io.to(session.id).emit(SOCKET_EMITTER.SESSION_CHANGED);
        })

        setListener(SOCKET_EMITTER.KICK_PLAYER, async (payload) => {
            const session = sessionService.getSession(userId, payload.sessionId);
            if (!session || (session && session.isGameInProgress) || session.host !== user) {
                return;
            }
            const kickedPlayer = session.players.find((pl) => pl.id === payload.playerId);
            if (!kickedPlayer) {
                console.error("SHIT");
                return;
            }
            session.kickPlayer(kickedPlayer.id);
            const allUsersSockets: (typeof Socket)[] = await io.of("/").in(session.id).fetchSockets();
            const userSockets: typeof Socket = kickedPlayer.user.sockets;
            if (userSockets.length === 0) {
                return;
            }
            userSockets.forEach((socket: typeof Socket) => socket.leave(session.id))
            io.to(session.id).emit(SOCKET_EMITTER.SESSION_CHANGED);
            emitSocket(SOCKET_EMITTER.SESSION_LIST_CHANGED, {});
            userSockets.forEach((socket: typeof Socket) => socket.emit(SOCKET_EMITTER.PLAYER_KICKED, {}))
        })

        setListener(SOCKET_EMITTER.SEND_MESSAGE, (payload) => {
            sessionService.addMessage(user.id, payload.message, payload.sessionId);
            io.to(payload.sessionId).emit(SOCKET_EMITTER.SESSION_CHANGED);
        })

        setListener(SOCKET_EMITTER.UPDATE_SESSION_SETTINGS, (payload) => {
            sessionService.updateSessionSettings(userId, payload.sessionId, payload.settings);
            io.to(payload.sessionId).emit(SOCKET_EMITTER.SESSION_CHANGED);
            console.log("update session settings received", payload.settings.maxPlayers)
        })

        setListener(SOCKET_EMITTER.START_GAME, (payload) => {
            try {
                sessionService.startGame(userId, payload.sessionId);
                console.log("STARTING GAME WITH ID: ", payload.sessionId);
                io.to(payload.sessionId).emit(SOCKET_EMITTER.GAME_STARTED, payload);
            } catch (e) {
                console.error(e);
            }
        })

        setListener(SOCKET_EMITTER.USER_LEFT_LOBBY, payload => {
            try {
                const session = sessionService.getSession(user.id, payload.sessionId);
                if (session && !session.isGameInProgress) {
                    console.log("user left lobby. Leaving session!")
                    sessionService.leaveSession(user, session.id);
                }
            } catch (e) {
                console.error(e);
            }
        })

        setListener(SOCKET_EMITTER.GAMES_IN_PROGRESS_LIST_REQUESTED, () => {
            emitSocket(SOCKET_EMITTER.SESSION_LIST_SENT, {
                sessionList: user.activeSessions
                    .filter((session) => session.isGameInProgress)
                    .map(session => session.getBasicInfo())
            })
        })

    } catch (e) {
        console.error(e)
    }
})


server.listen(PORT, () => {
    console.log('server running on port:', PORT);
})


function getSetListener(socket: typeof Socket) {
    return function <T extends keyof SocketPayloadMap>(socketEmitter: T, func: (payload: SocketPayloadMap[T]) => void) {
        return socket.on(socketEmitter, func);
    }
}

function getEmitSocket(socket: typeof Socket) {
    return function <T extends keyof SocketPayloadMap>(socketEmitter: T, payload: SocketPayloadMap[T]) {
        socket.emit(socketEmitter, payload);
    }
}

function emitChangeAndLeaveRoom(socket: typeof Socket, sessionId: string) {
    socket.to(sessionId).except(socket.id).emit(SOCKET_EMITTER.SESSION_CHANGED);
    socket.leave(sessionId);
}
