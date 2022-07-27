import tiles, { Tile } from "./Tiles";
import allResources from "./AllResources";
import structures, { Structure } from "./structures";
import inventions, { Invention } from "./inventions";
import threatCards from "./threatCards";
import equipment from "./equipment";
import player from "./Players";
import characters from "./characters";
import actionSlots from "./actionSlots";
import pawns from "./pawns";
import activities from "./additionalActivities";
import beastDeck from "./beast";
import { castawaysInventions } from "./inventions";
import ActionSlots from "./actionSlots";
import Tiles from "./Tiles";
import AllResources from "./AllResources";

const game = {
  tiles,
  allResources,
  structures,
  inventions,
  threatCards,
  equipment,
  player,
  characters,
  actionSlots,
  pawns,
  activities,
  beastDeck,
  castawaysInventions,
};

export default game;
//
//
// export class Game {
//   tiles: Tiles;
//   allResources: AllResources;
//   structures: Structure[];
//   inventions: Invention[];
//   threatCards: {left: null | EventCard, right: EventCard}
//   equipment;
//   player;
//   characters;
//   actionSlots : ActionSlots;
//   pawns,
//   activities,
//   beastDeck,
//   castawaysInventions,
//
//   constructor() {
//     this.tiles = new Tiles();
//     this.actionSlots = new ActionSlots(structures, inventions, castawaysInventions);
//     this.allResources = new AllResources();
//
//   }
// }
