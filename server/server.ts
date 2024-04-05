import {User, UserDocument} from "./src/Models/User";
import {NextFunction} from "express";
import {body, validationResult} from "express-validator";
import {jwtSecret} from "./src/config/jwt";
import {SessionService} from "./src/Classes/SessionService/SessionService";
import {jwtDecode} from "jwt-decode";
import {
    CreateGamePayload,
    ExecuteGameMethodAndSendResponsePayload,
    GameInstanceSentPayload, IsGameInProgressResponsePayload,
    PlayerActionPayload
} from "./src/shared/types/Requests/Socket";
import {ForbiddenPlayerAction} from "./src/Errors/ForbiddenPlayerAction";
import {use} from "passport";

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


const io = new Server(server, {
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
        if (typeof token === "string") {
            socket.user = jwt.verify(token, jwtSecret, {});
            console.log(socket.user, "user verified");
        }
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
        const user = await User.findOne({_id: userId});
        const {username} = user;
        if (!user) {
            socket.disconnect();
            return;
        }

        socket.on("create_quick_game", async () => {
            sessionService.createQuickGame({_id: userId, username});
            sendGameInstance(userId, socket);
        })

        socket.on("create_session", async (payload: CreateGamePayload) => {
            const {settings} = payload;
            const session = sessionService.createSession({_id: userId, username}, settings);
        })

        socket.on("game_instance_requested", async () => {
            const gameInProgress = sessionService.hasSession(userId);
            if (!gameInProgress) {
                await sessionService.createQuickGame(user);
            }
            sendGameInstance(userId, socket);
        })

        socket.on("disconnect", () => {
            // sessionService.closeSession(gameSession.id);
        })

        socket.on("player_action", async (actionData: PlayerActionPayload) => {
            try {
                const gameSession = sessionService.getSessionByUserId(userId);
                if (!gameSession) {
                    throw new Error("Game session not found")
                }
                gameSession.handleAction(userId, actionData.actionType, ...actionData.arguments);
                const game = gameSession?.getGame();
                if (!game) {
                    throw new Error("Game not found")
                }
                const payload: GameInstanceSentPayload = {
                    gameSessionId: gameSession.id,
                    gameRenderData: game.renderData
                }
                socket.emit("game_instance_sent", payload);
            } catch (e) {
                if (e instanceof ForbiddenPlayerAction) {
                    socket.emit("alert_sent", {message: e.message});
                } else {
                    console.error(e);
                }
            }

        })

        socket.on("execute_game_method_and_send_response", (methodData: ExecuteGameMethodAndSendResponsePayload) => {
            try {
                const game = sessionService.getSessionByUserId(userId)?.getGame();
                if (!game) {
                    throw new Error("Can't find game session")
                }
                const {methodName, methodArgs} = methodData;
                if (typeof game[methodName] === 'function') {
                    //@ts-ignore
                    const func = game[methodName].bind(game) as Function;
                    const result = func(...methodArgs);
                    socket.emit("game_method_response", {result});
                } else {
                    throw new Error(`Method ${String(methodName)} does not exist on game instance.`);
                }
            } catch (e) {
                console.error(e);
            }

        });

        socket.on("is_game_in_progress", () => {
            try {
                const game = sessionService.getSessionByUserId(userId)?.getGame();
                const payload: IsGameInProgressResponsePayload = {
                    value: Boolean(game)
                }
                socket.emit("is_game_in_progress_response", payload)
            } catch (e) {
                console.error(e);
            }
        })
    } catch (e) {
        console.error(e)
    }
})

function sendSessionData(userId: string, sessionId: string) {

}

function sendGameInstance(userId: string, socket: typeof Socket) {
    try {
        const gameSession = sessionService.getSessionByUserId(userId)
        if (!gameSession) {
            throw new Error("Game session not found")
        }
        const game = gameSession?.getGame();
        if (!game) {
            throw new Error("Game Session not found!")
        }
        const payload: GameInstanceSentPayload = {
            gameRenderData: game.renderData,
            gameSessionId: gameSession.id,
        }
        console.log("game instance sent")
        socket.emit("game_instance_sent", payload);
    } catch (e) {
        console.error(e);
    }
}


server.listen(PORT, () => {
    console.log('server running on port:', PORT);
})


