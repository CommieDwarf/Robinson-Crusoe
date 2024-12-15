import passport from "passport";
import cors from "cors";
import express from "express";
import session from "express-session";
import App from "express";
import http from "http";
import { config } from "../../config/config";
import { HttpLimiter } from "./HttpLimiter/HttpLimiter";
import { emailVerificationRouter } from "../../routes/emailVerificationRoutes";
import { authRouter } from "../../routes/authRoutes";
import { resetPasswordRouter } from "../../routes/resetPasswordRoutes";
import { userRouter } from "../../routes/userRoutes";

export class HttpService {
	private readonly _app: ReturnType<typeof App>;

	constructor(app: ReturnType<typeof App>) {
		this._app = app;
		this.initialize();
	}

	public createServer() {
		return http.createServer(this._app);
	}

	private initialize() {
		this.setupMiddleware();
		this.setupRoutes();
	}

	private setupRoutes() {
		this._app.use("/email-verification", emailVerificationRouter);
		this._app.use("/user", userRouter);
		this._app.use("/auth", authRouter);
		this._app.use("/password-reset", resetPasswordRouter);
	}



	private setupMiddleware() {
		this.setupCorsMiddleware();

		this._app.use(express.json());
		this._app.use(
			session({
				secret: "your-secret-key",
				resave: false,
				saveUninitialized: false,
			})
		);
		this.setupPassportMiddleWare();
		this._app.use(
			HttpLimiter.limiter
		)
	}

	private setupPassportMiddleWare() {
		this._app.use(passport.initialize());
		this._app.use(passport.session());
	}


	private setupCorsMiddleware() {
		const whitelist = config.server.clientUrls;
		this._app.use(
			cors({
				origin: (origin, callback) => {
					console.log("White list - ", whitelist);
						console.log("Origin - ", origin);
					if (whitelist.indexOf(origin as string) !== -1 || !origin) {
						callback(null, true);
					} else {
						callback(new Error("Not allowed by CORS")); // Odrzucone
					}
				},
				exposedHeaders: "authorization",
			})
		);
	}
}
