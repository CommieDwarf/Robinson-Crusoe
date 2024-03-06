import {IResourceModifier} from "@shared/types/Game/TileService/ResourceModifier";

export function createResourceModifier(
    resource: "wood" | "food",
    causedBy: string,
    //TODO: if modifier turns out to be unnecessary - remove it.
    modifier: number
): IResourceModifier {
    return {
        resource,
        causedBy,
        modifier,
    };
}
