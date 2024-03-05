// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {gameService} from "../../../server/server/gameService";

export default function getGameRenderData() {
    return JSON.stringify(gameService.renderData);
}
