import { useState } from "react";
import { RedirectLink } from "../Form/RedirectLink/RedirectLink";
import { useTranslation } from "react-i18next";
import { SendEmailForm } from "./SendEmailForm/SendEmailForm";
import CodeVerificationForm from "./CodeVerificationForm/CodeVerificationForm";
import { NewPasswordForm } from "./NewPasswordForm/NewPasswordForm";
import formStyles from "../Form/Form.module.css";
import { FormError } from "../Form/FormError/FormError";
import { LoadingSpinner } from "components/LoaderSpinner/LoaderSpinner";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export enum PASSWORD_RESET_STEP {
	SEND_EMAIL,
	ENTER_CODE,
	ENTER_PASSWORD,
	DONE,
}


interface EnterCodeProps {
	step: PASSWORD_RESET_STEP.ENTER_CODE,
	email: string
}

interface Props {
	step: Exclude<PASSWORD_RESET_STEP, PASSWORD_RESET_STEP.ENTER_CODE>;
}

export function ForgotPasswordForm(props: Props | EnterCodeProps) {
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [finished, setFinished] = useState(false);

	const router = useRouter();

	const { t } = useTranslation();

	function setGeneralError(msg: string) {
		setError(msg);
	}

	function switchLoading(value: boolean) {
		setLoading(value);
	}

	function getProperForm() {
		switch (props.step) {
			case PASSWORD_RESET_STEP.SEND_EMAIL:
				return (
					<SendEmailForm
						loading={false}
						setLoading={switchLoading}
						onSuccess={() => {
							router.push("/forgot-password/enter-code");
						}}
						setError={setGeneralError}
					/>
				);
			case PASSWORD_RESET_STEP.ENTER_CODE:
				return (
					<CodeVerificationForm
						loading={false}
						setLoading={switchLoading}
						setError={setGeneralError}
						email={props.email}
						onSuccess={() => {
							router.push("/forgot-password/new-password");
						}}
					/>
				);
			case PASSWORD_RESET_STEP.ENTER_PASSWORD:
				return (
					<NewPasswordForm
						loading={false}
						setLoading={switchLoading}
						setError={setGeneralError}
						onSuccess={() => {
							Cookies.remove("ResetPasswordToken", {
								path: "/"
							});
							Cookies.remove("Email", {
								path: "/"
							});
							router.push("/forgot-password/password-changed");
						}}
					/>
				);
			case PASSWORD_RESET_STEP.DONE:
				return (
					<div className={formStyles.p}>
						{t("form.signInNewPassword")}
					</div>
				);
		}
	}

	function getProperHeader() {
		switch (props.step) {
			case PASSWORD_RESET_STEP.SEND_EMAIL:
				return t("form.forgotPassword?");
			case PASSWORD_RESET_STEP.ENTER_CODE:
				return t("form.newPassword");
			case PASSWORD_RESET_STEP.ENTER_PASSWORD:
				return t("form.newPassword");
			case PASSWORD_RESET_STEP.DONE:
				return t("form.passwordChanged");
		}
	}

	return (
		<div className={`${formStyles.container}`}>
			<h3>{getProperHeader()}</h3>
			{getProperForm()}
			{!loading && error && (
				<FormError error={error} style={{ margin: "10px auto auto" }} />
			)}
			{loading && (
				<div
					className={formStyles.rowWrapper}
					style={{ marginTop: "10px" }}
				>
					<LoadingSpinner />
				</div>
			)}
			<RedirectLink linkText={t("form.backToSignIn")} href={"/sign-in"} />
		</div>
	);
}
