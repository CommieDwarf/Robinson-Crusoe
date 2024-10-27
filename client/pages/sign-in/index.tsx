import AuthForm from "../../components/AuthForm/AuthForm";
import {MainMenu} from "../../components/MainMenu/MainMenu";
import {cookies} from "next/headers";

export default function SignIn() {

    return (
        <MainMenu UserComponent={<AuthForm loginMode={true}/>}/>
    );
}
