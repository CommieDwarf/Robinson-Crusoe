import { Router } from "express";
import { ResetPasswordService } from "../Classes/HttpService/ResetPasswordService/ResetPasswordService";
import passport from "passport";


const resetPasswordRouter = Router();

resetPasswordRouter.post(
    "/send-mail",
    ResetPasswordService.sendPasswordResetEmail
);

resetPasswordRouter.post(
    "/verify-code",
    ResetPasswordService.verifyPasswordCode
);

resetPasswordRouter.post(
    "/reset",
    passport.authenticate("jwt", { session: false }),
    ResetPasswordService.resetPassword
);

export { resetPasswordRouter };