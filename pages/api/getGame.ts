// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { game } from "../../server/game";

import { parse, stringify, toJSON, fromJSON } from "flatted";
import { IPlayer } from "../../interfaces/Player";
import {
  CHAR_NAME_TRANSLATION,
  CharacterName,
  ICharacter,
} from "../../interfaces/Characters/Character";
import ITile from "../../interfaces/Tiles/Tile";
import { IResourcesAmount } from "../../interfaces/Resources/Resources";
import { STRUCTURE } from "../../interfaces/Structures/Structure";
import { IThreat } from "../../interfaces/Threat/Threat";
import { EqList } from "../../server/constants/eqList";

export default function getGameData() {
  const gameInfo: GameInfo = {
    players: game.players,
    localPlayer: game.localPlayer,
    characters: game.allCharacters.characters,
    tiles: game.tilesService.tiles,
    allResources: {
      // @ts-ignore
      future: Object.fromEntries(game.allResources.future.amount.entries()),
      // @ts-ignore
      owned: Object.fromEntries(game.allResources.owned.amount.entries()),
    },
    // @ts-ignore
    structures: game.structuresService.structures.map((structure) => {
      return {
        name: structure.name,
        lvl: structure.lvl,
        requiredHelperAmount: structure.requiredHelpersAmount,
        committedResources: Object.fromEntries(
          structure.committedResources.amount.entries()
        ),
      };
    }),
    // @ts-ignore
    inventions: game.inventionsService.inventions.map((invention) => {
      return {
        name: invention.name,
        committedResources: Object.fromEntries(
          invention.committedResources.amount.entries()
        ),
        requiredHelperAmount: invention.requiredHelpersAmount,
        locked: invention.locked,
        built: invention.isBuilt,
      };
    }),
    threat: game.threat,
    equipment: game.equipment.items.map((item) => {
      return {
        name: item.name,
        uses: item.uses,
      };
    }),
    actionSlots: Object.fromEntries(game.actionSlotsService.slots.entries()),
    restPawnAmount: game.rest.pawnAmount,
    arrangeCampPawnCount: game.arrangeCamp.pawnAmount,
    beastCount: game.beasts.deckCount,
    allPawns: game.allPawns.map((pawn) => {
      return {
        draggableId: pawn.draggableId,
        characterName: pawn.character.name,
        characterNamePL: pawn.character.namePL,
      };
    }),
  };

  return toJSON(gameInfo);
}
