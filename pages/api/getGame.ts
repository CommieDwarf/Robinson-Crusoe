// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { game } from "../../server/game";

import { parse, stringify, toJSON, fromJSON } from "flatted";

import {
  GameData,
  InventionData,
  StructureData,
} from "../../interfaces/GameData/GameData";
import { IResourcesAmount } from "../../interfaces/Resources/Resources";
import Entries from "../../interfaces/Entries";

export default function getGameData() {
  const gameInfo: GameData = {
    players: game.players,
    localPlayer: game.localPlayer,
    characters: game.allCharacters.characters,
    tiles: game.tilesService.tiles,
    allResources: {
      future: Object.fromEntries(
        game.allResources.future.amount.entries() as unknown as Entries<IResourcesAmount>
      ) as unknown as IResourcesAmount,
      owned: Object.fromEntries(
        game.allResources.owned.amount.entries() as unknown as Entries<IResourcesAmount>
      ) as unknown as IResourcesAmount,
    },
    structures: game.structuresService.structures.map((structure) => {
      return {
        name: structure.name,
        lvl: structure.lvl,
        requiredHelperAmount: structure.requiredHelpersAmount,
        committedResources: Object.fromEntries(
          structure.committedResources.amount.entries()
        ),
      };
    }) as unknown as StructureData[],
    inventions: game.inventionsService.inventions.map((invention) => {
      return {
        name: invention.name,
        committedResources: Object.fromEntries(
          invention.committedResources.amount.entries()
        ),
        requiredHelperAmount: invention.requiredHelpersAmount,
        locked: invention.locked,
        built: invention.isBuilt,
        type: invention.type,
      };
    }) as unknown as InventionData[],
    threat: game.threat,
    equipment: game.equipment.items.map((item) => {
      return {
        name: item.name,
        uses: item.uses,
      };
    }),
    actionSlots: Object.fromEntries(game.actionSlotsService.slots.entries()),
    restPawnAmount: game.rest.pawnAmount,
    arrangeCampPawnAmount: game.arrangeCamp.pawnAmount,
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
