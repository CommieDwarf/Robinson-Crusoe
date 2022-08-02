import { Threat } from "./Threat/Threat";
import { Player } from "./Players/Players";
import ActionSlots from "./ActionSlots/ActionSlots";
import Tiles from "./Tiles/Tiles";
import AllResources from "./AllResources/AllResources";
import Structures from "./Structures/Structures";
import Inventions from "./Inventions/Inventions";
import Equipment from "./Equipment/Equipment";
import Activity from "./AdditionalActivity/AdditionalActivity";
import Beasts from "./Beasts/Beasts";
import { SideCharacter } from "./Characters/SideCharacter";
import { PlayerCharacter } from "./Characters/PlayerCharacter";
import { IPlayer } from "../../interfaces/Player";

const player = new Player("Konrad", "orange", 0);
const friday = new SideCharacter("friday", 0, 4);
const dog = new SideCharacter("dog", 1, Infinity);
const cook = new PlayerCharacter("cook", 2, 13, "male", [2, 1, 3, 7], player);
player.setCharacter(cook);

// player.setCharacter()

type ScenarioName = "castaways";

export class Game {
  constructor(players: IPlayer[], scenarioName: ScenarioName) {
    players.forEach((player) => {});
  }

  players: IPlayer[] = [player];
  tiles = new Tiles();
  allResources = new AllResources();
  structures = new Structures();
  inventions = new Inventions("castaways", [cook]);
  threat = new Threat(this);
  equipment = new Equipment(this);
  player: Player = player;
  sideCharacters = { dog, friday };
  actionSlots = new ActionSlots(this.structures, this.inventions, this.tiles);
  rest = new Activity("rest");
  arrangeCamp = new Activity("arrangeCamp");
  beasts = new Beasts(this, this.allResources.owned);
  allPawns = [...cook.pawns.pawns, ...friday.pawns.pawns, ...dog.pawns.pawns];
}

export default new Game();
