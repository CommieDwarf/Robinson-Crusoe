import { TrapMysteryCard } from "./TrapMysteryCard/TrapMysteryCard";
import { IMysteryCard } from "../../../../../../interfaces/MysteryService/MysteryCard";
import { IGame } from "../../../../../../interfaces/Game";
import { IPlayerCharacter } from "../../../../../../interfaces/Characters/PlayerCharacter";

export class UnfortunateAdventure
  extends TrapMysteryCard
  implements IMysteryCard
{
  constructor(game: IGame) {
    super(game, "unfortunate adventure", "nieszczęśliwa przygoda");
  }

  triggerDrawEffect(drawer: IPlayerCharacter) {
    //TODO: implement book effect.
  }
}
