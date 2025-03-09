// @flow
import * as React from "react";
import cardResolveStyles from "../CardResolve.module.css";
import DynamicImage from "../../../../DynamicImage/DynamicImage";
import {IMysteryCardRenderData} from "@shared/types/Game/MysteryService/MysteryCard";
import {kebabCase} from "lodash";

type Props = {
    card: IMysteryCardRenderData | null,
};

export const MysteryCardResolve = (props: Props) => {


    const cardImgSrc = props.card
        ? `/UI/cards/mystery/${props.card.type}/${kebabCase(
            props.card.name
        )}.webp`
        : `/UI/cards/reverse/mystery.webp`;

    return (
        <>
            <DynamicImage
                src={cardImgSrc}
                alt={"karta tajemnic"}
                fill
                sizes={cardResolveStyles.card}
            />
        </>
    );
};
