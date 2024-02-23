// @flow
import * as React from "react";
import {useState} from "react";

import styles from "./Item.module.css";
import {IEventCardRenderData} from "../../../../../../interfaces/EventService/EventCard";
import {IConstruction} from "../../../../../../interfaces/ConstructionService/Construction";
import {ITileRenderData} from "../../../../../../interfaces/TileService/ITile";
import Image from "next/image";
import {IInventionRenderData} from "../../../../../../interfaces/InventionService/Invention";
import {IBeastRenderData} from "../../../../../../interfaces/Beasts/Beast";
import {
    IResolvableItemRenderData,
    RESOLVE_ITEM_STATUS,
} from "../../../../../../interfaces/ActionService/IResolvableItem";
import {getImgName} from "../../../../../../utils/getImgName";
import redArrowImg from "/public/UI/misc/red-arrow.png";
import {ACTION} from "../../../../../../interfaces/ACTION";
import {IActionServiceRenderData} from "../../../../../../interfaces/ActionService/ActionService";
import {Tokens} from "./Tokens/Tokens";
import reRollTokenImg from "/public/UI/tokens/reroll.png";

type Props = {
    resolvableItem: IResolvableItemRenderData;
    resolve: (ResolvableItemID: string) => void;
    locked: boolean;
    rollDices: (resolvableItemID: string) => void;
    reRoll: (resolvableItemID: string) => void;
    actionService: IActionServiceRenderData;
    setBibleUsage: (resolvableItemId: string, value: boolean) => void;
    resolved: boolean;
};
export const Item = (props: Props) => {
    let image;
    let extraInfoDiv;
    let itemTypeStatusClass = "";

    const [used, setUsed] = useState(false);


    function handleBibleCheckBoxClick() {
        props.setBibleUsage(props.resolvableItem.id, !props.resolvableItem.bibleChecked)
    }

    if (props.resolvableItem.action === ACTION.THREAT) {
        const card = props.resolvableItem.item as unknown as IEventCardRenderData;
        image = (
            <div className={styles.threat}>
                <Image
                    src={`/UI/cards/event/${getImgName(card.name)}.png`}
                    fill
                    alt={card.name}
                    sizes={styles.threat}
                />
            </div>
        );
    } else if (props.resolvableItem.action === ACTION.HUNT) {
        const beast = props.resolvableItem.item as unknown as IBeastRenderData;
        image = (
            <div className={styles.hunt}>
                <Image
                    src={`/UI/cards/beasts/${getImgName(beast.name)}.png`}
                    fill
                    alt={beast.name}
                    sizes={styles.hunt}
                />
            </div>
        );
    } else if (props.resolvableItem.droppableID.includes("invention")) {
        const invention = props.resolvableItem
            .item as unknown as IInventionRenderData;
        const reverse =
            invention.isBuilt && invention.inventionType !== "scenario" ? "-reverse" : "";
        image = (
            <div className={styles.invention}>
                <Image
                    src={`/UI/inventions/${invention.inventionType}/${getImgName(
                        invention.name
                    )}${reverse}.png`}
                    fill
                    alt={invention.name}
                    sizes={styles.invention}
                />
            </div>
        );
    } else if (props.resolvableItem.droppableID.includes("construction")) {
        itemTypeStatusClass = styles.constructionStatus;
        const construction = props.resolvableItem.item as unknown as IConstruction;
        image = (
            <div className={styles[construction.name] + " " + styles.construction}>
                <Image
                    src={`/UI/constructions/${getImgName(construction.name)}.png`}
                    fill
                    alt={construction.name}
                    sizes={styles.construction}
                />
            </div>
        );
        const arrowAndNextLvl =
            props.resolvableItem.resolveStatus === RESOLVE_ITEM_STATUS.PENDING ? (
                ""
            ) : (
                <>
                    <div className={styles.arrow}>
                        <Image src={redArrowImg} fill alt="lvl" sizes={styles.arrow}/>
                    </div>
                    <span className={styles.nextLvl + " " + styles.lvl}>
            {construction.lvl + 1}
                        <span className={styles.lvlSpan}>lvl</span>
          </span>
                </>
            );
        extraInfoDiv = (
            <div className={styles.structureLvl}>
        <span className={styles.currentLvl + " " + styles.lvl}>
          {construction.lvl}
            <span className={styles.lvlSpan}>lvl</span>
        </span>
                {arrowAndNextLvl}
            </div>
        );
    } else if (
        props.resolvableItem.action === ACTION.GATHER ||
        props.resolvableItem.action === ACTION.EXPLORE
    ) {
        const tile = props.resolvableItem.item as unknown as ITileRenderData;
        itemTypeStatusClass = styles.tileStatus;
        const id =
            tile.tileResourceService?.id != null &&
            (props.resolved || props.resolvableItem.action === ACTION.GATHER)
                ? tile.tileResourceService.id
                : 11;

        image = (
            <div className={styles.tile}>
                <Image
                    src={`/UI/map/tiles/${id}.png`}
                    fill
                    alt={"kafelek"}
                    sizes={styles.tile}
                />
            </div>
        );
        if (props.resolvableItem.action === ACTION.GATHER) {
            const side = props.resolvableItem.droppableID.includes("left")
                ? "left"
                : "right";
            extraInfoDiv = (
                <div className={styles.gather}>
                    <span className={styles.gatherAmount}>1</span>
                    <div className={styles.resourceIcon}>
                        <Image
                            src={`/UI/resources/${tile.tileResourceService?.resources[side].resource}.png`}
                            fill
                            sizes={styles.resourceIcon}
                            alt={"surowiec"}
                        />
                    </div>
                </div>
            );
        }
    } else {
        image = (
            <div className={styles.restArrange}>
                <Image
                    src={`/UI/actions/${getImgName(
                        props.resolvableItem.action
                    )}-picture.png`}
                    fill
                    sizes={styles.restArrange}
                    alt={props.resolvableItem.action}
                />
            </div>
        );
    }

    function handleClick() {
        if (used || props.locked) {
            return;
        }
        if (props.resolvableItem.shouldReRollSuccess) {
            props.reRoll(props.resolvableItem.id);
        } else if (
            props.resolvableItem.shouldRollDices &&
            props.resolvableItem.resolveStatus === RESOLVE_ITEM_STATUS.PENDING
        ) {
            props.rollDices(props.resolvableItem.id);
        } else {
            props.resolve(props.resolvableItem.id);
            setUsed(true);
        }
    }

    const lockedButtonClass =
        used || props.locked ? styles.locked : styles.clickableButton;
    const imageName = `${props.resolvableItem.leaderPawn.character.name}-${props.resolvableItem.leaderPawn.character.gender}`;
    const statusClass =
        props.resolvableItem.resolveStatus === RESOLVE_ITEM_STATUS.SUCCESS
            ? styles.success
            : styles.failure;

    const action = props.resolvableItem.action;
    let buttonText: string | (JSX.Element | string)[];
    if (props.resolvableItem.shouldReRollSuccess && !props.locked) {
        buttonText = [
            "Przerzuć",
            <div className={styles.reRollToken} key={"1"}>
                <Image
                    src={reRollTokenImg}
                    alt={"przerzut sukcesu"}
                    sizes={styles.reRollToken}
                    fill
                />
            </div>,
        ];
    } else if (props.resolvableItem.shouldRollDices) {
        buttonText = "Rzuć kośćmi";
    } else {
        buttonText = "Wykonaj";
    }

    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <Tokens
                    action={action}
                    reRollTokens={props.actionService.reRollTokens}
                    adventureTokens={props.actionService.adventureTokens}
                />
                {image}
                {extraInfoDiv}
            </div>

            {props.resolved && (
                <div
                    className={`${styles.status} ${itemTypeStatusClass} ${statusClass}`}
                >
                    {props.resolvableItem.resolveStatus === RESOLVE_ITEM_STATUS.FAILURE
                        ? "Porażka!"
                        : "Sukces!"}
                </div>
            )}
            {(props.resolvableItem.canBibleBeUsed || props.resolvableItem.bibleChecked) &&
                <div className={styles.itemUseCheckBox}>Użyć Biblii? <input type="checkbox"
                                                                            className={styles.checkbox}
                                                                            checked={props.resolvableItem.bibleChecked}
                                                                            onClick={handleBibleCheckBoxClick}
                ></input></div>}
            <div
                className={`${styles.resolveButton} ${lockedButtonClass}`}
                onClick={handleClick}
            >
                {buttonText}
            </div>
            <div className={styles.character}>
                <Image
                    src={`/interface/characters/pawns/${imageName}.png`}
                    fill
                    alt="pionek"
                    sizes={styles.character}
                />
            </div>
        </div>
    );
};
