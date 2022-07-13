import Image from "next/image";
import React from "react";
import styles from "./Threat.module.css";
import ActionSlot from "../ActionSlot";
import Card from "./Card";
import ThreatCards from "../../../../interfaces/threatCards";
import Pawn from "../../../../interfaces/Pawn";

interface Props {
    threatCards: ThreatCards;
    actionSlots: Map<string, Pawn | null>;
}

export default function Threat(props: Props) {


    function getActionSlots(side: "left" | "right") {
        const actionSlots = [];

        for (let i = 1; i <= 2; i++) {
            const id = "threat-" + side + "-" + i;
            let pawn = props.actionSlots.get(id);
            pawn = pawn ? pawn : null;
            actionSlots.push(
                <ActionSlot
                    type="leader"
                    pawn={pawn}
                    action="threat"
                    context="threat"
                    id={id}
                    key={id}
                />
            );
        }
        return actionSlots;
    }

    return (
        <div className={styles.container}>
            <Card card={props.threatCards.left}/>
            <Card card={props.threatCards.right}/>
            <div className={styles.arrow}>
                <Image
                    src="/interface/cards/red-arrow.png"
                    layout="fill"
                    alt="strzałka"
                />
            </div>
            <div className={styles.curvedArrow}>
                <Image
                    src="/interface/cards/red-arrow-curved.png"
                    layout="fill"
                    alt="strzałka"
                />
            </div>
            <div className={styles.actionSlots}>
                {props.threatCards.left && (
                    getActionSlots("left")
                )}
            </div>
            <div className={styles.actionSlots}>
                {props.threatCards.right && (
                    getActionSlots("right")
                )}
            </div>
        </div>
    );
}
