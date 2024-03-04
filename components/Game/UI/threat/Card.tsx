import React, {useEffect, useRef, useState} from "react";
import styles from "./Threat.module.css";
import {IEventCardRenderData} from "../../../../interfaces/EventService/EventCard";
import {formatToKebabCase} from "../../../../utils/formatToKebabCase";
import ResizableImage from "../../../ResizableImage/ResizableImage";
import {Side} from "../../../../interfaces/TileService/TileResourceService";

interface Props {
    card: IEventCardRenderData | null;
    slot?: Side;
}

export default function Card(props: Props) {
    const [enlarged, setEnlarged] = useState(false);
    const cardContainerRef = useRef<HTMLDivElement>(null);

    function handleClick() {
        if (!props.card) {
            return;
        }
        setEnlarged((prev) => !prev);
    }

    useEffect(() => {
        if (props.slot === "right") {
            setEnlarged(true);
        }
    }, [props.card, props.slot])


    const enlargedClass = enlarged && props.card ? styles.cardEnlarged : "";

    const zIndexClass = enlarged
        ? styles.zIndexIncreased
        : styles.zIndexTransition;


    return (
        <div
            className={`${styles.cardSlot} ${enlargedClass} ${zIndexClass}`}
            onClick={handleClick}
        >
            {props.card && (
                <div className={styles.card} ref={cardContainerRef}>
                    {/*<ResizableImage*/}
                    {/*    src={`/UI/cards/event/${getImgName(props.card.name)}.png`}*/}
                    {/*    fill*/}
                    {/*    alt={props.card.name}*/}
                    {/*    sizes={"50vw"}*/}
                    {/*/>*/}
                    <ResizableImage src={`/UI/cards/event/${formatToKebabCase(props.card.name)}.png`}
                                    alt={props.card.name}
                                    scale={4}
                    />
                </div>
            )}
        </div>
    );
}
