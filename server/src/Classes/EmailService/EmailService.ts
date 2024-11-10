import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import { EMAIL_TYPE, EmailLog } from "../../Models/EmailLog";
import { config, transporter } from "../../config/config";
import { IUser } from "../../shared/types/User/IUser";
import { x } from "joi";
import { now } from "mongoose";
import { EmailLimitReachedError } from "../../Errors/Email";
import { UserDocument } from "../../Models/User";
import i18next from "i18next";
import { MailOptions } from "./MailOptions/MailOptions";


interface UserData {
	username: string; userId: string; userEmail: string 
}

interface Args {
	userData: UserData,
}

interface StandardArgs extends Args {
	emailType: Exclude<EMAIL_TYPE, EMAIL_TYPE.PASSWORD_RESET> 
}

interface ResetPasswordArgs extends Args {
	emailType: EMAIL_TYPE.PASSWORD_RESET,
	code: string
}


export class EmailService {
	constructor() {
	}



public static async sendEmail(data: StandardArgs | ResetPasswordArgs): Promise<void> {
		try {

			const {username, userId, userEmail} = data.userData;
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
	
			// TODO: zastanów się czy sprawdzać to tutaj czy w limiterze
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
	// async isEmailLimitReached(userId: string, emailType: EMAIL_TYPE) {
	// 	const startTime = new Date(
	// 		Date.now() - config.email.limits.resendCooldown
	// 	);

	// 	try {
	// 		const emailCount = await EmailLog.countDocuments({
	// 			emailType: emailType,
	// 			userId: userId,
	// 			sentAt: { $gte: startTime },
	// 		});

	// 		return emailCount >= config.email.limits.maxEmailsPerDay;
	// 	} catch (error) {
	// 		throw new EmailLimitReachedError();
	// 	}
	// }

}
