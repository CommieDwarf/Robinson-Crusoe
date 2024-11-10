import { Request, Response } from "express";
import { config } from "../../../config/config";
import rateLimit from "express-rate-limit";

export class HttpLimiter {
	static handleLimitReached = (
		req: Request,
		res: Response,
		retryAfter: number
	) => {
		res.status(429).json({
			message: "Request limit reached",
			retryAfter,
		});
	};

	static limiter = rateLimit({
		windowMs: config.requestLimiter.httpWindowMs,
		limit: config.requestLimiter.httpRate,
		handler: (req, res) =>
			HttpLimiter.handleLimitReached(
				req,
				res,
				config.requestLimiter.httpWindowMs
			),
	})

	static loginLimiter = rateLimit({
		windowMs: config.requestLimiter.httpLoginWindowMs,
		limit: config.requestLimiter.httpLoginRate,
		handler: (req: Request, res: Response) =>
			HttpLimiter.handleLimitReached(
				req,
				res,
				config.requestLimiter.httpLoginWindowMs
			),
	});

	static resendVerificationLimiter = rateLimit({
		windowMs: config.requestLimiter.httpResendMailWindowMs,
		limit: config.requestLimiter.httpResendMailRate,
		handler: (req, res) =>
			HttpLimiter.handleLimitReached(
				req,
				res,
				config.requestLimiter.httpResendMailWindowMs
			),
	});
}
