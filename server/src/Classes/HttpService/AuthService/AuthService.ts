import { NextFunction } from "express";
import passport from "passport";
import { User, UserDocument } from "../../../Models/User";
import { Request, Response } from "express";
import { config } from "../../../config/config";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import { EmailService } from "../../EmailService/EmailService";
import { EMAIL_TYPE } from "../../../Models/EmailLog";
import { AuthenticatedRequest } from "../../../routes/authRoutes";

export class AuthService {
	static login = async (req: Request, res: Response, next: NextFunction) => {
		try {
			passport.authenticate(
				"local",
				async (err: Error, user: UserDocument) => {
						if (err) {
							return res.status(500).json({ message: "Internal server error"});
						}
						if (!user) {
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
					
				}
			)(req, res, next);
		} catch (error) {
			console.warn("jgsdoijgiodsjgiofdsjgiofdsjgiohrfjoi");
			return res.status(500).json({ message: "Internal server error"});
		}
		
	};

	static register = async (req: Request, res: Response) => {
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
				EmailService.sendEmail({
					userData: {
						userId: user.id,
						username: user.username,
						userEmail: user.email,
					},
					emailType: EMAIL_TYPE.ACTIVATION,
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

	static changePassword = async (req: AuthenticatedRequest, res: Response) => {
		try {
			const userDoc = req.user
			const user = await User.findById(userDoc._id);

			if (!user) {
				console.error("User not found");
				return res.status(500).json({ message: "Internal server error" });
			}

			const result = validationResult(req);
			if (!result.isEmpty()) {
				return res.status(422).json({ message: "Validation failed." });
			}
			const {newPassword, currentPassword} = req.body;

			if (!newPassword || !currentPassword) {
				return res.status(400);
			}

			if (!await user.comparePassword(currentPassword)) {
				return res.status(401).json({message: "Incorrect password"});
			}

			user.password = newPassword;
			user.save();
			return res.status(200).json({message: "Password changed"});
		} catch (e) {
			return res.status(500).json({ message: "Internal server error" });
		}
	};
}
