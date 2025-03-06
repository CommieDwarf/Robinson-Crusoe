import { EMAIL_TYPE, EmailLog } from "../../Models/EmailLog";
import { transporter } from "../../config/config";
import { MailOptions } from "./MailOptions/MailOptions";

interface UserData {
	username: string;
	userId: string;
	userEmail: string;
}

interface Args {
	userData: UserData;
}

interface StandardArgs extends Args {
	emailType: Exclude<EMAIL_TYPE, EMAIL_TYPE.PASSWORD_RESET>;
}

interface ResetPasswordArgs extends Args {
	emailType: EMAIL_TYPE.PASSWORD_RESET;
	code: string;
}

export class EmailService {
	constructor() {}

	public static async sendEmail(
		data: StandardArgs | ResetPasswordArgs
	): Promise<void> {
		try {
			const { username, userId, userEmail } = data.userData;
			const OptionsCreator = new MailOptions(username, userEmail, userId);
			let mailOptions;
			if (data.emailType == EMAIL_TYPE.PASSWORD_RESET) {
				mailOptions = OptionsCreator.get(data);
			} else {
				mailOptions = OptionsCreator.get(data);
			}

			transporter.sendMail(mailOptions, (error) => {
				if (error) {
					console.error("Error: " + error);
				}
			});
			await EmailLog.create({
				userId,
				emailType: data.emailType,
				sentAt: new Date(),
			}).then((log) => {
				log.save();
			});
		} catch (e) {
			console.error(e);
		}
	}
}
