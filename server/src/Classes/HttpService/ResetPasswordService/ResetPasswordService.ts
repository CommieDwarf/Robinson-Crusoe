import { User, UserDocument } from "../../../Models/User";
import { Request, Response } from "express";
import { config } from "../../../config/config";
import { EmailService } from "../../EmailService/EmailService";
import { EMAIL_TYPE } from "../../../Models/EmailLog";
import { genAlphaNumCode } from "../../../utils/genAlphaNumCode";
import { sharedConfig } from "@shared/config/sharedConfig";
import { PasswordResetCode } from "../../../Models/PasswordResetCode";
import jwt from "jsonwebtoken";
import { JWT_ACTION } from "../../../@types/JwtAction";





export class ResetPasswordService {

    static async sendPasswordResetEmail(
		req: Request<{ email: string }>,
		res: Response
	) {
		try {
			const { email } = req.body;
			if (!email) {
				return res
					.status(400)
					.json({ message: "Invalid or missing email address" });
			}
			const user = await User.findOne({ email });
			if (!user) {
				return res.status(404).json({ message: "User not found" });
			}
			const code = genAlphaNumCode(
				sharedConfig.limits.resetPasswordCodeLength
			);

			await PasswordResetCode.deleteOne({userId: user._id});

			const newCode = new PasswordResetCode({userId: user._id, code,
				 expiresAt: Date.now() + config.expiration.passwordResetCodeMs});
			await newCode.save();

			EmailService.sendEmail({
				userData: {
					username: user.username,
					userEmail: user.email,
					userId: user._id,
				},
				code,
				emailType: EMAIL_TYPE.PASSWORD_RESET,
			});
			return res.status(200).json({
				message: "password reset email sent",
				expires:
					Date.now() + config.expiration.passwordResetCodeMs,
			});
		} catch (e) {
			res.status(500).json({ message: "Internal server error" });
			console.warn(e);
		}
	}

    static async verifyPasswordCode(
		req: Request<{ code: string; email: string }>,
		res: Response
	) {
		try {
			const { code, email } = req.body;
			if (!code || !email) {
				return res.status(400).json({ message: "Missing body fields"});
			}

			const user = await User.findOne({ email });
			if (!user) {
				return res.status(404).json({ message: "User not found" });
			}

			const resetCode = await PasswordResetCode.findOne({
				userId: user._id,
			});

			if (!resetCode) {
				return res.status(404).json({ message: "Code not found or expired" });
			}

			if (resetCode.code !== code) {
				return res
					.status(400)
					.json({ message: "Invalid code or email" });
			}

			const token = jwt.sign(
				{ userId: user._id, action: JWT_ACTION.PASSWORD_RESET },
				config.server.jwtSecret,
				{expiresIn: config.expiration.passwordResetTokenMs / 1000}
			);
			res.setHeader("Authorization", `Bearer ${token}`);

			resetCode.deleteOne;

			return res.status(200).json({ message: "Code valid" });
		} catch (e) {
			res.status(500).json({ message: "internal server error" });
		}
	}


    static async resetPassword(req: Request, res: Response) {
		try {
			const userDoc = req.user as UserDocument;
			const password = req.body.password;

			if (!password || !userDoc) {
				console.warn("password:", password);
				console.warn("user", userDoc);
				return res.status(400);
			}

			const user = await User.findById(userDoc._id);
			if (!user) {
				return res.status(500);
			}

			user.password = password;
			await user.save();

			return res.status(200).json({ message: "Password updated" });
		} catch (e) {
			return res.status(500).json({ message: "Something went wrong" });
		}
	}

}