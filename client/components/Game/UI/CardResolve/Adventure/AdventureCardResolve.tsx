// @flow
import * as React from "react";
import DynamicImage from "../../../../DynamicImage/DynamicImage";
import {IAdventureCardRenderData} from "@shared/types/Game/AdventureService/AdventureCard";
import {kebabCase} from "lodash";

type Props = {
    card: IAdventureCardRenderData;
};
export const AdventureCardResolve = (props: Props) => {


    const imageUrl = `/UI/cards/adventure/${props.card.action}/${kebabCase(props.card.name)}.webp`

    return (
        <>
            <DynamicImage
                src={imageUrl}
                alt={"wydarzenie"}
            />
        </>
    );
};
