import formStyles from "../../Form/Form.module.css";
import { FormButton } from "components/Forms/Form/FormButton.tsx/FormButton";
import styles from "./CodeVerificationForm.module.css";
import { useTranslation } from "react-i18next";
import ReactCodeInput from "react-code-input";
import { sharedConfig } from "@shared/config/sharedConfig";
import { ForgetPasswordFormProps } from "../@Props";
import { FormEvent, useEffect, useState } from "react";
import config from "config/config";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { jwtDecode } from "jwt-decode";

interface Props {
	email: string;
}

export default function CodeVerificationForm(
	props: ForgetPasswordFormProps & Props
) {
	const { t } = useTranslation();

	const [code, setCode] = useState("");
	const [mailReSent, setMailReSent] = useState(false);

	const router = useRouter();

	useEffect(() => {
		if (!props.email) {
			router.push("/forgot-password")
		}
	})

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		try {
			event.preventDefault();
			props.setLoading(true);

			const url = config.SERVER_URL + "/password-reset/verify-code";
			const body = JSON.stringify({ email: props.email, code });
			const result = await fetch(url, {
				method: "post",
				headers: {
					"Content-Type": "application/json",
				},
				body,
			});

			if (result.status === 404 || result.status === 400) {
				props.setError(t("form.invalidCode"));
				return;
			}

			if (result.status === 500) {
				props.setError(t("error.serverError"));
				return;
			}

			const token = result.headers.get("Authorization");

			if (!token) {
				return;
			}

			const decoded = jwtDecode(token);
			
			Cookies.set("ResetPasswordToken", token, {
				expires: new Date((decoded.exp as number) * 1000),
				path: "/",
			});
			props.onSuccess();
		} catch {
			props.setError(t("error.connectError"));
		} finally {
			props.setLoading(false);
		}
	}

	function handleChange(value: string) {
		setCode(value);
	}

	async function handleReSendClick() {
		try {
			props.setLoading(true);
			const url = config.SERVER_URL + "/password-reset/send-mail";
			const body = JSON.stringify({ email: props.email });
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
				setMailReSent(true);
			}
		} catch {
			props.setError(t("error.connectError"));
		} finally {
			props.setLoading(false);
		}
		

	}

	return (
		<form className={formStyles.form} onSubmit={handleSubmit}>
			<p className={formStyles.p}>
				{t("form.codeSentOnAdress")} <strong>{props.email}</strong>.
				{" "}
				{t("form.checkSpam")}
				<br/>
				<strong>{t("form.enterCodeHere")}</strong>
			</p>
			<div
				className={`${formStyles.rowWrapper} ${styles.rowWrapperMultiInputs}`}
			>
				<ReactCodeInput
					type="text"
					fields={sharedConfig.limits.resetPasswordCodeLength}
					name={"resetPassword"}
					inputMode="full-width-latin"
					className={formStyles.multiInputs}
					onChange={handleChange}
				/>
			</div>

			<FormButton
				active={false}
				loading={props.loading}
				label={t("form.confirmCode")}
			/>
			{!mailReSent ? (
				<p className={formStyles.p}>
					{t("form.mailNotArrived")}
					<br />
					<a className={formStyles.link} onClick={handleReSendClick}>{t("form.sendAgain")}</a>
				</p>
			) : (
				
				<p className={formStyles.p}>Wysłano e-mail z nowym kodem</p>
			)}
		</form>
	);
}
