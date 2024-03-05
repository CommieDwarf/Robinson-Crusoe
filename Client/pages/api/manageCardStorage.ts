// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {StorageAction} from "../../../interfaces/MysteryService/StorageCard";
import {gameService} from "../../../Server/server/gameService";

export default function manageCardStorage(cardName: string, cardType: "mystery", action: StorageAction) {
    if (action === "withdraw") {
        gameService.game.mysteryService.withdrawResource(cardName);
    } else {
        gameService.game.mysteryService.depositResource(cardName);
    }
}
