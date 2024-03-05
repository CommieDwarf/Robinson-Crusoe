// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {gameService} from "../../../Server/server/gameService";

export default function getActionSlotService() {
    return JSON.stringify(gameService.game.actionSlotRenderData);
}
