import { FormEvent, useState } from "react";
import formStyles from "../../Form/Form.module.css";
import { FormInput } from "../../Form/FormInput/FormInput";
import { sharedConfig } from "@shared/config/sharedConfig";
import { useTranslation } from "react-i18next";
import { FormButton } from "../../Form/FormButton.tsx/FormButton";
import { ForgetPasswordFormProps } from "../@Props";
import Cookies from "js-cookie";
import config from "config/config";

export function NewPasswordForm(props: ForgetPasswordFormProps) {
	const [password, setPassword] = useState("");
	const [passwordRepeat, setPasswordRepeat] = useState("");
	const [passwordTouched, setPasswordTouched] = useState(false);
	const [errors, setErrors] = useState({ password: "", passwordRepeat: "" });
	const { t } = useTranslation();

	function setError(key: keyof typeof errors, value: string) {
		setErrors((prev) => {
			return {
				...prev,
				[key]: value,
			};
		});
	}

	function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
		setPassword(event.target.value);
	}

	function handlePasswordRepeatChange(
		event: React.ChangeEvent<HTMLInputElement>
	) {
		setPasswordRepeat(event.target.value);
		setPasswordTouched(true);
	}

	function handlePasswordBlur() {
		if (password !== passwordRepeat && passwordTouched) {
			setError("passwordRepeat", "Hasła muszą być takie same");
		} else {
			setError("passwordRepeat", "");
		}
	}

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		try {
			event.preventDefault();
			props.setLoading(true);

			const token = Cookies.get("ResetPasswordToken");


			alert(token);
			if (!token) {
				props.setError(t("form.resetPasswordTokenExpired"));
				return;
			}
			const url = config.SERVER_URL + "/password-reset/reset";

			const body = JSON.stringify({ password });

			const authToken = Cookies.get("ResetPasswordToken");

			const result = await fetch(url, {
				method: "post",
				headers: {
					"Content-Type": "application/json",
					Authorization: `${authToken}`,
				},
				body,
			});

			if (result.ok) {
				props.onSuccess();
			} else {
				props.setError(t("error.serverError"));
			}
			
		} catch (e) {
			props.setError(t("error.connectError"));
		} finally {
			props.setLoading(false);
		}
	}

	return (
		<form className={formStyles.form} onSubmit={handleSubmit}>
			<FormInput
				placeholder={t("menu.password")}
				type="password"
				id="password"
				value={password}
				onChange={handlePasswordChange}
				onBlur={handlePasswordBlur}
				required
				error={errors.password}
				minLength={sharedConfig.limits.passwordMinLength}
				maxLength={sharedConfig.limits.passwordMaxLength}
			/>
			<FormInput
				placeholder={t("menu.repeat password")}
				type="password"
				id="password"
				value={passwordRepeat}
				onChange={handlePasswordRepeatChange}
				onBlur={handlePasswordBlur}
				required
				error={errors.passwordRepeat}
				minLength={sharedConfig.limits.passwordMinLength}
				maxLength={sharedConfig.limits.passwordMaxLength}
			/>
			<FormButton
				active={false}
				loading={props.loading}
				label={t("form.changePassword")}
				loadingLabel={t("form.sending")}
			/>
		</form>
	);
}
