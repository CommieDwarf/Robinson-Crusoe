import {
	IChatMessage,
	IChatMessageRenderData,
	SystemMessageRenderData,
} from "@shared/types/ChatService/ChatService";

export function isSystemMsg(
	candidate: IChatMessageRenderData | IChatMessage
): candidate is SystemMessageRenderData {
	return candidate.author === "system";
}
