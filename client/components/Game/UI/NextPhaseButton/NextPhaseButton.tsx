// @flow
import * as React from "react";
import styles from "./NextPhaseButton.module.css";
import compassImg from "/public/UI/tokens/compass.png";
import ResizableImage from "../../../ResizableImage/ResizableImage";
import {socketEmit, socketEmitAction} from "../../../../middleware/socketMiddleware";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import {OTHER_CONTROLLER_ACTION} from "@shared/types/CONTROLLER_ACTION";
import {SOCKET_EVENT} from "@shared/types/Requests/Socket";
import {selectGame} from "../../../../reduxSlices/gameSession";
import {alertUpdated} from "../../../../reduxSlices/alert";
import {ALERT_CODE} from "@shared/types/ALERT_CODE";

type Props = {
    locked: boolean;
};
export const NextPhaseButton = (props: Props) => {

    const dispatch = useAppDispatch();

    const players = useAppSelector(state => state.gameSession.data?.players.filter(p => !p.prime))!;
    const phase = useAppSelector((state) => selectGame(state)?.phaseService.phase)!;
    const primePlayer = useAppSelector(state => selectGame(state)?.primePlayer)!;
    const localPlayer = useAppSelector((state) => state.gameSession.data?.localPlayer);

    function handleClick() {
        if (props.locked) {
            return;
        }
        if (players.some(player => !player.ready) && phase === "preAction") {
            dispatch(alertUpdated(ALERT_CODE.PLAYERS_NOT_READY_FOR_ACTION));
            return;
        }
        if (localPlayer?.id !== primePlayer.id) {
            dispatch(alertUpdated(ALERT_CODE.CHANGE_PHASE_IS_PRIME_PLAYER_ACTION));
            return;
        }

        dispatch(socketEmitAction(OTHER_CONTROLLER_ACTION.SET_NEXT_PHASE));
    }

    const style = {
        backgroundColor: primePlayer.color
    }

    const locked = props.locked || localPlayer?.id !== primePlayer.id;

    return (
        <div className={`${styles.container} ${locked && styles.locked}`}
             style={style}
             onClick={handleClick}>
            <div className={styles.token}>
                <ResizableImage
                    src={compassImg}
                    alt="następna faza"
                />
            </div>
        </div>
    );
};
