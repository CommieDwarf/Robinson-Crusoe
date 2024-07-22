import styles from "./ReadyCheckbox.module.css";
import {IPlayerRenderData} from "@shared/types/Game/PlayerService/Player";
import {useAppDispatch} from "../../../../../../store/hooks";
import {SOCKET_EVENT} from "@shared/types/Requests/Socket";
import {socketEmit} from "../../../../../../middleware/socketMiddleware";
import {useState} from "react";
import ResizableImage from "../../../../../ResizableImage/ResizableImage";
import checkMark from "/public/UI/misc/check-mark.png";
import starImg from "/public/UI/icons/star.png";

interface Props {
    player: IPlayerRenderData,
    local: boolean,
}

export function ReadyCheckbox(props: Props) {

    const [ready, setReady] = useState(props.player.ready);

    const style = {
        backgroundColor: props.player.color
    }

    const dispatch = useAppDispatch()

    function handleClick() {
        if (props.local) {
            dispatch(socketEmit(SOCKET_EVENT.SET_PLAYER_READY,
                {value: !ready, hydrateSessionId: true}))
            setReady((prev) => !prev);
        }
    }

    return <div
        className={`${styles.container} ${props.local && styles.local} ${!ready && props.local && styles.containerAnimated}`}
        style={style} onClick={handleClick}>
        {props.player.ready &&
            <div className={styles.checkImg}>
                <ResizableImage src={checkMark} alt={"ready"}/>
            </div>}

    </div>
}
