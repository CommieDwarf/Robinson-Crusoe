import { FormButton } from "components/Forms/Form/FormButton.tsx/FormButton";
import formStyles from "../../../Forms/Form/Form.module.css";
import styles from "./NewPasswordForm.module.css";
import settingsStyles from "../ProfileSettings.module.css";
import { FormInput } from "components/Forms/Form/FormInput/FormInput";
import { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { sharedConfig } from "@shared/config/sharedConfig";
import { FormError } from "components/Forms/Form/FormError/FormError";
import { getAuthToken } from "utils/auth/getAuthToken";
import config from "config/config";

interface Props {}

export function NewPasswordForm(props: Props) {
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
	const [newPasswordTouched, setNewPasswordTouched] = useState(false);
	const [errors, setErrors] = useState({
		newPassword: "",
		newPasswordConfirm: "",
		currentPassword: "",
		general: "",
	});
	const [loading, setLoading] = useState(false);

	const { t } = useTranslation();

	function setError(key: keyof typeof errors, value: string) {
		setErrors((prev) => {
			return {
				...prev,
				[key]: value,
			};
		});
	}

	function handleOldPasswordChange(
		event: React.ChangeEvent<HTMLInputElement>
	) {
		setCurrentPassword(event.target.value);
	}

	function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
		setNewPassword(event.target.value);
	}

	function handlePasswordRepeatChange(
		event: React.ChangeEvent<HTMLInputElement>
	) {
		setNewPasswordConfirm(event.target.value);
		setNewPasswordTouched(true);
	}

	function handlePasswordBlur() {
		if (newPassword !== newPasswordConfirm && newPasswordTouched) {
			setError("newPasswordConfirm", "Hasła muszą być takie same");
		} else {
			setError("newPasswordConfirm", "");
		}
	}

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		try {
			event.preventDefault();
			setLoading(true);

			const authToken = getAuthToken();

			if (!authToken) {
				setError("general", t("error.somethingWentWrong"));
				return;
			}

			const url = config.SERVER_URL + "/auth/change-password";
			const body = JSON.stringify({
				newPassword,
				currentPassword
			});

			const result = await fetch(url, {
				method: "post",
				headers: {
					"Content-Type": "application/json",
					Authorization: `${authToken}`,
				},
				body,
			});

			if (result.ok) {
				//TODO: zrób to
				// alert("udało się");
			} else {
				setError("general", t("error.serverError"));
			}
		} catch (e) {
			setError("general", t("error.connectError"));
		} finally {
			setLoading(false);
		}
	}

	return (
		<div
			className={`${formStyles.container} ${settingsStyles.formContainer}`}
		>
			<form className={`${formStyles.form}`} autoComplete="off" onSubmit={handleSubmit}>
				<FormInput
                    name={"currentPassword"}
					placeholder={t("form.oldPassword")}
					type="password"
					value={currentPassword}
					onChange={handleOldPasswordChange}
					required
					error={errors.newPassword}
					minLength={sharedConfig.limits.passwordMinLength}
					maxLength={sharedConfig.limits.passwordMaxLength}
					autoComplete="off"
				/>
				<FormInput
					placeholder={t("menu.password")}
					type="password"
					value={newPassword}
					onChange={handlePasswordChange}
					onBlur={handlePasswordBlur}
					required
					error={errors.newPassword}
					minLength={sharedConfig.limits.passwordMinLength}
					maxLength={sharedConfig.limits.passwordMaxLength}
				/>
				<FormInput
					placeholder={t("menu.repeat password")}
					type="password"
					value={newPasswordConfirm}
					onChange={handlePasswordRepeatChange}
					onBlur={handlePasswordBlur}
					required
					error={errors.newPasswordConfirm}
					minLength={sharedConfig.limits.passwordMinLength}
					maxLength={sharedConfig.limits.passwordMaxLength}
					className={styles.passwordRepeat}
				/>
				<FormError error={errors.general} />
				<FormButton
					active={false}
					loading={loading}
					label={t("form.changePassword")}
					loadingLabel={t("form.sending")}
				/>
			</form>
		</div>
	);
}
