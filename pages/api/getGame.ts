// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { game } from "../../server/game";

export default function getGameData() {
  return JSON.stringify(game.renderData);
}
