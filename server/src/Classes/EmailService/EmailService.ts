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

export class EmailService {
	constructor() {}

	public async sendEmail(userData: {username: string, userId: string, userEmail: string}, type: EMAIL_TYPE) {
		try {
			const {username, userId, userEmail} = userData;
			const mailOptions = new MailOptions(username, userEmail, userId).get(type);
	
			transporter.sendMail(mailOptions, (error) => {
				if (error) {
					return console.error("Error: " + error);
				}
			});
	
			// TODO: zastanów się czy sprawdzać to tutaj czy w limiterze
				await EmailLog.create({
					userId,
					emailType: type,
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
