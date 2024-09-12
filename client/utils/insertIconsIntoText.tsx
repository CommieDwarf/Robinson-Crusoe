import ResizableImage from "../components/ResizableImage/ResizableImage";
import Pawn from "../components/Game/UI/Pawn";
import {IPawnRenderData, PAWN_HELPER_ACTION} from "@shared/types/Game/Pawns/Pawn";
import {StaticPawnHelper} from "../components/Game/UI/StaticPawnHelper";

const icons = [
    "determination",
    "heart",
    "reroll",
    "rain-cloud",
    "snow-cloud",
    "food",
    "discovery",
    "wood",
    "weapon",
    "palisade",
    "star",
    "morale-arrow",
    "compass",
];


export function insertIconsIntoText(string: string, elementClassName: string) {
    const array = string.split("$");


    return array.map((str, i) => {
        if (icons.includes(str.toLowerCase())) {
            return (
                <div key={i} className={elementClassName}>
                    <ResizableImage
                        src={`/UI/icons/${str.toLowerCase()}.png`}
                        alt={str}
                    />
                </div>
            );
        } else if (Object.values(PAWN_HELPER_ACTION).includes(str as PAWN_HELPER_ACTION)) {
            return (
                <div key={i} className={elementClassName}>
                    <StaticPawnHelper action={str as PAWN_HELPER_ACTION}/>
                </div>
            )
        } else {
            return <span key={i}>{str}</span>;
        }
    });
}
