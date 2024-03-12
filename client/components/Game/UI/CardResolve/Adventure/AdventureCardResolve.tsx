// @flow
import * as React from "react";
import ResizableImage from "../../../../ResizableImage/ResizableImage";
import {IAdventureCardRenderData} from "@shared/types/Game/AdventureService/AdventureCard";
import {kebabCase} from "lodash";

type Props = {
    card: IAdventureCardRenderData;

};
export const AdventureCardResolve = (props: Props) => {


    let imageUrl = `/UI/cards/adventure/${props.card.action}/${kebabCase(props.card.name)}.png`

    return (
        <>
            <ResizableImage
                src={imageUrl}
                alt={"wydarzenie"}
                // unselectable={"on"}
                // draggable={"false"}
            />
        </>
    );
};
