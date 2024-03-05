import {
    IMysteryCard,
    IMysteryCardRenderData,
} from "../../../../../../../../../interfaces/MysteryService/MysteryCard";
import treasureIcon from "/public/UI/misc/treasure.png";
import Image from "next/image";
import oldPaperImg from "/public/UI/paper-background.png";
import plusImg from "/public/UI/misc/plus.png";
import minusImg from "/public/UI/misc/minus.png";

import styles from "./UseOverlay.module.css";
import {formatToKebabCase} from "../../../../../../../../../utils/formatToKebabCase";
import {isStorageCard} from "../../../../../../../../../utils/typeGuards/isStorageCard";
import {StorageAction} from "../../../../../../../../../interfaces/MysteryService/StorageCard";
import ResizableImage from "../../../../../../../ResizableImage/ResizableImage";

interface Props {
    card: IMysteryCardRenderData;
    onMouseEnterButton: () => void;
    onMouseLeaveButton: () => void;
    manageStorage: (cardName: string, type: "mystery", action: StorageAction) => void;
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
            const sourceImg = `/UI/resources/${formatToKebabCase(res)}.png`;
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
            props.manageStorage(props.card.name, "mystery", "withdraw");
        }
    }

    function handleDeposit() {
        if (isStorageCard(props.card)) {
            props.manageStorage(props.card.name, "mystery", "deposit");
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
