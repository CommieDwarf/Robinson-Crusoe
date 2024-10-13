import { NextFunction } from "express";
import passport from "passport";
import { User, UserDocument } from "../../Models/User";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import cors from "cors";
import express from "express";
import session from "express-session";
import App from "express";
import http from "http";
import { generateAvatar } from "../../utils/generateAvatar";
import {
	GetUserAvatarRequest,
	GetUserAvatarResponse,
} from "@shared/types/Requests/Get";
import { EmailService } from "../EmailService/EmailService";
import { config } from "../../config/config";
import { sleep } from "@shared/utils/sleep";

export class HttpService {
	private readonly _app: ReturnType<typeof App>;
	private readonly _emailService: EmailService;

	constructor(app: ReturnType<typeof App>, emailService: EmailService) {
		this._emailService = emailService;
		this.initialize(app);
		this._app = app;
	}

	public createServer() {
		return http.createServer(this._app);
	}

	private initialize(app: ReturnType<typeof App>) {
		const whitelist = config.server.clientUrls;
		console.log("WHITELIST", whitelist);
		app.use(
			cors({
				origin: (origin, callback) => {
					if (whitelist.indexOf(origin as string) !== -1 || !origin) {
						callback(null, true); // Dozwolone
					} else {
						callback(new Error("Not allowed by CORS")); // Odrzucone
					}
				},
				exposedHeaders: "authorization",
			})
		);
		app.use(express.json());
		app.use(
			session({
				secret: "your-secret-key",
				resave: false,
				saveUninitialized: false,
			})
		);
		app.use(passport.initialize());
		app.use(passport.session());

		app.post("/login", this.login);
		app.post("/register", this.register);
		app.post(
			"/getUser",
			passport.authenticate("jwt", { session: false }),
			this.getUser
		);
		app.post(
			"/resend-verification-email",
			passport.authenticate("jwt", { session: false }),
			this.resendVerificationEmail
		);
		app.get("/usernameExists/:username", this.usernameExists);
		app.get("/emailExists/:email", this.emailExists);
		app.get("/getUserAvatar/:username", this.getUserAvatar);
		app.get("/verify-email/:token", this.verifyEmail);
	}

	private getUserAvatar(
		req: GetUserAvatarRequest,
		res: Response<GetUserAvatarResponse>
	) {
		return res.json({ svg: generateAvatar(req.params.username) });
	}

	private login = async (req: Request, res: Response, next: NextFunction) => {
		passport.authenticate(
			"local",
			async (err: Error, user: UserDocument, info: any) => {
				try {
					if (err || !user) {
						return res
							.status(401)
							.json({ message: "Nieprawidłowe dane logowania." });
					}


					req.login(user, { session: false }, (err: Error) => {
						if (err) {
							res.status(500).json({
								message: "Błąd logowania.",
							});
						}
						const token = jwt.sign(
							{ userId: user._id },
							config.server.jwtSecret
						);
						res.setHeader("Authorization", `Bearer ${token}`);
						return res.json({ message: "Logged in successfully" });
					});
				} catch (e) {
					console.error(e);
				}
			}
		)(req, res, next);
	};

	private register = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		const body = req.body as UserDocument;
		try {
			const result = validationResult(req);
			if (!result.isEmpty()) {
				return res.status(422).json({ message: "Validation failed." });
			} else {
				const user = new User({
					username: body.username,
					email: body.email,
					password: body.password,
				});
				await user.save();
				const token = jwt.sign(
					{ userId: user._id },
					config.server.jwtSecret
				);
				this._emailService.sendActivationMail({
					id: user.id,
					username: user.username,
					email: user.email,
				});

				res.setHeader("Authorization", `Bearer ${token}`);
				return res
					.status(201)
					.json({ message: "Account created successfully" });
			}
		} catch (error) {
			console.warn(error);
			return res.status(500).json({ message: "Internal server error" });
		}
	};

	private getUser = async (req: Request, res: Response) => {
		try {
			const user = req.user as UserDocument;
			if (!user) {
				throw new Error("User not found");
			}
			return res.status(200).json({
				username: user.username,
				email: user.email,
				_id: user._id,
				avatar: generateAvatar(user.username),
				emailVerified: user.emailVerified,
			});
		} catch (error) {
			console.error("Błąd podczas pobierania danych użytkownika:", error);
			return res.status(500).json({ message: "Internal server error" });
		}
	};

	private usernameExists = async (req: Request, res: Response) => {
		const { username } = req.params;
		try {
			const user = await User.findOne({ username });
			if (user) {
				return res.status(409).json({ message: "Username is taken" });
			} else {
				return res
					.status(200)
					.json({ message: "Username is available" });
			}
		} catch (error) {
			return res.status(500).json({ message: "Internal server error" });
		}
	};

	private emailExists = async (req: Request, res: Response) => {
		const { email } = req.params;
		try {
			const user = await User.findOne({ email });
			if (user) {
				return res.status(409).json({ message: "Email is taken" });
			} else {
				return res.status(200).json({ message: "Email is available" });
			}
		} catch (error) {
			return res.status(500).json({ message: "Wystąpił błąd serwera." });
		}
	};

	private verifyEmail = async (req: Request, res: Response) => {
		try {
			console.log("GOT REQUEST!");
			const { token } = req.params;
			console.log("TOKEN", token);

			if (!token) {
				res.status(401).json({ message: "token is required" });
				console.warn("token is required");
				return;
			}
			const decoded = jwt.verify(token, config.server.jwtSecret) as {
				userId: string;
			};
			const userId = decoded.userId;
			if (!userId) {
				res.status(400).json({ message: "E-mail verification failed" });
				console.warn("Can't get userId from token");
				return;
			}
			await User.updateOne(
				{ _id: decoded.userId },
				{ emailVerified: true }
			);
			res.status(200).json({ message: "E-mail verified" });
		} catch (e) {
			res.status(400).json({ message: "E-mail verification failed" });
			console.warn(e);
		}
	};

	private resendVerificationEmail = (req: Request, res: Response) => {
		const user = req.user as UserDocument;
		if (!user) {
			throw new Error("User not found");
		}
		try {
			this._emailService.reSendActivationEmail({
				username: user.username,
				id: user._id,
				email: user.email,
			});
			res.status(200).json({ message: "E-mail sent" });
		} catch (e) {
			console.error(e);
			res.status(400).json({ message: "Something went wrong" });
		}
	};
}
