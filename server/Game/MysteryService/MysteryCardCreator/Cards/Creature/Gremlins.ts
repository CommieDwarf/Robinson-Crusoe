import { CreatureMysteryCard } from "./CreatureMysteryCard/CreatureMysteryCard";
import { IMysteryCard } from "../../../../../../interfaces/MysteryService/MysteryCard";
import { IGame } from "../../../../../../interfaces/Game";
import { IPlayerCharacter } from "../../../../../../interfaces/Characters/Character";
import { BeastStats } from "../../../../BeastService/BeastCreator/BeastCreator";
import { BasicResources } from "../../../../ResourceService/BasicResources";

export class Gremlins extends CreatureMysteryCard implements IMysteryCard {
  constructor(game: IGame) {
    super(game, "gremlins", "gremliny", true, "gremliny was wytropiły", "walcz", "walcz");
  }
  private _beastStats: BeastStats = {
    name: "gremlins",
    namePL: "gremliny",
    strenght: 0,
    weaponLoss: 0,
    reward: new BasicResources(),
  }

  triggerDrawEffect(drawer: IPlayerCharacter) {
    //TODO: implement custom beast fight;
    
    this._game.beastService.fightCustomBeast(drawer, this._beastStats);
    this.shuffleIntoEventDeck();
    this._drawResolved = true;
  }

  triggerEventEffect() {
    this._beastStats.strenght = 3;
    this._game.beastService.fightCustomBeast(this._game.playerService.primePlayer.getCharacter(), this._beastStats);
    this.shuffleIntoEventDeck();
  }
}
