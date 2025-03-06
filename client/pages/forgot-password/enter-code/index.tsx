import {
	ForgotPasswordForm,
	PASSWORD_RESET_STEP,
} from "components/Forms/ForgotPassword/ForgotPasswordForm";
import { GetServerSidePropsContext } from "next";
import { parse } from "cookie";
import { MainMenu } from "components/MainMenu/MainMenu";

export default function ForgotPassword(props: { email: string }) {
	return (
		<MainMenu
			UserComponent={
				<ForgotPasswordForm
					step={PASSWORD_RESET_STEP.ENTER_CODE}
					email={props.email}
				/>
			}
		/>
	);
}

export function getServerSideProps(context: GetServerSidePropsContext) {
	const cookie = context.req.headers.cookie || "";
	const cookies = parse(cookie);
	const email = cookies.Email || "";
	return {
		props: {
			email,
		},
	};
}
