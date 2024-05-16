import styles from "./Player.module.css";
import bootKickImg from "/public/UI/boot-kick.png";
import ResizableImage from "../../../ResizableImage/ResizableImage";
import {useTranslation} from "react-i18next";
import {IPlayerRenderData} from "@shared/types/Game/PlayerService/Player";
import {ChangeEvent, useEffect, useState} from "react";
import {CHARACTER} from "@shared/types/Game/Characters/Character";
import {socket, socketEmitter} from "../../../../pages/_app";
import checkMark from "/public/UI/misc/check-mark.png";
import xMarkImg from "/public/UI/misc/x-mark.png";
import {SOCKET_EMITTER, SocketPayloadMap} from "@shared/types/Requests/Socket";
import {PlayerLatency} from "../../../PlayerLatency/PlayerLatency";

interface Props {
    player: IPlayerRenderData,
    local: boolean,
    host: boolean,
    hostControls: boolean,
}


export function Player(props: Props) {

    const {t} = useTranslation();

    const [character, setCharacter] = useState<CHARACTER>(props.player.assignedCharacter.char);
    const [latency, setLatency] = useState<number | null>(null);


    useEffect(() => {
        socket.on(SOCKET_EMITTER.PLAYER_LATENCY_SENT, (payload: SocketPayloadMap[SOCKET_EMITTER.PLAYER_LATENCY_SENT]) => {
            if (payload.playerId === props.player.id) {
                setLatency(payload.latency);
            }

        })
    }, [props.player.id])

    function handleChange(event: ChangeEvent<HTMLSelectElement>) {
        setCharacter(event.currentTarget.value as CHARACTER);
        socketEmitter.emitChangeCharacter({
            char: event.currentTarget.value as CHARACTER
        })
    }

    function handleKickClick() {
        if (props.hostControls) {
            socketEmitter.emitKickPlayer(props.player.id);
        }
    }


    return <div className={`${styles.container} ${props.local && styles.localPlayer}`}>
        <div className={styles.name}>
            {props.player.username}
            {props.host && <div className={styles.host}>
                <ResizableImage src={"/UI/misc/crown.png"} alt={"host"} fill/>
            </div>}
        </div>

        <div className={styles.character}>
            <select onChange={handleChange} defaultValue={character} disabled={!props.local}>
                <option value={CHARACTER.COOK}>{t("character.cook")}
                </option>
                <option value={CHARACTER.EXPLORER}>{t("character.explorer")}</option>
                <option value={CHARACTER.CARPENTER}>{t("character.carpenter")}</option>
                <option value={CHARACTER.SOLDIER}>{t("character.soldier")}</option>
            </select>
        </div>
        <div className={`${styles.readiness} ${props.player.ready && styles.readinessReady}`}>
            {props.player.ready ? <ResizableImage src={checkMark} alt={"readiness"}/>
                : <ResizableImage src={xMarkImg} alt={"readiness"}/>
            }
        </div>
        <div className={styles.latency}>
            <PlayerLatency latency={latency}/>
        </div>
        <div className={`${styles.kickButton} ${!props.hostControls && styles.disabled}`} onClick={handleKickClick}>
            {!props.host &&
                <ResizableImage src={bootKickImg} alt={"bootKick"}/>
            }
        </div>
    </div>
}
