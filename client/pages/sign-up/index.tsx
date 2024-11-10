import AuthForm from "../../components/Forms/AuthForm/AuthForm";
import {MainMenu} from "../../components/MainMenu/MainMenu";

export default function SignUp() {
    return (
        <MainMenu UserComponent={<AuthForm loginMode={false}/>}/>
    );
}
