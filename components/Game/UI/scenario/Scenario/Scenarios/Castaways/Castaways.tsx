import styles from "./Castaways.module.css";
import Image from "next/image";
import {Description} from "./Description/Description";
import {WoodStash} from "./WoodStack/WoodStash";

import Invention from "../../../../CardList/Cards/Card/Invention/Invention";
import React from "react";
import {IInventionRenderData, INVENTION_STARTER} from "../../../../../../../interfaces/InventionService/Invention";

import scenarioBackgroundImg from "/public/UI/scenarios/background.png";
import bookEffectImg from "/public/UI/scenarios/castaways/book-effect.png";
import totemEffectImg from "/public/UI/scenarios/castaways/totem-effect.png";
import scenarioTokensImg from "/public/UI/scenarios/castaways/tokens.png";
import Rounds from "./Rounds/Rounds";
import {IScenarioServiceRenderData} from "../../../../../../../interfaces/ScenarioService/ScenarioService";
import {Card} from "../../../../CardList/Cards/Card/Card";

interface Props {
    inventions: IInventionRenderData[];
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    zIndex: string;
    round: number;
    scenario: IScenarioServiceRenderData;
    addWoodToStash: () => void;
}

export default function Castaways(props: Props) {
    function handleClick() {
        props.setShow(false);
    }

    const fireBuilt = Boolean(props.inventions.find((inv) => inv.name === INVENTION_STARTER.FIRE)?.isBuilt);

    return (
        <div className={styles.container}>
            <div className={styles.hideButton} onClick={handleClick}>
                X
            </div>
            <div className={styles.titleDiv}>
                <span className={styles.title}>Rozbitkowie</span>
                <Image
                    src={scenarioBackgroundImg}
                    className={styles.titleImage}
                    fill
                    alt="tytuł tło"
                    sizes={styles.titleDiv}
                />
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
                <div className={styles.inventions}>
                    {props.inventions.map((inv, i) => {
                        return (
                            <Card
                                key={inv.name}
                                card={inv}
                                column={i + 1}
                                row={1}
                                top={-100}
                                zIndexIncreased={props.zIndex.includes(inv.name)}
                                useInventionCard={() => {
                                }}
                                useMysteryCard={() => {
                                }}
                                manageStorage={() => {
                                }}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
