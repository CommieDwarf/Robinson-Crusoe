import Image from "next/image";
import React, {useRef, useState} from "react";
import styles from "./Threat.module.css";
import {IEventCardRenderData} from "../../../../interfaces/EventService/EventCard";
import {formatToKebabCase} from "../../../../utils/formatToKebabCase";
import {ReactRef} from "@nextui-org/react/types/utils/refs";
import ResizableImage from "../../../ResizableImage/ResizableImage";

interface Props {
    card: IEventCardRenderData | null;
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
