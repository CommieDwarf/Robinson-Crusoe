import * as React from "react";
import {useState} from "react";
import styles from "./ActionResolveWindow.module.css";
import {ResolvableItems} from "./ActionResolve/ResolvableItems";
import {ActionDice} from "@shared/types/Game/RollDice/RollDice";
import {sleep} from "@shared/utils/sleep";
import {RESOLVE_ITEM_STATUS} from "@shared/types/Game/ActionService/IResolvableItem";
import {IActionServiceRenderData} from "@shared/types/Game/ActionService/ActionService";
import {NextActionButton} from "./NextActionButton/NextActionButton";
import redArrowImg from "/public/UI/misc/red-arrow.png";
import {ReRoll} from "./ReRoll/ReRoll";
import {isAdventureAction} from "@shared/utils/typeGuards/isAdventureAction";
import ResizableImage from "../../../ResizableImage/ResizableImage";
import {ICharacter} from "@shared/types/Game/Characters/Character";
import {ACTION_CONTROLLER_ACTION} from "@shared/types/CONTROLLER_ACTION";
import sharedStyles from "../../../../styles/shared.module.css";
import Draggable from "react-draggable";
import {RollDiceWindow} from "./RollDiceWindow/RollDiceWindow";
import actionIconImg from "/public/UI/phase/action.png";
import {capitalize, kebabCase} from "lodash";
import {useTranslation} from "react-i18next";
import {socketEmitter} from "../../../../pages/_app";


type Props = {
    actionService: IActionServiceRenderData;
};
export const ActionResolveWindow = (props: Props) => {
    let containerRef = React.createRef<HTMLDivElement>();

    const [resolvedItems, setResolvedItems] = useState<Map<string, boolean>>(
        new Map()
    );
    const [resItemAnimationDoneID, setResItemAnimationDoneID] = useState<
        string | null
    >(null);

    const [reRollButtonClicked, setReRollButtonClicked] = useState(false);
    const [reRolledDice, setReRolledDice] = useState<ActionDice | null>(null);
    const [reRollSkillUsed, setReRollSkillUsed] = useState(false);

    function onReRollButtonClick() {
        const leader = props.actionService.lastRolledItem?.leaderPawn.owner as unknown as ICharacter;

        if (leader.determination &&
            leader.determination > 3
        ) {
            setReRollButtonClicked(true);
        }
    }

    function onReRollSkillUse(dice: ActionDice) {
        setResItemAnimationDoneID(null);

        // TODO: zaimplementuj
        // emitAction(CHARACTER_CONTROLLER_ACTION.USE_ABILITY, {
        //     abilityName: ,
        //     target: dice
        //
        // })
        setReRollButtonClicked(false);
        setReRolledDice(dice);
        setReRollSkillUsed(true);
    }

    async function onReRollSuccess(resolvableItemID: string) {
        if (reRolledDice === "success") {
            setReRolledDice(null);
            await sleep(10);
        }
        socketEmitter.emitAction(ACTION_CONTROLLER_ACTION.REROLL_ACTION_DICE, resolvableItemID)

        setReRolledDice("success");
    }

    function setItemAnimationDone(id: string) {
        setResItemAnimationDoneID(id);
    }

    function setNextAction() {
        setResolvedItems(new Map());
        socketEmitter.emitAction(ACTION_CONTROLLER_ACTION.SET_NEXT_ACTION);
    }

    function rollDices(actionItem: string) {
        const item = getResolvableItem(actionItem);
        setReRolledDice(null);
        if (
            item.shouldRollDices &&
            item.resolveStatus === RESOLVE_ITEM_STATUS.PENDING
        ) {
            socketEmitter.emitAction(ACTION_CONTROLLER_ACTION.ROLL_ACTION_DICES, actionItem)
        }
    }

    function setItemResolved(actionId: string) {
        if (actionId !== props.actionService.lastRolledItem?.id) {
            setReRolledDice(null);
        }

        socketEmitter.emitAction(ACTION_CONTROLLER_ACTION.RESOLVE_ACTION, actionId)

        setResolvedItems((prevState) => {
            const copy = new Map(prevState);
            copy.set(actionId, true);
            return copy;
        });
        setReRollButtonClicked(false);
    }

    function getResolvableItem(id: string) {
        const item = props.actionService.resolvableItems.find(
            (resItem) => resItem.id === id
        );
        if (!item) {
            throw Error(`Can't find item with id: ${id}`);
        }
        return item;
    }

    const {t} = useTranslation();


    return (
        <Draggable bounds="parent" defaultClassNameDragging={sharedStyles.grabbing}>
            <div className={styles.container} ref={containerRef}>
                {reRollButtonClicked && (
                    <div className={styles.reRollArrowTip}>
                        <ResizableImage
                            src={redArrowImg}
                            alt={"przerzuć kość"}
                        />
                    </div>
                )}
                {props.actionService.lastRolledItem &&
                    !resolvedItems.has(props.actionService.lastRolledItem.id) &&
                    !props.actionService.lastRolledItem.shouldReRollSuccess &&
                    !reRollSkillUsed && (
                        <ReRoll
                            actionService={props.actionService}
                            onReRollButtonClick={onReRollButtonClick}
                        />
                    )}

                {props.actionService.lastRolledItem &&
                    isAdventureAction(props.actionService.action) && (
                        <RollDiceWindow
                            resolvableItem={props.actionService.lastRolledItem}
                            type={props.actionService.action}
                            setItemAnimationDone={setItemAnimationDone}
                            reRollClicked={reRollButtonClicked}
                            reRoll={onReRollSkillUse}
                            reRolledDice={reRolledDice}
                        />
                    )}
                <div className={styles.header}>
                    <div className={styles.actionIcon}>
                        <ResizableImage
                            src={actionIconImg}
                            alt={"akcja"}
                            className={styles.actionIcon}
                        />
                    </div>
                    <div className={styles.title}>{capitalize(t("phase.phase", {
                        phase: "action"
                    }))}</div>
                    <div className={styles.actionIcon}>
                        <ResizableImage
                            src={`/UI/actions/${kebabCase(props.actionService.action)}.png`}
                            alt={"akcja"}
                        />
                    </div>
                </div>

                <ResolvableItems
                    actionService={props.actionService}
                    resolve={setItemResolved}
                    resolvedItems={resolvedItems}
                    locked={
                        props.actionService.lastRolledItem
                            ? props.actionService.lastRolledItem.id !== resItemAnimationDoneID
                            : false
                    }
                    rollDices={rollDices}
                    reRoll={onReRollSuccess}
                />
                {props.actionService.resolvableItems.length === resolvedItems.size && (
                    <NextActionButton
                        setNextAction={setNextAction}
                        actionService={props.actionService}
                    />
                )}
            </div>
        </Draggable>

    );
};
