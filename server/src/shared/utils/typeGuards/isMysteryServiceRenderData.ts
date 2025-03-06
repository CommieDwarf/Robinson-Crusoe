import { IMysteryServiceRenderData } from "@shared/types/Game/MysteryService/MysteryService";

export function isMysteryServiceRenderData(
	candidate: Object
): candidate is IMysteryServiceRenderData {
	return "isDrawingOn" in candidate;
}
