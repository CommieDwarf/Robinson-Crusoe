import {ITile, ITileRenderData} from "../../interfaces/TileService/ITile";
import {IInventionRenderData} from "../../interfaces/InventionService/Invention";
import {IConstructionRenderData} from "../../interfaces/ConstructionService/Construction";
import {ACTION} from "../../interfaces/ACTION";
import {IBeastRenderData} from "../../interfaces/Beasts/Beast";
import {IEventCardRenderData} from "../../interfaces/EventService/EventCard";

export const isTile = (
    candidate: any
): candidate is ITile => {
    return (
        candidate instanceof Object && "hasBasicResource" in candidate
    );
};


// export class ActionItemGuard {
//     static isInvention = (
//         candidate: any
//     ): candidate is IInventionRenderData => {
//         return candidate instanceof Object && candidate.type === ACTION.INVENTION;
//     }
//
//     static isConstruction(candidate: any): candidate is IConstructionRenderData {
//         return candidate instanceof Object && candidate.type === ACTION.CONSTRUCTION;
//     }
//
//     static isTile(candidate: any): candidate is ITileRenderData {
//         return candidate instanceof Object && candidate.type === ACTION.GATHER || candidate.type === ACTION.EXPLORE;
//     }
//
//     static isBeast(candidate: any): candidate is IBeastRenderData {
//         return candidate instanceof Object && candidate.type === ACTION.HUNT
//     }
//
//     static isEventCard(candidate: any): candidate is IEventCardRenderData {
//         return candidate instanceof Object && candidate.type === ACTION.THREAT
//     }
//
//     // static isRest(candidate: any): candidate is
// }
//
//
