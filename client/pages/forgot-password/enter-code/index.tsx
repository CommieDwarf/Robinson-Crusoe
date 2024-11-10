import { ForgotPasswordForm, PASSWORD_RESET_STEP } from "components/Forms/ForgotPassword/ForgotPasswordForm";
import { MainMenu } from "components/MainMenu/MainMenu";
import { GetServerSidePropsContext } from "next";
import { parse } from 'cookie';


export default function ForgotPassword(props: {email: string}) {
	return (
		<MainMenu
			UserComponent={
				<ForgotPasswordForm step={PASSWORD_RESET_STEP.ENTER_CODE} email={props.email}/>
			}
		/>
	);
}

export function getServerSideProps(context: GetServerSidePropsContext) {
    // Pobranie nagłówków z cookies
    const cookie = context.req.headers.cookie || '';
    
    // Parsowanie cookies
    const cookies = parse(cookie);
    const email = cookies.Email || ''; // Pobranie cookie "Email" lub pusty string, jeśli brak
    return {
        props: {
            email,
        },
    };
}
