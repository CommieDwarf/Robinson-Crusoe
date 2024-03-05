// @flow
import * as React from "react";
import {useLayoutEffect, useRef, useState} from "react";
import styles from "./Description.module.css";
import {Button} from "./Button/Button";
import {ScenarioText} from "@sharedTypes/ScenarioService/ScenarioService";
import Entries from "../../../../../../../../server/src/types/Entries";

import yellowPaperImg from "/public/UI/scenarios/paper.png";
import paperScrollLeftImg from "/public/UI/scenarios/paper-scroll-left.png";
import ResizableImage from "../../../../../../ResizableImage/ResizableImage";
import {castaways} from "@sharedConstants/scenarios/castaways";

type Props = {};

export const Description = (props: Props) => {
    const [unrolled, setUnrolled] = useState(false);
    const [currentInfo, setCurrentInfo] = useState([
        "description",
        castaways.text.description,
    ]);

    const containerRef = useRef<HTMLDivElement>(null)
    const [containerWidth, setContainerWidth] = useState(0);

    useLayoutEffect(() => {
        if (containerRef.current) {
            setContainerWidth(containerRef.current.offsetWidth)
        }
    }, [])

    const [selectedButton, setSelectedButton] = useState("");

    function handleButtonClick(info: string[]) {
        setUnrolled((prev) => {
            return !(currentInfo[0] === info[0] && prev);
        });

        setCurrentInfo(info);
        setSelectedButton(info[1]);
    }

    function handleRollClick() {
        setUnrolled((prev) => !prev);
    }

    const buttons: JSX.Element[] = [];

    const textEntries = Object.entries(castaways.text) as Entries<ScenarioText>;

    textEntries.forEach(([key, value], i) => {
        buttons.push(
            <Button
                buttonText={key}
                selected={currentInfo[0] === key && unrolled}
                text={value}
                buttonClick={handleButtonClick}
                key={i}
            />
        );
    });

    const containerExtendedClass = unrolled ? styles["containerExtended"] : "";

    const paperStyle = {
        width: containerWidth * 0.8 + "px"
    }


    return (
        <div className={styles.container} ref={containerRef}>
            <div className={styles.buttons}>{buttons}</div>
            <div className={styles.paperScroll}>
                <div className={styles.leftScroll} onClick={handleRollClick}>
                    <ResizableImage src={paperScrollLeftImg} alt={""} fill sizes={styles.leftScroll}/>
                </div>
                <div className={`${styles.paperWrapper} ${unrolled ? styles.paperWrapperUnrolled : ""}`}>
                    <div className={styles.paper} style={paperStyle}>
                        <div className={styles.text}>
                            {currentInfo[1]}
                        </div>
                        <div className={styles.paperImg}>
                            <ResizableImage src={yellowPaperImg} alt={""} fill sizes={styles.paperImg}/>
                        </div>
                    </div>

                </div>
                <div className={`${styles.rightScroll} ${unrolled ? styles.rightScrollUnrolled : ""}`}
                     onClick={handleRollClick}>
                    <ResizableImage src={paperScrollLeftImg} alt={""} fill/>
                </div>
            </div>
        </div>
    );
};
