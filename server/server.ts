import {User, UserDocument} from "./src/Models/User";
import {NextFunction} from "express";
import {body, validationResult} from "express-validator";
import {jwtSecret} from "./src/config/jwt";
import {SessionService} from "./src/Classes/SessionService/SessionService";
import {GAME_SESSION_MODE} from "./src/types/Session/Session";
import {ActionPayload} from "./src/shared/types/Game/ActionPayload";
import {IGame} from "./src/shared/types/Game/Game";
import {jwtDecode} from "jwt-decode";

const passport = require("passport");
const {Socket} = require("socket.io");

const {MethodData} = require("./src/shared/types/MethodData");

const express = require("express");
const {Request, Response, NextFunction} = require('express');
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
            return res.status(400).json({message: 'Nieprawidłowe dane logowania.'});
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
                return res.status(201).json({
                    message: "Account created successfully", user: {
                        username: body.username,
                        email: body.email,
                    }
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
    console.log(socket.handshake);
    console.log("verifing socket...", token);
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


interface SocketPayload {
    userId: string
}

interface TokenPayload {
    _id: string;
}

io.on("connection", (socket: typeof Socket) => {
    const userId = jwtDecode<TokenPayload>(socket.handshake.headers.authorization)._id;
    console.log(userId);
    socket.on("create_quick_game", async (payload: SocketPayload) => {
        try {
            const user = await User.findOne({_id: userId});
            if (!user) {
                throw new Error("Can't find user");
            }
            const gameSession = sessionService.createSession({
                username: user.username,
                _id: user._id.toString(),
            }, GAME_SESSION_MODE.QUICK);

            const gameRenderData = gameSession.getGame()?.renderData;
            if (!gameRenderData) {
                throw new Error("Game couldn't be instanced")
            }

            const responsePayload = {
                gameRenderData,
                gameSessionId: gameSession.id
            }
            console.log("game created");
            if (gameRenderData) {
                socket.emit("game_instance_sent", responsePayload)
            }

        } catch (e) {
            console.error(e);
        }
    })


    socket.on("game_instance_requested", (payload: SocketPayload) => {
        const game = sessionService.getSession(userId).getGame();
        if (!game) {
            throw new Error("Game session not found");
        }
        console.log("game instance requested!")
        socket.emit("game_instance_sent", game.renderData);
    })

    socket.on("disconnect", () => {
        // sessionService.closeSession(gameSession.id);
    })

    socket.on("player_action", async (actionData: ActionPayload) => {
        const gameSession = sessionService.getSession(userId);
        console.log(gameSession, actionData);
        gameSession.handleAction(userId, actionData.actionType, ...actionData.arguments);
        const game = gameSession.getGame();
        if (!game) {
            throw new Error("Game not found")
        }
        socket.emit("game_instance_sent", game.renderData);
    })

    socket.on("execute_game_method_and_send_response", (methodData: typeof MethodData) => {
        const game = sessionService.getSession(userId).getGame();
        if (!game) {
            throw new Error("Can't find game session")
        }
        const {methodName, methodArgs}: { methodName: keyof IGame, methodArgs: any[] } = methodData;
        if (typeof game[methodName] === 'function') {
            //@ts-ignore
            const func = game[methodName].bind(game) as Function;
            const result = func(...methodArgs);
            socket.emit("game_method_response", {result});
        } else {
            console.error(`Method ${String(methodName)} does not exist on game instance.`);
        }
    });
})


server.listen(PORT, () => {
    console.log('server running on port:', PORT);
})


