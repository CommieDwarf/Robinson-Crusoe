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
exports.HttpService = void 0;
const passport_1 = __importDefault(require("passport"));
const User_1 = require("../../Models/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_validator_1 = require("express-validator");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const http_1 = __importDefault(require("http"));
const generateAvatar_1 = require("../../utils/generateAvatar");
const config_1 = require("../../config/config");
class HttpService {
    constructor(app, emailService) {
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            passport_1.default.authenticate('local', (err, user, info) => {
                try {
                    if (err || !user) {
                        return res.status(401).json({ message: 'Nieprawidłowe dane logowania.' });
                    }
                    req.login(user, { session: false }, (err) => {
                        if (err) {
                            res.status(500).json({ message: 'Błąd logowania.' });
                        }
                        const token = jsonwebtoken_1.default.sign({ userId: user._id }, config_1.config.server.jwtSecret);
                        res.setHeader('Authorization', `Bearer ${token}`);
                        return res.json({ message: "Logged in successfully" });
                    });
                }
                catch (e) {
                    console.error(e);
                }
            })(req, res, next);
        });
        this.register = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            try {
                const result = (0, express_validator_1.validationResult)(req);
                if (!result.isEmpty()) {
                    return res.status(422).json({ message: "Validation failed." });
                }
                else {
                    const user = new User_1.User({
                        username: body.username,
                        email: body.email,
                        password: body.password
                    });
                    yield user.save();
                    const token = jsonwebtoken_1.default.sign({ userId: user._id }, config_1.config.server.jwtSecret);
                    this._emailService.sendActivationMail({ id: user.id, username: user.username, email: user.email });
                    res.setHeader('Authorization', `Bearer ${token}`);
                    return res.status(201).json({ message: "Account created successfully" });
                }
            }
            catch (error) {
                console.warn(error);
                return res.status(500).json({ message: "Internal server error" });
            }
        });
        this.getUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                if (!user) {
                    throw new Error("User not found");
                }
                return res.status(200).json({
                    username: user.username,
                    email: user.email,
                    _id: user._id,
                    avatar: (0, generateAvatar_1.generateAvatar)(user.username),
                    emailVerified: user.emailVerified
                });
            }
            catch (error) {
                console.error('Błąd podczas pobierania danych użytkownika:', error);
                return res.status(500).json({ message: "Internal server error" });
            }
        });
        this.usernameExists = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { username } = req.params;
            try {
                const user = yield User_1.User.findOne({ username });
                if (user) {
                    return res.status(409).json({ message: "Username is taken" });
                }
                else {
                    return res.status(200).json({ message: "Username is available" });
                }
            }
            catch (error) {
                return res.status(500).json({ message: "Internal server error" });
            }
        });
        this.emailExists = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email } = req.params;
            try {
                const user = yield User_1.User.findOne({ email });
                if (user) {
                    return res.status(409).json({ message: "Email is taken" });
                }
                else {
                    return res.status(200).json({ message: "Email is available" });
                }
            }
            catch (error) {
                return res.status(500).json({ message: 'Wystąpił błąd serwera.' });
            }
        });
        this.verifyEmail = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("GOT REQUEST!");
                const { token } = req.params;
                console.log("TOKEN", token);
                if (!token) {
                    res.status(401).json({ message: "token is required" });
                    console.warn("token is required");
                    return;
                }
                const decoded = jsonwebtoken_1.default.verify(token, config_1.config.server.jwtSecret);
                const userId = decoded.userId;
                if (!userId) {
                    res.status(400).json({ message: "E-mail verification failed" });
                    console.warn("Can't get userId from token");
                    return;
                }
                yield User_1.User.updateOne({ _id: decoded.userId }, { emailVerified: true });
                res.status(200).json({ message: "E-mail verified" });
            }
            catch (e) {
                res.status(400).json({ message: "E-mail verification failed" });
                console.warn(e);
            }
        });
        this.resendVerificationEmail = (req, res) => {
            const user = req.user;
            if (!user) {
                throw new Error("User not found");
            }
            try {
                this._emailService.reSendActivationEmail({ username: user.username, id: user._id, email: user.email });
                res.status(200).json({ message: "E-mail sent" });
            }
            catch (e) {
                console.error(e);
                res.status(400).json({ message: "Something went wrong" });
            }
        };
        this._emailService = emailService;
        this.initialize(app);
        this._app = app;
    }
    createServer() {
        return http_1.default.createServer(this._app);
    }
    initialize(app) {
        app.use((0, cors_1.default)({
            origin: '*',
            exposedHeaders: "authorization"
        }));
        app.use(express_1.default.json());
        app.use((0, express_session_1.default)({
            secret: 'your-secret-key',
            resave: false,
            saveUninitialized: false
        }));
        app.use(passport_1.default.initialize());
        app.use(passport_1.default.session());
        app.post('/login', this.login);
        app.post('/register', this.register);
        app.post("/getUser", passport_1.default.authenticate("jwt", { session: false }), this.getUser);
        app.post("/resend-verification-email", passport_1.default.authenticate("jwt", { session: false }), this.resendVerificationEmail);
        app.get("/usernameExists/:username", this.usernameExists);
        app.get("/emailExists/:email", this.emailExists);
        app.get("/getUserAvatar/:username", this.getUserAvatar);
        app.get("/verify-email/:token", this.verifyEmail);
    }
    getUserAvatar(req, res) {
        return res.json({ svg: (0, generateAvatar_1.generateAvatar)(req.params.username) });
    }
}
exports.HttpService = HttpService;
//# sourceMappingURL=HttpService.js.map