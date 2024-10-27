import { json, NextFunction } from "express";
import passport from "passport";
import { User, UserDocument } from "../../Models/User";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { validationResult, body } from "express-validator";
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
import { rateLimit } from 'express-rate-limit'
import { EMAIL_TYPE } from "../../Models/EmailLog";
import { JWT_ACTION, JwtTokenContents } from "../../@types/JwtAction";
import { VALIDATION_CONFIG } from "@shared/config/VALIDATION_CONFIG";

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
		app.use(
			cors({
				origin: (origin, callback) => {
					if (whitelist.indexOf(origin as string) !== -1 || !origin) {
						callback(null, true);
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

		app.use(rateLimit({
			windowMs: config.requestLimiter.httpWindowMs,
			limit: config.requestLimiter.httpRate,
			handler: (req, res) => this.handleLimitReached(req, res, config.requestLimiter.httpWindowMs),
		}));

		const loginLimiter = rateLimit({
			windowMs: config.requestLimiter.httpLoginWindowMs,
			limit: config.requestLimiter.httpLoginRate,
			handler: (req, res) => this.handleLimitReached(req, res, config.requestLimiter.httpLoginWindowMs),
		});

		app.post("/login", loginLimiter, this.login);
		app.post("/register", [
			body("email").isEmail().withMessage("Email is invalid"),
			body("password")
			.isLength({min: VALIDATION_CONFIG.MAX_PASSWORD_LENGTH, max: VALIDATION_CONFIG.MAX_PASSWORD_LENGTH})
			.withMessage("Password has invalid length"),
			body("username")
			.isLength({min: VALIDATION_CONFIG.MIN_USERNAME_LENGTH, max: VALIDATION_CONFIG.MAX_USERNAME_LENGTH})
			.withMessage("User name has invalid length")
		] , this.register);
		app.post(
			"/getUser",
			passport.authenticate("jwt", { session: false }),
			this.getUser
		);

		const resendVerificationLimiter = rateLimit({
			windowMs: config.requestLimiter.httpResendMailWindowMs,
			limit: config.requestLimiter.httpResendMailRate,
			handler: (req, res) => this.handleLimitReached(req, res, config.requestLimiter.httpResendMailWindowMs),
		})

		app.post(
			"/resend-verification-email",
			passport.authenticate("jwt", { session: false }),
			resendVerificationLimiter,
			this.reSendActivationEmail
		);
		app.post("/reset-password/:email", passport.authenticate("jwt", {session: false}) , this.sendPasswordResetLink)

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
				this._emailService.sendEmail({
					userId: user.id,
					username: user.username,
					userEmail: user.email,
				}, EMAIL_TYPE.ACTIVATION);

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
			const { token } = req.params;

			if (!token) {
				res.status(401).json({ message: "token is required" });
				console.warn("token is required");
				return;
			}
			const decoded = jwt.verify(token, config.server.jwtSecret) as JwtTokenContents;
			const userId = decoded.userId;
			if (decoded.action !== JWT_ACTION.ACTIVATION) {
				this.handleWrongTokenAction(res);
				return;
			}
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

	private async resetPassword(req: Request, res: Response) {
		try {
			const result = validationResult(req);
			if (!result.isEmpty()) {
				return res.status(422).json({ message: "Validation failed." });				
			}
			const body = req.body as UserDocument;
			const decoded = jwt.verify(req.params.token, config.server.jwtSecret) as JwtTokenContents;
			if (decoded.action !== JWT_ACTION.PASSWORD_RESET) {
				this.handleWrongTokenAction(res);
			}
			await User.updateOne({_id: decoded.userId}, {password: body.password});
			return res.status(200).json({message: "Password updated"});
		} catch (e) {
			console.warn(e);
			return res.status(400).json({message: "Something went wrong"})
		}
	}

	private async sendPasswordResetLink(req: Request<{email: string}>, res: Response) {
		try {
			const {email} = req.params;
			if (!email) {
				return res.status(400).json({ message: 'Invalid or missing email address' });
			}
			const user = await User.findOne({email});
			if (!user) {
				return res.status(404).json({ message: 'User not found' });
			}
			this._emailService.sendEmail({
				username: user.username,
				userEmail: user.email,
				userId: user._id
			}, EMAIL_TYPE.PASSWORD_RESET)
			return res.status(200).json({message: "password reset link sent"})
		} catch (e) {
			console.error(e);
		}
	}

	private reSendActivationEmail = (req: Request, res: Response) => {
		const user = req.user as UserDocument;
		try {
			this._emailService.sendEmail({
				username: user.username,
				userId: user._id,
				userEmail: user.email,
			}, EMAIL_TYPE.ACTIVATION);
			res.status(200).json({ message: "E-mail sent" });
		} catch (e) {
			console.error(e);
			res.status(400).json({ message: "Something went wrong" });
		}
	};

	private handleLimitReached = (req: Request, res: Response, retryAfter: number) => {
		res.status(429).json({
			message: "Request limit reached",
			retryAfter,
		})
	}


	private handleWrongTokenAction(res: Response) {
		res.status(400).json({
			message: "Something went wrong",
		});
		console.warn("Invalid token action was sent");
	}

}
