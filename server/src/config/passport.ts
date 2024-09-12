import passport from "passport";
import {Strategy as LocalStrategy} from "passport-local";

import {User, UserDocument} from "../Models/User";
import bcrypt from "bcryptjs";
import passportJwt from "passport-jwt";
import { config } from "./config";

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;


const jwtDecodeOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.server.jwtSecret,
};

passport.use(
    new JwtStrategy(jwtDecodeOptions, async (payload, done) => {
        try {
            console.log("auth")
            const currentTimestamp = Math.floor(Date.now() / 1000);
            if (payload.exp && payload.exp < currentTimestamp) {
                console.warn("token expired")
                return done(null, false, {message: 'Token expired'});
            }
            const user = await User.findOne({_id: payload.userId})
            if (!user) {
                console.warn("can't find user. ID: " + payload.userId)
                throw new Error("can't find user");
            }
            return done(null, user, payload.data);
        } catch (e) {
            console.error(e);
        }
        
    }),
);

passport.use(new LocalStrategy({usernameField: "email"},
    async function (email, password, done) {
        try {
            const user = await User.findOne({email});
            if (!user) {
                console.warn("Incorrect email")
                return done(null, false, {message: 'Incorrect email.'});
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                console.warn("Incorrect password")
                return done(null, false, {message: 'Incorrect password.'});
            }



            return done(null, user);

        } catch (error) {
            return done(error);
        }

    }
));

// @ts-ignore
passport.serializeUser((user: UserDocument, done) => {
    done(null, user._id);
});
passport.deserializeUser((id, done) => {
    const user = User.findOne({id})
    done(null, user);
});
