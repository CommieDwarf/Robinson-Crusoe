import { gameService } from "../../server/gameService";

export default function rollWeatherDices() {
  gameService.game.weatherService.rollDices();
}
