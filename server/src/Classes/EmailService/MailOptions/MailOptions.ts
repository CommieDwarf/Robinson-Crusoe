import { MailOptions as IMailOptions } from "nodemailer/lib/sendmail-transport";
import i18next from "i18next";
import { EMAIL_TYPE } from "../../../Models/EmailLog";
import { config } from "../../../config/config";
import jwt from "jsonwebtoken";
import { JWT_ACTION } from "../../../@types/JwtAction";
import { genAlphaNumCode } from "../../../utils/genAlphaNumCode";
import { sharedConfig } from "@shared/config/sharedConfig";


interface StandardArgs {
	emailType: Exclude<EMAIL_TYPE, EMAIL_TYPE.PASSWORD_RESET> 
}

interface ResetPasswordArgs {
	emailType: EMAIL_TYPE.PASSWORD_RESET,
	code: string
}

export class MailOptions {
	private readonly _username: string;
	private readonly _userEmail: string;
	private readonly _userId: string;

	constructor(username: string, userEmail: string, userId: string) {
		this._username = username;
		this._userEmail = userEmail;
		this._userId = userId;
	}

	public get(data: StandardArgs | ResetPasswordArgs): IMailOptions {
		// Implementacja
		switch (data.emailType) {
			case EMAIL_TYPE.ACTIVATION:
				return this.prepareActivationOptions();
			case EMAIL_TYPE.PASSWORD_RESET:
				return this.prepareResetPasswdOptions(data.code);
			default:
				throw new Error(data.emailType + " is not implemented.");
		}
	}

	private prepareResetPasswdOptions(code: string) {
		const { t } = i18next;
		return {
			from: config.email.from,
			to: this._userEmail,
			subject: t("email.passwordReset.subject"),
			template: "passwordReset",
			context: {
				greeting: t("email.greeting", {
					username: this._username
				}),
				description: t("email.passwordReset.description"),
				instructions: t("email.passwordReset.instructions"),
				codeExpiration: t("email.passwordReset.codeExpiration", {
					minutes: config.expiration.passwordResetCodeMs / 1000 / 60,
				}),
				ignore: t("email.passwordReset.ignore"),
				code,
			},
		};
	}

	private preparePasswordResetLink() {
		const token = jwt.sign(
			{ userId: this._userId, action: JWT_ACTION.PASSWORD_RESET },
			config.server.jwtSecret,
			{
				expiresIn: `${config.expiration.passwordResetCodeMs}h`,
			}
		);
		return `${config.server.clientUrls[0]}/reset-password/${token}`;
	}

	private prepareActivationOptions() {
		const { t } = i18next;
		return {
			from: config.email.from,
			to: this._userEmail,
			subject: t("email.activation.subject"),
			template: "activation",
			context: {
				username: this._username,
				greeting: t("email.greeting", { username: this._username }),
				thanks: t("email.activation.thanks"),
				instructions: t("email.activation.instructions"),
				ignore: t("email.activation.ignore"),
				link: this.prepareActivationLink(),
				linkText: t("email.activation.linkText"),
			},
		};
	}

	private prepareActivationLink() {
		const token = jwt.sign(
			{ userId: this._userId, action: JWT_ACTION.ACTIVATION },
			config.server.jwtSecret,
			{
				expiresIn: "1h",
			}
		);
		return `${config.server.clientUrls[0]}/email-activation/${token}`;
	}
}
