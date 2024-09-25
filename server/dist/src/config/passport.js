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
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const User_1 = require("../Models/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const config_1 = require("./config");
const JwtStrategy = passport_jwt_1.default.Strategy;
const ExtractJwt = passport_jwt_1.default.ExtractJwt;
const jwtDecodeOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config_1.config.server.jwtSecret,
};
passport_1.default.use(new JwtStrategy(jwtDecodeOptions, (payload, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("auth");
        const currentTimestamp = Math.floor(Date.now() / 1000);
        if (payload.exp && payload.exp < currentTimestamp) {
            console.warn("token expired");
            return done(null, false, { message: 'Token expired' });
        }
        const user = yield User_1.User.findOne({ _id: payload.userId });
        if (!user) {
            console.warn("can't find user. ID: " + payload.userId);
            throw new Error("can't find user");
        }
        return done(null, user, payload.data);
    }
    catch (e) {
        console.error(e);
    }
})));
passport_1.default.use(new passport_local_1.Strategy({ usernameField: "email" }, function (email, password, done) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield User_1.User.findOne({ email });
            if (!user) {
                console.warn("Incorrect email");
                return done(null, false, { message: 'Incorrect email.' });
            }
            const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
            if (!isPasswordValid) {
                console.warn("Incorrect password");
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        }
        catch (error) {
            return done(error);
        }
    });
}));
// @ts-ignore
passport_1.default.serializeUser((user, done) => {
    done(null, user._id);
});
passport_1.default.deserializeUser((id, done) => {
    const user = User_1.User.findOne({ id });
    done(null, user);
});
//# sourceMappingURL=passport.js.map