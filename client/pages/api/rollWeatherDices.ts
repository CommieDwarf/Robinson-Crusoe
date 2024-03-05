import {gameService} from "../../../server/server/gameService";

export default function rollWeatherDices() {
    gameService.game.weatherService.rollDices();
}
