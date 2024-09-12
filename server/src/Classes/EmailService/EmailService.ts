import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import { EMAIL_TYPE, EmailLog } from "../../Models/EmailLog";
import { config, transporter } from "../../config/config";
import { IUser } from "../../types/UserData/IUser";

export class EmailService {
	constructor() {}

	public async sendActivationMail(userData: {
		username: string,
		id: string,
	}) {
		//TODO:  zamień placeholder na prawdziwy adres e-mail!
		const mailOptions = {
			from: config.email.from,
			to: "tosiek22@gmail.com",
			subject: "Weryfikacja konta",
			template: "verification",
			context: {
				username: userData.username,
            	activationLink: this.prepareVerificationLink(userData.id)
			}
		};

		transporter.sendMail(mailOptions, (error) => {
			if (error) {
				return console.log("Błąd: " + error);
			}
		});

		await EmailLog.create({
			userId: userData.id,
			emailType: EMAIL_TYPE.ACTIVATION,
			sentAt: new Date(),
		}).then((log) => {
			log.save();
		});
	}

	

	public async reSendActivationEmail(userData: {
		username: string,
		id: string,
	}) {
        const limitReached = await this.isEmailLimitReached(userData.id, EMAIL_TYPE.ACTIVATION);
        if (limitReached) {
            throw new Error("Activation e-mail limit reached!");
        }

        this.sendActivationMail(userData);
    }

	async isEmailLimitReached(userId: string, emailType: EMAIL_TYPE) {
		const startTime = new Date(
			Date.now() - config.email.limits.resendCooldown
		);

		try {
			const emailCount = await EmailLog.countDocuments({
                emailType: emailType,
				userId: userId,
				sentAt: { $gte: startTime },
			});

			return emailCount >= config.email.limits.maxEmailsPerDay;
		} catch (error) {
			console.error("Error checking email limit:", error);
			throw new Error("Error checking email limit.");
		}
	}


    private prepareVerificationLink(userId: string) {
		console.log("preparing verification link");
		const token = jwt.sign({ userId }, config.server.jwtSecret, {
			expiresIn: "1h",
		});
		return `${config.server.clientUrl}/email-activation/${token}`;
	}
}
