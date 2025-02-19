import {
	ForgotPasswordForm,
	PASSWORD_RESET_STEP,
} from "components/Forms/ForgotPassword/ForgotPasswordForm";
import { MainMenu } from "components/MainMenu/MainMenu";

export default function ForgotPassword() {
	return (
		<MainMenu
			UserComponent={
				<ForgotPasswordForm step={PASSWORD_RESET_STEP.ENTER_PASSWORD} />
			}
		/>
	);
}
