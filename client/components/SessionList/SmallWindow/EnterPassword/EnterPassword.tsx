import capitalize from "@shared/utils/capitalize";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {sessionValidationConfig} from "@shared/constants/sessionValidationConfig";
import {socketEmitter} from "../../../../pages/_app";


interface Props {
    sessionId: string;
    setSessionIdToEnter: (sessionId: string) => void;
}

export function EnterPassword(props: Props) {
    const [password, setPassword] = useState("");

    const {t} = useTranslation();

    function handleChange(event: React.FormEvent<HTMLInputElement>) {
        setPassword(event.currentTarget.value.slice(0, sessionValidationConfig.maxPasswordLength));
    }

    function handleClickJoin() {
        socketEmitter.emitJoinSession(props.sessionId, password);
    }


    return <>
        <h4>{capitalize(t(`menu.enter password`))}</h4>
        <input type={"password"} value={password} onChange={handleChange}/>
        <button onClick={handleClickJoin}>{capitalize(t(`menu.join`))}</button>
    </>
}
