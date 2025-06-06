import treasureIcon from "/public/UI/misc/treasure.webp";
import plusImg from "/public/UI/misc/plus.webp";
import minusImg from "/public/UI/misc/minus.webp";
import styles from "./UseButtons.module.css";
import DynamicImage from "../../../../../../../DynamicImage/DynamicImage";
import {kebabCase} from "lodash";
import {ITreasureMysteryCardRenderData} from "@shared/types/Game/MysteryService/MysteryCard";
import {isStorageCard} from "@shared/utils/typeGuards/isStorageCard";
import {MYSTERY_CONTROLLER_ACTION} from "@shared/types/CONTROLLER_ACTION";
import {useAppDispatch} from "../../../../../../../../store/hooks";
import {socketEmitAction} from "../../../../../../../../middleware/socketMiddleware";
import { ReactElement } from "react";

interface Props {
    card: ITreasureMysteryCardRenderData;
    onMouseEnterButton: () => void;
    onMouseLeaveButton: () => void;
    use: () => void;

}

export default function UseButtons(props: Props) {

    const dispatch = useAppDispatch();

    const buttonType =
        props.card.uses === 1 || props.card.uses === Infinity ? "single" : "multi";
    const usesMulti = [];
    if (buttonType === "multi") {
        const usesLeft = props.card.uses - props.card.usedCount;
        for (let i = 0; i < usesLeft; i++) {
            usesMulti.push(
                <div
                    className={styles.useMark}
                    onMouseEnter={props.onMouseEnterButton}
                    onMouseLeave={props.onMouseLeaveButton}
                    onClick={props.use}
                >
                    <DynamicImage
                        className={styles.treasureImage}
                        src={treasureIcon}
                        alt="użycie"
                    />
                </div>
            );
        }
    }


    const resources: ReactElement[] = [];

    if (isStorageCard(props.card) && props.card.stored) {
        Object.entries(props.card.stored).forEach(([res, amount]) => {
            const sourceImg = `/UI/resources/${kebabCase(res)}.webp`;
            for (let i = 0; i < amount; i++) {
                resources.push(
                    <div className={styles.resource}>
                        <DynamicImage
                            src={sourceImg}
                            alt="depozyt"
                        />
                    </div>
                );
            }
        });
    }

    function handleWithdraw() {
        if (isStorageCard(props.card)) {
            dispatch(socketEmitAction(MYSTERY_CONTROLLER_ACTION.MANAGE_CARD_STORAGE,
                props.card.name,
                "withdraw"
            ));
        }
    }

    function handleDeposit() {
        if (isStorageCard(props.card)) {
            dispatch(socketEmitAction(MYSTERY_CONTROLLER_ACTION.MANAGE_CARD_STORAGE,
                props.card.name,
                "deposit"
            ));
        }
    }


    return (
        <div className={styles.container}>
            {buttonType === "single" && props.card.uses !== props.card.usedCount && (
                <button
                    className={`${styles.button} primaryButton`}
                    onMouseEnter={props.onMouseEnterButton}
                    onMouseLeave={props.onMouseLeaveButton}
                    onClick={props.use}
                >
                    Użyj
                </button>
            )}
            {buttonType === "multi" && (
                <div className={styles.useMarks}>{usesMulti}</div>
            )}
            {isStorageCard(props.card) && props.card.uses === props.card.usedCount && (
                <div className={styles.storage}>
                    <div
                        className={`${styles.withdraw} ${styles.storageButton}`}
                        onMouseEnter={props.onMouseEnterButton}
                        onMouseLeave={props.onMouseLeaveButton}
                        onClick={handleWithdraw}
                    >
                        <DynamicImage
                            src={minusImg}
                            alt="Wyjmij"
                        />
                    </div>
                    {resources}
                    <div
                        className={`${styles.deposit} ${styles.storageButton}`}
                        onMouseEnter={props.onMouseEnterButton}
                        onMouseLeave={props.onMouseLeaveButton}
                        onClick={handleDeposit}
                    >
                        <DynamicImage
                            src={plusImg}
                            alt="Zdeponuj"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
