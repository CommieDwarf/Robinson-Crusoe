// @flow
import * as React from "react";
import ResizableImage from "../../../../ResizableImage/ResizableImage";
import {IAdventureCardRenderData} from "@shared/types/Game/AdventureService/AdventureCard";
import {kebabCase} from "lodash";
import {PLAYER_COLOR} from "@shared/types/Game/PLAYER_COLOR";

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
            />
        </>
    );
};
