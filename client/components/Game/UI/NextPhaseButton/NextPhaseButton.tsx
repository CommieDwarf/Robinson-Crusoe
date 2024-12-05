// @flow
import * as React from "react";
import styles from "./NextPhaseButton.module.css";
import compassImg from "/public/UI/tokens/compass.png";
import ResizableImage from "../../../ResizableImage/ResizableImage";
import {socketEmit, socketEmitAction} from "../../../../middleware/socketMiddleware";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import {OTHER_CONTROLLER_ACTION} from "@shared/types/CONTROLLER_ACTION";
import {selectGame, selectPlayers} from "../../../../reduxSlices/gameSession";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import capitalize from "@shared/utils/capitalize";

type Props = {
    locked: boolean;
};
export const NextPhaseButton = (props: Props) => {

    const dispatch = useAppDispatch();

    const players = useAppSelector(state => selectPlayers(state))?.filter((player) => !player.prime);



    const phase = useAppSelector((state) => selectGame(state)?.phaseService.phase);
    const primePlayerId = useAppSelector(state => selectGame(state)?.primePlayer.id);
    const primePlayerColor = useAppSelector(state => selectGame(state)?.primePlayer.color);
    const localPlayerId = useAppSelector((state) => state.gameSession.data?.localPlayer.id);

    const {t} = useTranslation();

    function handleClick() {
        if (props.locked || !players) {
            return;
        }

        
        if (players.some(player => !player.ready) && phase === "preAction") {
            // dispatch(alertUpdated(ALERT_CODE.PLAYERS_NOT_READY_FOR_ACTION));
            toast(capitalize(t('alerts.players not ready for action')), {type: "error"});
            return;
        }
        if (localPlayerId !== primePlayerId) {
            // dispatch(alertUpdated(ALERT_CODE.CHANGE_PHASE_IS_PRIME_PLAYER_ACTION));
            toast(capitalize(t('alerts.this is prime player action')), {type: "error"});
            return;
        }

        dispatch(socketEmitAction(OTHER_CONTROLLER_ACTION.SET_NEXT_PHASE));
    }

    const style = {
        backgroundColor: primePlayerColor
    }

    const locked = props.locked || localPlayerId !== primePlayerId;

    if (!players) return null;

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
