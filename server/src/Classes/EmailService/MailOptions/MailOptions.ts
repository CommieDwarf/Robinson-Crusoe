import i18next from "i18next";
import { EMAIL_TYPE } from "../../../Models/EmailLog";
import { config } from "../../../config/config";
import jwt from "jsonwebtoken";
import { JWT_ACTION } from "../../../@types/JwtAction";

export class MailOptions {
	private readonly _username: string;
	private readonly _userEmail: string;
	private readonly _userId: string;

	constructor(username: string, userEmail: string, userId: string) {
		this._username = username;
		this._userEmail = userEmail;
		this._userId = userId;
	}

	public get(type: EMAIL_TYPE) {
		switch (type) {
			case EMAIL_TYPE.ACTIVATION:
				return this.prepareActivationOptions();
			case EMAIL_TYPE.PASSWORD_RESET:
				return this.prepareResetPasswdOptions();
			default:
				throw new Error(type + " is not implemented.");
		}
	}

	private prepareResetPasswdOptions() {
		const { t } = i18next;
		return {
			from: config.email.from,
			to: this._userEmail,
			subject: t("email.psswdReset.subject"),
			template: "passwordReset",
			context: {
				greeting: t("email.greeting"),
				description: t("email.passwordReset.description"),
			},
			instructions: t("email.passwordReset.instructions"),
			linkText: t("email.passwordReset.linkText"),
			linktValidyPeriod: t("email.passwordReset.expirationPeriod", {
				hours: config.email.expirationPeriod.passwordResetH,
			}),
			ignore: t("email.passwordReset.ignore"),
			link: this.preparePasswordResetLink(),
		};
	}

	private preparePasswordResetLink() {
		const token = jwt.sign(
			{ userId: this._userId, action: JWT_ACTION.PASSWORD_RESET  },
			config.server.jwtSecret,
			{
				expiresIn: `${config.email.expirationPeriod.passwordResetH}h`,
			}
		);
		return `${config.server.clientUrls[0]}/email-activation/${token}`;
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
