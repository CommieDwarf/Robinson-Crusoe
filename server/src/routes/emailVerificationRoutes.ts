import { Router } from "express";
import { EmailVerificationService } from "../Classes/HttpService/EmailVerificationService/EmailVerificationService";
import passport from "passport";
import { HttpLimiter } from "../Classes/HttpService/HttpLimiter/HttpLimiter";

const emailVerificationRouter = Router();

emailVerificationRouter.get(
	"/verify/:token",
	EmailVerificationService.verifyEmail
);
emailVerificationRouter.post(
	"/resend",
	passport.authenticate("jwt", { session: false }),
	HttpLimiter.resendVerificationLimiter,
	EmailVerificationService.reSendActivationEmail
);

export { emailVerificationRouter };
