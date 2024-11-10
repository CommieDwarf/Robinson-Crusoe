import {
	ForgotPasswordForm,
	PASSWORD_RESET_STEP,
} from "components/Forms/ForgotPassword/ForgotPasswordForm";
import { MainMenu } from "components/MainMenu/MainMenu";

export default function PasswordChanged() {
	return (
		<MainMenu
			UserComponent={
				<ForgotPasswordForm step={PASSWORD_RESET_STEP.DONE} />
			}
		/>
	);
}
