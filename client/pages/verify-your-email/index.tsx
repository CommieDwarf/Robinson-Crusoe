import { useState } from "react";
import { MainMenu } from "../../components/MainMenu/MainMenu";
import styles from "./index.module.css";
import { UserProfile } from "../../components/UserProfile/UserProfile";
import config from "../../config/config";
import { getAuthToken } from "../../utils/auth/getAuthToken";
import { useTranslation } from "react-i18next";

export default function VerifyYourEmail() {
	const [emailResent, setEmailResent] = useState(false);
	const {t} = useTranslation();

	async function sendEmail() {
		const authToken = getAuthToken();
		const url = `${config.SERVER_URL}/resend-verification-email`;
		const response = await fetch(url, {
			method: "post",
			headers: {
				"Content-Type": "application/json",
				Authorization: `${authToken}`,
			},
		}).then(result => {
			if (result.ok) {
				setEmailResent(true);
			} 
		})
	}

	return (
		<MainMenu
			UserComponent={
				<>
					<UserProfile />
					<div className={styles.container}>
						{" "}
						<h4>{t("emailActivation.title")}</h4>
						<p>
							{t("emailActivation.instructions")}
						</p>
						{!emailResent ? (
							<p>
								{t("emailActivation.gotNoMessages")} <br />{" "}
								<span
									className={styles.link}
									onClick={sendEmail}
								>
									{t("emailActivation.sendAgain")}
								</span>
								<br />
							</p>
						) : (
							<strong>{t("emailActivation.sent")}</strong>
						)}
					</div>
				</>
			}
		/>
	);
}
