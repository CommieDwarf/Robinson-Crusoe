import { Router } from "express";
import passport from "passport";
import { UserService } from "../Classes/HttpService/UserService/UserService";

const userRouter = Router();

userRouter.post(
	"/get",
	passport.authenticate("jwt", { session: false }),
	UserService.getUser
);

userRouter.get("/username-exists/:username", UserService.usernameExists);
userRouter.get("/email-exists/:email", UserService.emailExists);
userRouter.get("/avatar/:username", UserService.getUserAvatar);

export { userRouter };
