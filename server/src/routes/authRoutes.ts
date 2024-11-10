import { AuthService } from "../Classes/HttpService/AuthService/AuthService";
import express, { NextFunction } from "express";
import { sharedConfig } from "@shared/config/sharedConfig";
import { body } from "express-validator";
import { HttpLimiter } from "../Classes/HttpService/HttpLimiter/HttpLimiter";
import passport from "passport";
import { Request, Response } from "express";
import { UserDocument } from "../Models/User";

const authRouter = express.Router();

export interface AuthenticatedRequest extends Request {
	user: UserDocument;
  }

authRouter.post("/login", HttpLimiter.loginLimiter, AuthService.login);
authRouter.post(
	"/register",
	[
		body("email").isEmail().withMessage("Email is invalid"),
		body("password")
			.isLength({
				min: sharedConfig.limits.passwordMinLength,
				max: sharedConfig.limits.passwordMaxLength,
			})
			.withMessage("Password has invalid length"),
		body("username")
			.isLength({
				min: sharedConfig.limits.usernameMinLength,
				max: sharedConfig.limits.usernameMaxLength,
			})
			.withMessage("User name has invalid length"),
	],
	AuthService.register
);
authRouter.post(
	"/change-password",
	passport.authenticate("jwt", { session: false }),
	[
		body("newPassword")
			.isLength({
				min: sharedConfig.limits.passwordMinLength,
				max: sharedConfig.limits.passwordMaxLength,
			})
			.withMessage("Password has invalid length"),
	],
	ensureEmailVerified,
	AuthService.changePassword
);

export { authRouter };

function ensureEmailVerified(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    if (req.user && req.user.emailVerified) {
        return next();
    } else {
        return res.status(403).json({ message: "Email address is not verified." });
    }
};
