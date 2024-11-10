import { MainMenu } from "components/MainMenu/MainMenu";
import { ForgotPasswordForm, PASSWORD_RESET_STEP } from "components/Forms/ForgotPassword/ForgotPasswordForm";



export default function ForgotPassword() {


	// async function handleSubmit(event: React.FormEvent) {
	// 	try {
	// 		event.preventDefault();
	// 		resetErrors();
	// 		setLoading(true);
	// 		const body = { email };
	// 		const url = `${config.SERVER_URL}/sendResetPasswordLink`;
	// 		const response = await fetch(url, {
	// 			method: "post",
	// 			body: JSON.stringify(body),
	// 			headers: {
	// 				"Content-Type": "application/json",
	// 			},
	// 			mode: "cors",
	// 		});
	// 		if (response.status === 404) {
	// 			setEmailError(t("form.emailDoNotExist"));
	// 			return;
	// 		}
	// 		if (response.status === 429) {
	// 			toast(t("toast.request limit reached"), {
	// 				type: "error",
	// 			});
	// 			return;
	// 		}
	// 		if (response.status === 200) {
	// 			const json = await response.json();
	// 			setExpiresInH(json.expiresInH);
	// 			setLinkSent(true);
	// 		} else {
	// 			setMainError(t("error.serverError"));
	// 		}
	// 	} catch (e) {
	// 		setMainError(t("error.connectError"));
	// 	} finally {
	// 		setLoading(false);
	// 	}
	// }

	

	return (
		<MainMenu
			UserComponent={
				<ForgotPasswordForm step={PASSWORD_RESET_STEP.SEND_EMAIL}/>
			}
		/>
	);
}
