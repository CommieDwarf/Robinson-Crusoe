import {Player} from "../server/Classes/Players/Players";
import ActionSlots from "../server/Classes/ActionSlots/ActionSlots";
import Activity from "../server/Classes/AdditionalActivity/AdditionalActivity";
import Beasts from "../server/Classes/Beasts/Beasts";
import ITile from "./Tile";
import {IAllResources} from "./Resources";
import {IStructure} from "./Structure";
import {IInvention} from "./Invention";

export interface IGame {
    players: Player[],
    tiles : ITile[],
    allResources: IAllResources,
    structures: IStructure[],
    inventions: IInvention[],
    threat: Threat
    equipment = new Equipment(this);
    player: Player = player;
    sideCharacters = { dog: characters.dog, friday: characters.friday };
actionSlots = new ActionSlots(this.structures, this.inventions, this.tiles);
rest = new Activity("rest");
arrangeCamp = new Activity("arrangeCamp");
beasts = new Beasts();
allPawns = this.player.character.pawns
    .concat(this.sideCharacters.dog.pawns)
    .concat(this.sideCharacters.friday.pawns);
}