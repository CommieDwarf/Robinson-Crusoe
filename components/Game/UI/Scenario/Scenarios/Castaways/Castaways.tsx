import styles from "./Castaways.module.css";
import Image from "next/image";
import {Description} from "./Description/Description";
import {WoodStash} from "./WoodStack/WoodStash";

import Invention from "../../../CardList/Cards/Card/Invention/Invention";
import React, {useLayoutEffect, useRef, useState} from "react";
import {IInventionRenderData, INVENTION_STARTER} from "../../../../../../interfaces/InventionService/Invention";

import scenarioBackgroundImg from "/public/UI/scenarios/background.png";
import bookEffectImg from "/public/UI/scenarios/castaways/book-effect.png";
import totemEffectImg from "/public/UI/scenarios/castaways/totem-effect.png";
import scenarioTokensImg from "/public/UI/scenarios/castaways/tokens.png";
import Rounds from "./Rounds/Rounds";
import {IScenarioServiceRenderData} from "../../../../../../interfaces/ScenarioService/ScenarioService";
import {Card} from "../../../CardList/Cards/Card/Card";

interface Props {
    inventions: IInventionRenderData[];
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    zIndex: string;
    round: number;
    scenario: IScenarioServiceRenderData;
    addWoodToStash: () => void;
}

export default function Castaways(props: Props) {

    const inventionContRef = useRef<HTMLDivElement>(null);
    const [inventionContHeight, setInventionContHeight] = useState<number>(0);
    const [inventionContWidth, setInventionContWidth] = useState<number>(0);

    useLayoutEffect(() => {
        const {current} = inventionContRef;
        if (current) {
            setInventionContHeight(current.getBoundingClientRect().height);
            setInventionContWidth(current.getBoundingClientRect().width)
        }
    }, [])

    function handleClick() {
        props.setShow(false);
    }

    const fireBuilt = Boolean(props.inventions.find((inv) => inv.name === INVENTION_STARTER.FIRE)?.isBuilt);

    const cardAspectRatio = Number(getComputedStyle(document.documentElement)
        .getPropertyValue('--cardAspectRatio'));

    const cardWidth = inventionContHeight * cardAspectRatio;
    const cardEnlargeScale = 1.5;

    console.log("height", inventionContHeight);
    console.log("width", inventionContHeight * cardAspectRatio);
    console.log("totalWidth", inventionContWidth);
    console.log(inventionContRef)

    return (
        <div className={styles.container}>
            <div className={styles.hideButton} onClick={handleClick}>
                X
            </div>
            <div className={styles.titleDiv}>
                <span className={styles.title}>Rozbitkowie</span>
            </div>
            <Rounds current={props.round}/>
            <Description/>
            <div className={styles.eventEffects}>
                <div className={styles.eventEffect + " " + styles.bookEffect}>
                    <Image
                        src={bookEffectImg}
                        fill
                        alt={"tokeny"}
                        sizes={styles.eventEffect}
                    />
                </div>

                <div className={styles.eventEffect}>
                    <Image
                        src={totemEffectImg}
                        fill
                        alt={"tokeny"}
                        sizes={styles.eventEffect}
                    />
                </div>
            </div>
            <WoodStash lvl={props.scenario.woodStashLvl} committedWood={props.scenario.committedWood}
                       addWood={props.addWoodToStash}
                       canAddWood={props.scenario.canAddWood}
                       isFireBuilt={props.scenario.isFireBuilt}
            />
            <div className={styles.bottomHalf}>
                <div className={styles.tokens}>
                    <Image
                        src={scenarioTokensImg}
                        fill
                        alt={"tokeny"}
                        sizes={styles.tokens}
                    />
                </div>
                <div className={styles.inventions} ref={inventionContRef}>
                    {props.inventions.map((inv, i) => {
                        return (
                            <Card
                                key={inv.name}
                                card={inv}
                                column={i}
                                row={0}
                                top={0}
                                zIndexIncreased={props.zIndex.includes(inv.name)}
                                useInventionCard={() => {
                                }}
                                useMysteryCard={() => {
                                }}
                                manageStorage={() => {
                                }}
                                height={inventionContHeight}
                                width={cardWidth}
                                totalWidth={inventionContWidth}
                                useItem={() => {
                                }}
                                enlargeParams={{
                                    top: -inventionContHeight * cardEnlargeScale / 2,
                                    left: (inventionContWidth / 2) - (cardWidth * cardEnlargeScale / 2),
                                    scale: cardEnlargeScale,
                                }}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
