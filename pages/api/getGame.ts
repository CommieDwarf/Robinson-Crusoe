// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {game} from "../../server/game";

export default function getGameRenderData() {
    return JSON.stringify(game.renderData);
}
