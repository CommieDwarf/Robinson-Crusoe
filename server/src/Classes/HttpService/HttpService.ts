import { NextFunction } from "express";
import passport from "passport";
import { User, UserDocument } from "../../Models/User";
import {Request, Response} from "express";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../../config/jwt";
import { validationResult } from "express-validator";
import cors from "cors";
import express from "express";
import session from 'express-session';
import App from "express";
import http from "http";

export class HttpService {

    private _app: ReturnType<typeof App>;

    constructor(app: ReturnType<typeof App>) {
        this.initialize(app);
        this._app = app;
    }

    public createServer() {
        return http.createServer(this._app);
    }

    private initialize(app: ReturnType<typeof App>) {
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

        app.post('/login', this.login);
        app.post('/register', this.register);
        app.post("/getUser", passport.authenticate("jwt", { session: false }), this.getUser);
        app.get("/usernameExists/:username", this.usernameExists);
        app.get("/emailExists/:email", this.emailExists);
    }

    private async login(req: Request, res: Response, next: NextFunction) {
        passport.authenticate('local', (err: Error, user: UserDocument, info: any) => {
            if (err || !user) {
                return res.status(401).json({ message: 'Nieprawidłowe dane logowania.' });
            }

            req.login(user, { session: false }, (err: Error) => {
                if (err) {
                    res.status(500).json({ message: 'Błąd logowania.' });
                }
                const token = jwt.sign({ _id: user._id }, jwtSecret, { expiresIn: '1h' });
                res.setHeader('Authorization', `Bearer ${token}`);
                return res.json({ message: "Logged in successfully" });
            });
        })(req, res, next);
    }

    private async register(req: Request, res: Response, next: NextFunction) {
        const body = req.body as UserDocument;
        try {
            const result = validationResult(req);
            if (!result.isEmpty()) {
                return res.status(422).json({ message: "Validation failed." });
            } else {
                const user = new User({
                    username: body.username,
                    email: body.email,
                    password: body.password
                })
                await user.save();
                const token = jwt.sign({ _id: user._id }, jwtSecret);
                res.setHeader('Authorization', `Bearer ${token}`);
                return res.status(201).json({ message: "Account created successfully" });
            }
        } catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    private async getUser(req: Request, res: Response) {
        try {
            const user = req.user as UserDocument;
            if (!user) {
                throw new Error("User not found");
            }
            return res.status(200).json({
                username: user.username,
                email: user.email,
                _id: user._id,
            });
        } catch (error) {
            console.error('Błąd podczas pobierania danych użytkownika:', error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    private async usernameExists(req: Request, res: Response) {
        const { username } = req.params;
        try {
            const user = await User.findOne({ username });
            if (user) {
                return res.status(409).json({ message: "Username is taken" });
            } else {
                return res.status(200).json({ message: "Username is available" });
            }
        } catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    private async emailExists(req: Request, res: Response) {
        const { email } = req.params;
        try {
            const user = await User.findOne({ email });
            if (user) {
                return res.status(409).json({ message: "Email is taken" });
            } else {
                return res.status(200).json({ message: "Email is available" });
            }
        } catch (error) {
            return res.status(500).json({ message: 'Wystąpił błąd serwera.' });
        }
    }
}
