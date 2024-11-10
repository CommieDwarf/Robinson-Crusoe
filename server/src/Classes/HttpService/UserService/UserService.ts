import {
	GetUserAvatarRequest,
	GetUserAvatarResponse,
} from "@shared/types/Requests/Get";
import { User, UserDocument } from "../../../Models/User";
import { generateAvatar } from "../../../utils/generateAvatar";
import { Request, Response } from "express";

export class UserService {
	static getUser = async (req: Request, res: Response) => {
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
	}

	static usernameExists = async (req: Request, res: Response) => {
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
	}

	static emailExists = async (req: Request, res: Response) => {
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
	}

	static getUserAvatar(
		req: GetUserAvatarRequest,
		res: Response<GetUserAvatarResponse>
	) {
		return res.json({ svg: generateAvatar(req.params.username) });
	}

	
}
