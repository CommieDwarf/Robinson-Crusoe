import {IPawnOwner} from "../interfaces/Pawns/Pawn";

export function getOwnedDroppableId(owner: string, type: "invention" | "mystery" | "character") {
    return `owner-${owner}-${type}`;
}
