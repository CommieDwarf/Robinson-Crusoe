import { MainMenu } from "components/MainMenu/MainMenu";
import AuthForm from "../../components/Forms/AuthForm/AuthForm";

export default function SignIn() {
	return <MainMenu UserComponent={<AuthForm loginMode={true} />} />;
}
