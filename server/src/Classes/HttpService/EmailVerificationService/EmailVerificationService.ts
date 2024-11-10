import { JwtTokenContents, JWT_ACTION } from "../../../@types/JwtAction";
import { config } from "../../../config/config";
import { EMAIL_TYPE } from "../../../Models/EmailLog";
import { User, UserDocument } from "../../../Models/User";
import { EmailService } from "../../EmailService/EmailService";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";






export class EmailVerificationService {

    static verifyEmail = async (req: Request, res: Response) => {
		try {
			const { token } = req.params;

			if (!token) {
				res.status(401).json({ message: "token is required" });
				console.warn("token is required");
				return;
			}
			const decoded = jwt.verify(
				token,
				config.server.jwtSecret
			) as JwtTokenContents;
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


	static reSendActivationEmail = (req: Request, res: Response) => {
		const user = req.user as UserDocument;
		try {
			EmailService.sendEmail({
				userData: {
					username: user.username,
					userId: user._id,
					userEmail: user.email,
				},
				emailType: EMAIL_TYPE.ACTIVATION,
			});
			res.status(200).json({ message: "E-mail sent" });
		} catch (e) {
			console.error(e);
			res.status(500).json({ message: "Something went wrong" });
		}
	};

    private static handleWrongTokenAction(res: Response) {
		res.status(400).json({
			message: "Something went wrong",
		});
		console.warn("Invalid token action was sent");
	}
}