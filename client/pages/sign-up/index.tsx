import { MainMenu } from "components/MainMenu/MainMenu";
import AuthForm from "../../components/Forms/AuthForm/AuthForm";

export default function SignUp() {
    return (
        <MainMenu UserComponent={<AuthForm loginMode={false}/>}/>
    );
}
