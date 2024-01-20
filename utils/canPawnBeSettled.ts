import {
    IPawnHelperRenderData,
    IPawnRenderData,
} from "../interfaces/Pawns/Pawn";

export function canPawnBeSettled(
    pawn: null | IPawnRenderData | IPawnHelperRenderData,
    destinationId: string
): boolean {
    if (!pawn) {
        return true;
    }

    if (destinationId.includes(pawn.character.name)) {
        return true;
    }

    if (destinationId.includes(pawn.draggableId)) {
        return true;
    } else if (!("cardName" in pawn) && destinationId.includes("slot")) {
        return false;
    } else if (
        ("cardName in pawn" && destinationId.includes("freepawns")) ||
        destinationId.includes("dog") ||
        destinationId.includes("friday")
    ) {
        return false;
    }

    if ("action" in pawn) {
        if (destinationId.includes("freepawns")) {
            return true;
        } else if (destinationId.includes("leader")) {
            return false;
        }
        switch (pawn.action) {
            case "build":
                return (
                    destinationId.includes("invention") ||
                    destinationId.includes("construction")
                );
            case "explore":
                return destinationId.includes("explore");
            case "gather":
                return destinationId.includes("gather");
        }
    }

    if (pawn.draggableId.includes("dog")) {
        if (destinationId.includes("leader")) {
            return false;
        }
        if (destinationId.includes("hunt") || destinationId.includes("explore")) {
            return true;
        }
        return destinationId.includes("freepawns-dog");
    } else if (pawn.draggableId === "friday") {
        return !(
            destinationId.includes("freepawns") &&
            !destinationId.includes("freepawns-friday")
        );
    } else {
        return !(
            destinationId.includes("freepawns") &&
            !destinationId.includes(pawn.character.name)
        );
    }
}
