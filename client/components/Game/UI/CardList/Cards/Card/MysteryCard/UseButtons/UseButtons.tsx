import treasureIcon from "/public/UI/misc/treasure.png";
import plusImg from "/public/UI/misc/plus.png";
import minusImg from "/public/UI/misc/minus.png";
import styles from "./UseButtons.module.css";
import ResizableImage from "../../../../../../../ResizableImage/ResizableImage";
import {kebabCase} from "lodash";
import {ITreasureMysteryCardRenderData} from "@shared/types/Game/MysteryService/MysteryCard";
import {isStorageCard} from "@shared/utils/typeGuards/isStorageCard";
import {MYSTERY_CONTROLLER_ACTION} from "@shared/types/CONTROLLER_ACTION";
import {socketEmitter} from "../../../../../../../../pages/_app";

interface Props {
    card: ITreasureMysteryCardRenderData;
    onMouseEnterButton: () => void;
    onMouseLeaveButton: () => void;
    use: () => void;

}

export default function UseButtons(props: Props) {

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
                    <ResizableImage
                        className={styles.treasureImage}
                        src={treasureIcon}
                        alt="użycie"
                    />
                </div>
            );
        }
    }


    const resources: any[] = [];

    if (isStorageCard(props.card) && props.card.stored) {
        Object.entries(props.card.stored).forEach(([res, amount]) => {
            const sourceImg = `/UI/resources/${kebabCase(res)}.png`;
            for (let i = 0; i < amount; i++) {
                resources.push(
                    <div className={styles.resource}>
                        <ResizableImage
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
            socketEmitter.emitAction(MYSTERY_CONTROLLER_ACTION.MANAGE_CARD_STORAGE,
                props.card.name,
                "withdraw"
            )
        }
    }

    function handleDeposit() {
        if (isStorageCard(props.card)) {
            socketEmitter.emitAction(MYSTERY_CONTROLLER_ACTION.MANAGE_CARD_STORAGE,
                props.card.name,
                "deposit"
            )
        }
    }


    return (
        <div className={styles.container}>
            {buttonType === "single" && props.card.uses !== props.card.usedCount && (
                <button
                    className={styles.button}
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
                        <ResizableImage
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
                        <ResizableImage
                            src={plusImg}
                            alt="Zdeponuj"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
