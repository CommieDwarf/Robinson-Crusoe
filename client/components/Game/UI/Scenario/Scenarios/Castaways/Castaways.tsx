import styles from "./Castaways.module.css";
import {Description} from "./Description/Description";
import {WoodPile} from "./WoodPile/WoodPile";
import React, {useLayoutEffect, useRef, useState} from "react";

import bookEffectImg from "/public/UI/scenarios/castaways/book-effect.png";
import totemEffectImg from "/public/UI/scenarios/castaways/totem-effect.png";
import scenarioTokensImg from "/public/UI/scenarios/castaways/tokens.png";
import Rounds from "./Rounds/Rounds";
import {Card} from "../../../CardList/Cards/Card/Card";
import ResizableImage from "../../../../../ResizableImage/ResizableImage";
import {useTranslation} from "react-i18next";
import {capitalize} from "lodash";
import {useAppSelector} from "../../../../../../store/hooks";
import {selectGame} from "../../../../../../reduxSlices/gameSession";

interface Props {
    zIndex: string;
}

export default function Castaways(props: Props) {
    const inventions = useAppSelector((state) => {
        return selectGame(state)?.inventionService.inventions!
    })

    const currentRound = useAppSelector((state) => selectGame(state)?.round);


    const scenarioInventions = inventions
        .filter((inv) => inv.inventionType === "scenario");

    const inventionContRef = useRef<HTMLDivElement>(null);
    const [inventionContWidth, setInventionContWidth] = useState<number>(0);

    useLayoutEffect(() => {
        const {current} = inventionContRef;

        updateSizes();

        function updateSizes() {
            if (current) {
                setInventionContWidth(current.getBoundingClientRect().width)
            }
        }

        const container = current;

        if (container) container.addEventListener("resize", updateSizes);

        return () => {
            if (container) container.removeEventListener("resize", updateSizes);
        }
    }, [])


    const cardAspectRatio = Number(getComputedStyle(document.documentElement)
        .getPropertyValue('--cardAspectRatio'));

    const cardWidth = inventionContWidth / 2;
    const cardHeight = cardWidth / cardAspectRatio;
    const cardEnlargeScale = 1.5;

    const {t} = useTranslation();

    return (
        <div className={styles.container}>
            <div className={styles.titleDiv}>
                <span className={styles.title}>{capitalize(t("scenario.castaways.name"))}</span>
            </div>
            <Rounds current={currentRound || 1}/>
            <Description/>
            <div className={styles.eventEffects}>
                <div className={styles.eventEffect + " " + styles.bookEffect}>
                    <ResizableImage
                        src={bookEffectImg}
                        fill
                        alt={"tokeny"}
                        sizes={styles.eventEffect}
                    />
                </div>
                <div className={styles.eventEffect}>
                    <ResizableImage
                        src={totemEffectImg}
                        fill
                        alt={"tokeny"}
                        sizes={styles.eventEffect}
                    />
                </div>
            </div>
            <WoodPile/>
            <div className={styles.bottomHalf}>
                <div className={styles.tokens}>
                    <ResizableImage
                        src={scenarioTokensImg}
                        fill
                        alt={"tokeny"}
                        sizes={styles.tokens}
                    />
                </div>
                <div className={styles.inventions} ref={inventionContRef}>
                    {scenarioInventions.map((inv, i) => {
                        return (
                            <Card
                                key={inv.name}
                                card={inv}
                                column={i}
                                row={0}
                                top={0}
                                zIndexIncreased={props.zIndex.includes(inv.name)}
                                height={cardHeight}
                                width={cardWidth}
                                totalWidth={inventionContWidth}
                                enlargeParams={{
                                    top: -cardHeight / 2,
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
