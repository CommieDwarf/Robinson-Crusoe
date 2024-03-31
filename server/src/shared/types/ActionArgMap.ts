import {
    ACTION_CONTROLLER_ACTION,
    CHARACTER_CONTROLLER_ACTION,
    MYSTERY_CONTROLLER_ACTION,
    OTHER_CONTROLLER_ACTION, TILE_CONTROLLER_ACTION
} from "@shared/types/CONTROLLER_ACTION";
import {Side} from "@shared/types/Game/TileService/TileResourceService";
import {ITEM} from "@shared/types/Game/Equipment/Item";
import {CONSTRUCTION} from "@shared/types/Game/ConstructionService/Construction";
import {INVENTION} from "@shared/types/Game/InventionService/Invention";
import {ABILITY} from "@shared/types/Game/Skill/ABILITY";
import {AbilityArgMap} from "@shared/types/Game/Skill/AbilityArgMap";


type Id = string;
type ActionId = string;
type Option = 1 | 2;

export type SetNextActionArgs = []

export type RollActionDicesArgs = [Id]

export type ResolveActionArgs = [ActionId]

export type ResolveAdventureArgs = [Option]

export type ReRollActionDiceArgs = [resolvableItemID: string];

export type SetPawnArgs = [destinationId: string, draggableId: string];

export type UnsetPawnArgs = [destinationId: string, draggableId: string];

export type RemoveHealthThresholdArgs = [num: number];

export type UseAbilityArgs<T extends ABILITY> = [
    {
        abilityName: T,
        args: AbilityArgMap[T]
    }
];

export type ResolveEventMysteryArgs = [];

export type TriggerMysteryDrawEffectArgs = [];

export type UseTreasureCardArgs = [cardName: string];

export type DrawMysteryCardArgs = [];

export type FinishDrawingMysteryCardsArgs = [];

export type ManageCardStorageArgs = [cardName: string, action: "withdraw" | "deposit"];

export type TriggerTileActionArgs = [tileId: number];

export type TriggerTileResourceActionArgs = [tileID: number, side: Side];

export type MoveCampArgs = [tileID: number];

export type AddWoodToPileArgs = [];

export type ResolveEventAdventureArgs = [option: 1 | 2];

export type RollWeatherDicesArgs = [];

export type SetNextPhaseArgs = [];

export type SwitchCommittedResourcesTypeArgs = [construction: CONSTRUCTION];

export type UseInventionArgs = [inventionName: INVENTION];

export type UseItemArgs = [item: ITEM];

export type UseDiscoveryTokenArgs = [tokenId: string, targetCharName: string];

export type SetBibleUsageArgs = [actionId: string, value: boolean];

export type PickObjectArgs = [objectPickerId: string, objectIds: string[], secondaryEffect: boolean]


export interface ActionArgMap {
    [ACTION_CONTROLLER_ACTION.SET_BIBLE_USAGE]: SetBibleUsageArgs;
    [ACTION_CONTROLLER_ACTION.SET_NEXT_ACTION]: SetNextActionArgs;
    [ACTION_CONTROLLER_ACTION.ROLL_ACTION_DICES]: RollActionDicesArgs;
    [ACTION_CONTROLLER_ACTION.RESOLVE_ACTION]: ResolveActionArgs;
    [ACTION_CONTROLLER_ACTION.RESOLVE_ADVENTURE]: ResolveAdventureArgs;
    [ACTION_CONTROLLER_ACTION.REROLL_ACTION_DICE]: ReRollActionDiceArgs;


    [CHARACTER_CONTROLLER_ACTION.SET_PAWN]: SetPawnArgs;
    [CHARACTER_CONTROLLER_ACTION.UNSET_PAWN]: UnsetPawnArgs;
    [CHARACTER_CONTROLLER_ACTION.REMOVE_HEALTH_THRESHOLD]: RemoveHealthThresholdArgs;
    [CHARACTER_CONTROLLER_ACTION.USE_ABILITY]: UseAbilityArgs<ABILITY>;


    [MYSTERY_CONTROLLER_ACTION.RESOLVE_EVENT_MYSTERY]: ResolveEventMysteryArgs;
    [MYSTERY_CONTROLLER_ACTION.TRIGGER_MYSTERY_DRAW_EFFECT]: TriggerMysteryDrawEffectArgs;
    [MYSTERY_CONTROLLER_ACTION.USE_TREASURE_CARD]: UseTreasureCardArgs;
    [MYSTERY_CONTROLLER_ACTION.DRAW_MYSTERY_CARD]: DrawMysteryCardArgs;
    [MYSTERY_CONTROLLER_ACTION.FINISH_DRAWING_MYSTERY_CARDS]: FinishDrawingMysteryCardsArgs;
    [MYSTERY_CONTROLLER_ACTION.MANAGE_CARD_STORAGE]: ManageCardStorageArgs;


    [TILE_CONTROLLER_ACTION.TRIGGER_TILE_ACTION]: TriggerTileActionArgs;
    [TILE_CONTROLLER_ACTION.TRIGGER_TILE_RESOURCE_ACTION]: TriggerTileResourceActionArgs;
    [TILE_CONTROLLER_ACTION.MOVE_CAMP]: MoveCampArgs;


    [OTHER_CONTROLLER_ACTION.ADD_WOOD_TO_PILE]: AddWoodToPileArgs;
    [OTHER_CONTROLLER_ACTION.ROLL_WEATHER_DICES]: RollWeatherDicesArgs;
    [OTHER_CONTROLLER_ACTION.SET_NEXT_PHASE]: SetNextPhaseArgs;
    [OTHER_CONTROLLER_ACTION.SWITCH_COMMITTED_RESOURCES_TYPE]: SwitchCommittedResourcesTypeArgs;
    [OTHER_CONTROLLER_ACTION.USE_INVENTION]: UseInventionArgs;
    [OTHER_CONTROLLER_ACTION.USE_ITEM]: UseItemArgs;
    [OTHER_CONTROLLER_ACTION.USE_DISCOVERY_TOKEN]: UseDiscoveryTokenArgs;
    [OTHER_CONTROLLER_ACTION.RESOLVE_EVENT_ADVENTURE]: ResolveAdventureArgs;
    [OTHER_CONTROLLER_ACTION.PICK_OBJECT]: PickObjectArgs;
}
