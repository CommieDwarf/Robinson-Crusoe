import {gameService} from "../../../Server/server/gameService";

export default function rollWeatherDices() {
    gameService.game.weatherService.rollDices();
}
