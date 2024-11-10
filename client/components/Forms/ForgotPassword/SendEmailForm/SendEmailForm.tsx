import formStyles from "../../Form/Form.module.css";
import { FormInput } from "components/Forms/Form/FormInput/FormInput";
import { useState } from "react";
import { FormButton } from "components/Forms/Form/FormButton.tsx/FormButton";
import { useTranslation } from "react-i18next";
import { ForgetPasswordFormProps } from "../@Props";
import config from "config/config";
import Cookies from "js-cookie";

interface Props extends ForgetPasswordFormProps {
	
}

export function SendEmailForm(props: Props) {
	const [email, setEmail] = useState("");
	const [emailError, setEmailError] = useState("");

	const { t } = useTranslation();

	async function handleSubmit(event: React.FormEvent) {
		try {
			event.preventDefault();
			props.setLoading(true);
			const url = config.SERVER_URL + "/password-reset/send-mail";
			const body = JSON.stringify({ email });
			const result = await fetch(url, {
				method: "post",
				headers: {
					"Content-Type": "application/json",
				},
				body,
			});

	
			if (result.status === 404) {
				props.setError(t("form.emailDoNotExist"));
				return;
			} else if (result.status === 400) {
				props.setError(t("error.serverError"));
				return;
			}
	 
			if (result.ok) {
				const json = await result.json();
				const expires: number = json.expires;
				if (!expires) {
					return;
				}
				Cookies.set("Email", email, {
					expires: new Date(expires),
					path: "/",
				});
				props.onSuccess();
			}
		} catch (error) {
			props.setError(t("error.connectError"))
		} finally {
			props.setLoading(false);
		}
	
	}

	return (
		<form className={formStyles.form} onSubmit={handleSubmit}>
			<p className={formStyles.p}>{t("form.sendEmailInstructions")}</p>
			<FormInput
				placeholder={"e-mail"}
				type="email"
				id="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				required
				error={emailError}
			/>

			<FormButton
				active={false}
				loading={props.loading}
				label={t(props.loading ? "form.sending" : "form.send")}
			/>
		</form>
	);
}
