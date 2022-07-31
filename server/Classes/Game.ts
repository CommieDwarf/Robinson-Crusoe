import { Threat } from "./Threat/Threat";
import player, { Player } from "./Players/Players";
import ActionSlots from "./ActionSlots/ActionSlots";
import Tiles from "./Tiles/Tiles";
import AllResources from "./AllResources/AllResources";
import Structures from "./Structures/Structures";
import Inventions from "./Inventions/Inventions";
import Equipment from "./Equipment/Equipment";
import Activity from "./AdditionalActivity/AdditionalActivity";
import Beasts from "./Beasts/Beasts";

export class Game {
  players: Player[] = [player];
  tiles = new Tiles();
  allResources = new AllResources();
  structures = new Structures();
  inventions = new Inventions("castaways", this.players);
  threat = new Threat(this);
  equipment = new Equipment(this);
  player: Player = player;
  sideCharacters = { dog:  };
  actionSlots = new ActionSlots(this.structures, this.inventions, this.tiles);
  rest = new Activity("rest");
  arrangeCamp = new Activity("arrangeCamp");
  beasts = new Beasts();
  allPawns = this.player.character.pawns
    .concat(this.sideCharacters.dog.pawns)
    .concat(this.sideCharacters.friday.pawns);
}

export default new Game();
