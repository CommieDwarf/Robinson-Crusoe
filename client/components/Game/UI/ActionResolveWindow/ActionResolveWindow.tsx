import * as React from "react";
import {useEffect, useRef, useState} from "react";
import styles from "./ActionResolveWindow.module.css";
import {ResolvableItems} from "./ActionResolve/ResolvableItems";
import {ActionDice} from "@shared/types/Game/RollDice/RollDice";
import {sleep} from "@shared/utils/sleep";
import {RESOLVE_ITEM_STATUS} from "@shared/types/Game/ActionService/IResolvableItem";
import {NextActionButton} from "./NextActionButton/NextActionButton";
import redArrowImg from "/public/UI/misc/red-arrow.png";
import {isAdventureAction} from "@shared/utils/typeGuards/isAdventureAction";
import ResizableImage from "../../../ResizableImage/ResizableImage";
import {ICharacterRenderData} from "@shared/types/Game/Characters/Character";
import {ACTION_CONTROLLER_ACTION, CHARACTER_CONTROLLER_ACTION} from "@shared/types/CONTROLLER_ACTION";
import sharedStyles from "../../../../styles/shared.module.css";
import Draggable from "react-draggable";
import {RollDiceWindow} from "./RollDiceWindow/RollDiceWindow";
import actionIconImg from "/public/UI/phase/action.png";
import {capitalize, kebabCase} from "lodash";
import {useTranslation} from "react-i18next";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import {selectGame} from "../../../../reduxSlices/gameSession";
import {socketEmitAction} from "../../../../middleware/socketMiddleware";
import Entries from "@shared/types/Entries";
import {getCharacterRerollAbility} from "./getReRollAbility";
import {ReRollButton} from "./ReRollButton/ReRollButton";


export const ActionResolveWindow = () => {
    let containerRef = React.createRef<HTMLDivElement>();
    const actionService = useAppSelector(state => selectGame(state)!.actionService!);
    const localPlayerCharName = useAppSelector(state => state.gameSession.data?.localPlayer.character?.name);

    const [resolvedItems, setResolvedItems] = useState<Map<string, boolean>>(
        new Map()
    );
    const [resItemAnimationDoneID, setResItemAnimationDoneID] = useState<
        string | null
    >(null);

    const [reRollButtonClicked, setReRollButtonClicked] = useState(false);

    const reRollButtonClickedRef = useRef(false);

    useEffect(() => {
        reRollButtonClickedRef.current = reRollButtonClicked;
    }, [reRollButtonClicked]);


    const [reRolledDice, setReRolledDice] = useState<ActionDice | null>(null);
    const [reRollSkillUsed, setReRollSkillUsed] = useState(false);

    const dispatch = useAppDispatch();

    useEffect(() => {
        const entries = actionService.resolvableItems.map((item) => {
            return [item.id, item.resolveStatus !== RESOLVE_ITEM_STATUS.PENDING];
        }) as Entries<{ [id: string]: boolean }>
        setResolvedItems(new Map(entries));
    }, [actionService.resolvableItems]);


    function onReRollButtonClick() {
        if (reRollButtonClicked) {
            return;
        }
        const leader = actionService.lastRolledItem?.leaderPawn.owner as ICharacterRenderData;
        const ability = getCharacterRerollAbility(leader);
        if (ability && leader.determination >= ability.cost
        ) {
            setReRollButtonClicked(true);
        }
    }

    const onReRollSkillUse = (dice: ActionDice) => {
        if (!reRollButtonClickedRef.current) {
            return;
        }


        const leader = actionService.lastRolledItem?.leaderPawn.owner as ICharacterRenderData;
        const ability = getCharacterRerollAbility(leader);
        if (!leader || !ability || reRollSkillUsed) {
            return;
        }


        setResItemAnimationDoneID(null);
        setReRollButtonClicked(false);
        setReRolledDice(dice);
        dispatch(socketEmitAction(CHARACTER_CONTROLLER_ACTION.USE_ABILITY, ability?.name, dice));
        setReRollSkillUsed(true);
    }

    async function onReRollSuccess() {
        if (reRolledDice === "success") {
            setReRolledDice(null);
            await sleep(10);
        }

        dispatch(socketEmitAction(ACTION_CONTROLLER_ACTION.REROLL_ACTION_DICE, "success"));
        setReRolledDice("success");
    }

    function setItemAnimationDone(id: string) {
        setResItemAnimationDoneID(id);
    }

    function setNextAction() {
        setResolvedItems(new Map());
        dispatch(socketEmitAction(ACTION_CONTROLLER_ACTION.SET_NEXT_ACTION));
    }

    function rollDices(actionItem: string) {
        const item = getResolvableItem(actionItem);
        setReRolledDice(null);
        if (
            item.shouldRollDices &&
            item.resolveStatus === RESOLVE_ITEM_STATUS.PENDING
        ) {
            dispatch(socketEmitAction(ACTION_CONTROLLER_ACTION.ROLL_ACTION_DICES, actionItem));
        }
    }

    function setItemResolved(actionId: string) {
        if (actionId !== actionService.lastRolledItem?.id) {
            setReRolledDice(null);
        }
        setResolvedItems((prevState) => {
            const copy = new Map(prevState);
            copy.set(actionId, true);
            return copy;
        });
        setReRollButtonClicked(false);
        dispatch(socketEmitAction(ACTION_CONTROLLER_ACTION.RESOLVE_ACTION, actionId));
    }


    function getResolvableItem(id: string) {
        const item = actionService.resolvableItems.find(
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


                {actionService.lastRolledItem &&
                    (actionService.lastRolledItem.resolveStatus === RESOLVE_ITEM_STATUS.PENDING &&
                        !actionService.lastRolledItem.shouldReRollSuccess &&
                        !reRollSkillUsed &&
                        localPlayerCharName === actionService.lastRolledItem.leaderPawn.owner.name
                    ) && (
                        <ReRollButton
                            actionService={actionService}
                            onReRollButtonClick={onReRollButtonClick}
                            currentAction={actionService.action}
                        />
                    )
                }

                {actionService.lastRolledItem &&
                    isAdventureAction(actionService.action) && (
                        <RollDiceWindow
                            resolvableItem={actionService.lastRolledItem}
                            type={actionService.action}
                            setItemAnimationDone={setItemAnimationDone}
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
                            src={`/UI/actions/${kebabCase(actionService.action)}.png`}
                            alt={"akcja"}
                        />
                    </div>
                </div>

                <ResolvableItems
                    actionService={actionService}
                    resolve={setItemResolved}
                    resolvedItems={resolvedItems}
                    locked={
                        actionService.lastRolledItem
                            ? actionService.lastRolledItem.id !== resItemAnimationDoneID
                            : false
                    }
                    rollDices={rollDices}
                    reRoll={onReRollSuccess}
                />
                {(Array.from(resolvedItems.values()).every(value => value)) && (
                    <NextActionButton
                        setNextAction={setNextAction}
                        actionService={actionService}
                    />
                )}
            </div>
        </Draggable>

    );
};
