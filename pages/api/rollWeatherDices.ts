import { game } from "../../server/game";

export default function rollWeatherDices() {
  game.weatherService.rollDices();
}
