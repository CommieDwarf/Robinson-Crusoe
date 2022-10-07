import {IActionService} from "../../../interfaces/ActionService/IActionService";
import {IGame} from "../../../interfaces/Game";
import {Action} from "./Action";
import {ACTION_TYPE} from "../../../interfaces/ActionService/Action";
import {ICharacter} from "../../../interfaces/Characters/Character";
import {IActionSlotsService} from "../../../interfaces/ActionSlots";
import {inventionList} from "../../constants/inventionList";
import {StructureName} from "../../../interfaces/Structures/Structures";
import {InventionName} from "../../../interfaces/Inventions/Inventions";

export class ActionService implements IActionService {
    build = new Action(ACTION_TYPE.build);
    explore = new Action(ACTION_TYPE.explore);
    gather = new Action(ACTION_TYPE.gather);
    hunt = new Action(ACTION_TYPE.hunt);
    threat = new Action(ACTION_TYPE.threat);
    _game: IGame;

    constructor(game: IGame) {
        this._game = game;
    }

    resolveActions(): void {
        const actionSlotsService = this._game.actionSlotsService;
        this.resolveThreat(actionSlotsService);
        this.resolveHunt(actionSlotsService);
        this.resolveBuild(actionSlotsService);
    }

    private resolveThreat(actionSlotsService: IActionSlotsService) {
        // TODO implement 2 pawns option.
        const characterLeft1 =
            actionSlotsService.getPawn("threat-left-1")?.character;
        const characterRight1 =
            actionSlotsService.getPawn("threat-left-2")?.character;
        if (characterLeft1) {
            this._game.threat.leftSlot?.effects.fullFill(characterLeft1);
        }
        if (characterRight1) {
            this._game.threat.rightSlot?.effects.fullFill(characterRight1);
        }
    }

    private resolveHunt(actionSlotsService: IActionSlotsService) {
        const leader = actionSlotsService.getPawn("hunt-leader")?.character;
        const helper = actionSlotsService.getPawn("hunt-helper")?.character;

        if (leader && helper) {
            this._game.beasts.fightBeast(leader, helper);
        } else if (leader || helper) {
            throw new Error("There must be 2 pawns assigned to fight a beast");
        }
    }

    private resolveBuild(actionSlotsService: IActionSlotsService) {
        // TODO: implement roll dice and reRoll
        actionSlotsService.slots.forEach((value, key) => {
            const array = key.split("-");
            if (key.includes("structure")) {
                const structName = array[1] as StructureName;
                this._game.structuresService.lvlUpStruct(structName, 1);
            } else if (key.includes("invention")) {
                const inventionName = array[1] as InventionName;
                const invention =
                    this._game.inventionsService.getInvention(inventionName);
                invention.isBuilt = true;
            }
        });
    }

    // private resolveGather(actionSlotsService: IActionSlotsService) {
    //   actionSlotsService.slots.forEach(([value, key] => {
    //
    //     }))
    // }
}

// this._structuresService.structures.forEach((structure) => {
//     actionSlots.set("structure-" + structure.name + "-leader", null);
//     actionSlots.set("structure-" + structure.name + "-helper-1", null);
//     actionSlots.set("structure-" + structure.name + "-helper-2", null);
// });
//
// inventionList.forEach((invention) => {
//     actionSlots.set("invention-" + invention + "-leader", null);
//     actionSlots.set("invention-" + invention + "-helper-1", null);
//     actionSlots.set("invention-" + invention + "-helper-2", null);
// });
//
// this._tiles.tiles.forEach((tile) => {
//     actionSlots.set(`tile-${tile.id}-gather-left-leader`, null);
//     actionSlots.set(`tile-${tile.id}-gather-right-helper-1`, null);
//     actionSlots.set(`tile-${tile.id}-gather-left-helper-1`, null);
//     actionSlots.set(`tile-${tile.id}-gather-right-leader`, null);
//     actionSlots.set(`tile-${tile.id}-gather-right-helper-2`, null);
//     actionSlots.set(`tile-${tile.id}-gather-left-helper-2`, null);
//     actionSlots.set(`tile-${tile.id}-explore-leader`, null);
//     actionSlots.set(`tile-${tile.id}-explore-helper-1`, null);
//     actionSlots.set(`tile-${tile.id}-explore-helper-2`, null);
// });
//
// for (let i = 1; i < 10; i++) {
//     actionSlots.set("rest-" + i, null);
//     actionSlots.set("arrangeCamp-" + i, null);
// }
//
// actionSlots.set("threat-left-1", null);
// actionSlots.set("threat-left-2", null);
// actionSlots.set("threat-right-1", null);
// actionSlots.set("threat-right-2", null);
//
// actionSlots.set("hunt-leader", null);
// actionSlots.set("hunt-helper", null);
