import AuthForm from "../../components/AuthForm/AuthForm";
import {MainMenu} from "../../components/MainMenu/MainMenu";
import {cookies} from "next/headers";

export default function SinIn() {

    return (
        <MainMenu UserComponent={<AuthForm isLogin={true}/>}/>
    );
}
