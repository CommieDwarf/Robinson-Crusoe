import redArrowImg from "/public/UI/misc/red-arrow.png";
import timeConsumingActionToken from "/public/UI/tokens/time-consuming-action.png";
import {ACTION} from "@sharedTypes/ACTION";
import {isAdventureAction} from "@sharedUtils/typeGuards/isAdventureAction";
import ResizableImage from "../../../ResizableImage/ResizableImage";
import {actionOrder} from "@sharedConstants/actionOrder";
import {arePropsEqual} from "@sharedUtils/arePropsEqual";
import {IGlobalCostModifierRenderData} from "@sharedTypes/ActionService/GlobalCostModifier";
import {formatToKebabCase} from "@sharedUtils/formatToKebabCase";
import reRollTokenImg from "/public/UI/tokens/reroll.png";
import styles from "./ActionOrder.module.css";
import {ActionTokens} from "@sharedTypes/ActionService/ActionService";

type Props = {
    adventureTokens: ActionTokens;
    reRollTokens: ActionTokens;
    globalCostModifiers: Record<ACTION, IGlobalCostModifierRenderData[]>
    containerRef: React.RefObject<HTMLDivElement>
}

function ActionOrder(props: Props) {
    let actionIcons: JSX.Element[] = [];


    actionOrder.forEach((action, i) => {
        if (i > 0) {
            actionIcons.push(
                <div className={styles.redArrow} key={i}>
                    <ResizableImage
                        src={redArrowImg}
                        alt="strzałka"
                    />
                </div>
            );
        }
        let adventureTokenSrc = `/UI/actions/${formatToKebabCase(action)}.png`;
        let reRollToken;
        if (isAdventureAction(action)) {
            if (props.adventureTokens[action]) {
                adventureTokenSrc = `/UI/tokens/adventure/${action}.png`;
            }

            if (props.reRollTokens[action]) {
                reRollToken = (
                    <div className={styles.token}>
                        <ResizableImage
                            src={reRollTokenImg}
                            alt={"reroll"}
                            className={styles.reRoll}
                        />
                    </div>
                );
            }
        }
        let timeConsumingActionIcon;
        if (props.globalCostModifiers[action].some((modifier) => modifier.resource === "helper")) {
            timeConsumingActionIcon = <div className={styles.token}>
                <ResizableImage
                    src={timeConsumingActionToken}
                    alt={"wymagany dodatkowy pionek"}
                />
            </div>
        }
        actionIcons.push(
            <div className={styles.actionIcon} key={i + 100}>
                <ResizableImage
                    src={adventureTokenSrc}
                    alt={action}
                />
                <div className={styles.tokens}>
                    {reRollToken}
                    {timeConsumingActionIcon}
                </div>

            </div>
        );
    });

    return (
        <div className={styles.container} ref={props.containerRef}>
            <div className={styles.label}>Kolejność akcji</div>
            {actionIcons}
        </div>
    );
}

export default React.memo(ActionOrder, arePropsEqual<Props>(["containerRef"]));

