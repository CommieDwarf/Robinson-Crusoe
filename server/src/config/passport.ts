import passport from "passport";
import {Strategy as LocalStrategy} from "passport-local";

import {User, UserDocument} from "../Models/User";
import bcrypt from "bcryptjs";
import passportJwt from "passport-jwt";
import {jwtSecret} from "./jwt";

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;


const jwtDecodeOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret,
};

passport.use(
    new JwtStrategy(jwtDecodeOptions, async (payload, done) => {
        const currentTimestamp = Math.floor(Date.now() / 1000);
        if (payload.exp && payload.exp < currentTimestamp) {
            return done(null, false, {message: 'Token expired'});
        }
        const user = await User.findOne({_id: payload._id})
        if (!user) {
            throw new Error("can't find user");
        }
        return done(null, user, payload.data);
    }),
);

passport.use(new LocalStrategy({usernameField: "email"},
    async function (email, password, done) {
        try {
            const user = await User.findOne({email});
            if (!user) {
                return done(null, false, {message: 'Incorrect email.'});
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
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
