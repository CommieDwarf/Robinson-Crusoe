import capitalize from "@shared/utils/capitalize";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {socketEmit} from "../../../../middleware/socketMiddleware";
import {useAppDispatch} from "../../../../store/hooks";
import {SOCKET_EVENT_CLIENT} from "@shared/types/Requests/Socket";
import { sharedConfig } from "@shared/config/sharedConfig";


interface Props {
    sessionId: string;
    setSessionIdToEnter: (sessionId: string) => void;
}

export function EnterPassword(props: Props) {
    const [password, setPassword] = useState("");

    const {t} = useTranslation();
    const dispatch = useAppDispatch();


    function handleChange(event: React.FormEvent<HTMLInputElement>) {
        setPassword(event.currentTarget.value.slice(0, sharedConfig.limits.passwordMaxLength));
    }

    function handleClickJoin() {
        dispatch(socketEmit(SOCKET_EVENT_CLIENT.JOIN_SESSION, {password, sessionId: props.sessionId}))
    }


    return <>
        <h4>{capitalize(t(`menu.enter password`))}</h4>
        <input type={"password"} value={password} onChange={handleChange}/>
        <button onClick={handleClickJoin}>{capitalize(t(`menu.join`))}</button>
    </>
}
