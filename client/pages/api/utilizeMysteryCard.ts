import {gameService} from "../../../server/server/gameService";

export default function utilizeMysteryCard(cardName: string) {
    gameService.game.mysteryService.useCard("cook", cardName)
}
