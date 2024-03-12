// @flow
import * as React from "react";
import cardResolveStyles from "../CardResolve.module.css";
import {ZoomButton} from "../ZoomButton/ZoomButton";
import ResizableImage from "../../../../ResizableImage/ResizableImage";
import {IMysteryCardRenderData} from "@shared/types/Game/MysteryService/MysteryCard";
import {kebabCase} from "lodash";

type Props = {
    card: IMysteryCardRenderData | null,
};

export const MysteryCardResolve = (props: Props) => {


    const cardImgSrc = props.card
        ? `/UI/cards/mystery/${props.card.type}/${kebabCase(
            props.card.name
        )}.png`
        : `/UI/cards/reverse/mystery.png`;

    return (
        <>
            <ResizableImage
                src={cardImgSrc}
                alt={"karta tajemnic"}
                fill
                sizes={cardResolveStyles.card}
            />
        </>
    );
};
