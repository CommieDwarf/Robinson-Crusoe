import {
	BuiltTileStructure,
	ITile,
	ITileRenderData,
	MarkedForAction,
	TILE_ACTION,
	TileGatherableResource,
	TileModifiers,
	TilePosition,
	TileResource,
} from "@shared/types/Game/TileService/ITile";
import { IGame } from "@shared/types/Game/Game";
import { CONSTRUCTION } from "@shared/types/Game/ConstructionService/Construction";
import {
	GatherableResourceAmount,
	ITileResourceService,
	Side,
	TILE_RESOURCE_ACTION,
} from "@shared/types/Game/TileService/TileResourceService";
import { TileType } from "@shared/types/Game/TileService/TileResourceInfo";
import { TileResourceService } from "./TileResourceService/TileResourceService";
import { AssignablePawnsItem } from "../../AssignablePawnsItem/AssignablePawnsItem";
import { ACTION, ACTION_ITEM } from "@shared/types/Game/ACTION";
import { ICharacter } from "@shared/types/Game/Characters/Character";
import { LOG_CODE } from "@shared/types/Game/ChatLog/LOG_CODE";
import { INVENTION_PERSONAL } from "@shared/types/Game/InventionService/Invention";
import { isSide } from "@shared/utils/typeGuards/isSide";

export class Tile extends AssignablePawnsItem implements ITile {
	private readonly _position: TilePosition;
	private readonly _id: number;

	private _distance: number | null = null;
	private _show: boolean;
	private _tileResourceService: ITileResourceService | null;
	private _canCampBeSettled = false;
	private _camp: boolean;
	private _modifiers: TileModifiers = {
		greaterDanger: null,
		timeConsumingAction: null,
		terrainDepleted: null,
		flipped: null,
	};

	private _markedForAction: MarkedForAction | null = null;

	builtStructures = {
		roof: 0,
		shelter: 0,
		palisade: 0,
	};

	constructor(
		position: TilePosition,
		id: number,
		camp: boolean,
		tileType: ITileResourceService | null,
		game: IGame
	) {
		super(camp ? ACTION.GATHER : ACTION.EXPLORE, ACTION_ITEM.TILE, game);
		this._position = position;
		this._id = id;
		this._camp = camp;
		this._tileResourceService = tileType;
		this._show = camp;
	}

	get renderData(): ITileRenderData {
		return {
			...super.getAssignablePawnsRenderData(),
			id: this.id,
			show: this.show,
			position: this.position,
			tileResourceService: this.tileResourceService?.renderData || null,
			requiredPawnsSatisfied: {
				left: this.isSideRequiredPawnsSatisfied("left"),
				right: this.isSideRequiredPawnsSatisfied("right"),
			},
			canCampBeSettled: this.canCampBeSettled,
			camp: this.camp,
			modifiers: this._modifiers,
			markedForAction: Boolean(this._markedForAction),
			requiredPawnAmount: this.requiredPawnAmount,
			isExplored: this.isExplored,
			canBeExplored: this.canBeExplored,
			canBeGathered: this.canBeGathered,
		};
	}

	get distance(): number | null {
		return this._distance;
	}

	set distance(value: number | null) {
		this._distance = value;
	}

	get hasShortcut(): boolean {
		return Boolean(
			this._tileResourceService &&
				(this._tileResourceService.resources.left.shortcut ||
					this._tileResourceService?.resources.right.shortcut)
		);
	}

	public isSideRequiredPawnsSatisfied(side: Side): boolean {
		if (this._tileResourceService && this.requiredPawnAmount !== null) {
			return (
				this._tileResourceService.resources[side].assignedPawns >
				this.requiredPawnAmount
			);
		} else {
			return true;
		}
	}

	public isAnySideRequiredPawnsSatisfied() {
		return (
			this.isSideRequiredPawnsSatisfied("left") ||
			this.isSideRequiredPawnsSatisfied("right")
		);
	}

	get requiredPawnAmount(): number | null {
		const basePawnAmount = this.getComputedRequiredPawnAmount();
		if (basePawnAmount === null) {
			return null;
		}
		const mod = this._modifiers.timeConsumingAction;
		let pawnAmount =
			mod && mod.setInRound !== this._game.round
				? basePawnAmount + 1
				: basePawnAmount;
		if (this._distance != null && this._distance >= 0) {
			return pawnAmount + this._distance - 1;
		} else {
			return null;
		}
	}

	get modifiers() {
		return this._modifiers;
	}

	get markedForAction(): MarkedForAction | null {
		return this._markedForAction;
	}

	get camp(): boolean {
		return this._camp;
	}

	set camp(value: boolean) {
		this._camp = value;
	}

	get canCampBeSettled(): boolean {
		return (
			this._canCampBeSettled &&
			this._game.phaseService.phase === "night" &&
			!this._modifiers.flipped
		);
	}

	set canCampBeSettled(value: boolean) {
		this._canCampBeSettled = value;
	}

	get position(): TilePosition {
		return this._position;
	}

	get id(): number {
		return this._id;
	}

	get show(): boolean {
		return this._show;
	}

	set show(value: boolean) {
		this._show = value;
	}

	get tileResourceService(): ITileResourceService | null {
		return this._tileResourceService;
	}

	get isExplored() {
		return Boolean(this._tileResourceService);
	}

	get canBeExplored() {
		return !this.isExplored && !this._modifiers.flipped;
	}

	get canBeGathered(): boolean {
		return (["left", "right"] as Side[]).some((side) =>
			Boolean(this._tileResourceService?.canResourceBeGathered(side))
		);
	}

	public setShortcut(side: Side, value: boolean) {
		if (!this._tileResourceService) {
			return;
		}
		this._tileResourceService.setShortcut(side, value);
	}

	public resetResourceAssignedPawns() {
		if (this._tileResourceService) {
			this._tileResourceService.resources.left.assignedPawns = 0;
			this._tileResourceService.resources.right.assignedPawns = 0;
		}
	}

	public triggerAction() {
		this._markedForAction?.trigger.call(this);
		this._markedForAction = null;
		this._game.tileService.updateExploredTerrainTypes();
	}

	public isMarkedForAction(): boolean {
		if (this._tileResourceService) {
			return (
				Boolean(this.markedForAction) ||
				this._tileResourceService.isMarkedForAction()
			);
		}
		return Boolean(this.markedForAction);
	}

	public hasBasicResource(resource: "wood" | "food") {
		return this._tileResourceService?.hasBasicResource(resource) || false;
	}

	public getGatherableResourceAmount(
		side: "left" | "right"
	): GatherableResourceAmount | null {
		return (
			this._tileResourceService?.getModifiedBasicResourceAmount(side) ||
			null
		);
	}

	public canResourceBeDepleted(side: "left" | "right") {
		return this._tileResourceService?.canBeDepleted(side) || false;
	}

	public getSideByResource(resource: TileResource): Side | null {
		return this._tileResourceService?.getSideByResource(resource) || null;
	}

	public depleteResource(side: "left" | "right", source: string) {
		this._tileResourceService?.deplete(side, source);
	}

	public unDepleteResource(side: "left" | "right") {
		if (this.tileResourceService) {
			this.tileResourceService.resources[side].depleted = false;
		}
	}

	public markResourceForAction(
		arg: Side | TileResource,
		actionName: TILE_RESOURCE_ACTION,
		source: string
	) {
		if (!this.tileResourceService) {
			throw new Error(`tile is not revealed. id: ${this.id}`);
		}
		const side = isSide(arg) ? arg : this.getSideByResource(arg);
		if (!side) {
			throw new Error(`Can't find side based on resource! ${side}`);
		}
		this.tileResourceService.markResourceForAction(
			side,
			actionName,
			source
		);
	}

	public canResourceActionBePerformed(
		action: TILE_RESOURCE_ACTION,
		arg: Side | TileResource,
		source: string
	) {
		let side = isSide(arg) ? arg : this.getSideByResource(arg);
		return Boolean(
			side &&
				this._tileResourceService &&
				this._tileResourceService.canActionBePerformed(
					action,
					side,
					source
				)
		);
	}

	public canActionBePerformed(action: TILE_ACTION): boolean {
		switch (action) {
			case TILE_ACTION.SET_TIME_CONSUMING_ACTION:
				return !this._modifiers.timeConsumingAction;
			case TILE_ACTION.UNSET_TIME_CONSUMING_ACTON:
				return Boolean(this._modifiers.timeConsumingAction);
			case TILE_ACTION.DEPLETE_TERRAIN_TYPE:
				return Boolean(this._tileResourceService?.terrainType);
			case TILE_ACTION.SET_GREATER_DANGER:
				return !this._modifiers.greaterDanger;
			case TILE_ACTION.UNSET_GREATER_DANGER:
				return Boolean(this._modifiers.greaterDanger);
			case TILE_ACTION.FLIP:
				return Boolean(
					this._tileResourceService && !this._modifiers.flipped
				);
			case TILE_ACTION.UN_FLIP:
				return Boolean(this._modifiers.flipped);
		}
	}

	public markTileForActon(actionName: TILE_ACTION, source: string) {
		let trigger;
		switch (actionName) {
			case TILE_ACTION.SET_GREATER_DANGER:
				trigger = this.getTileModifierTrigger(
					"greaterDanger",
					true,
					source
				);
				break;
			case TILE_ACTION.UNSET_GREATER_DANGER:
				trigger = this.getTileModifierTrigger(
					"greaterDanger",
					false,
					source
				);
				break;
			case TILE_ACTION.SET_TIME_CONSUMING_ACTION:
				trigger = this.getTileModifierTrigger(
					"timeConsumingAction",
					true,
					source
				);
				break;
			case TILE_ACTION.UNSET_TIME_CONSUMING_ACTON:
				trigger = this.getTileModifierTrigger(
					"timeConsumingAction",
					false,
					source
				);
				break;
			case TILE_ACTION.DEPLETE_TERRAIN_TYPE:
				trigger = this.getTileModifierTrigger(
					"terrainDepleted",
					true,
					source
				);
				break;
			case TILE_ACTION.FLIP:
				trigger = this.getTileModifierTrigger("flipped", true, source);
				break;
			case TILE_ACTION.UN_FLIP:
				trigger = this.getTileModifierTrigger("flipped", false, source);
		}

		this._markedForAction = {
			action: actionName,
			source,
			trigger,
		};
	}

	resetTileActionMark() {
		this._markedForAction = null;
	}

	resetTileResourceActionMarks() {
		this._tileResourceService?.resetActionMarks();
	}

	public triggerResourceAction(side: Side, source: string) {
		this.tileResourceService?.triggerAction(side, source);
	}

	public reveal(resources: TileType) {
		this._tileResourceService = new TileResourceService(
			this._game,
			resources.id,
			resources.terrainType,
			resources.resources,
			resources.extras
		);
		this._action = ACTION.GATHER;
	}

	public setStructureLvl(
		structure: "roof" | "palisade" | "shelter",
		amount: number
	) {
		this.builtStructures[structure] = amount;
	}

	public incrementStructureLvl(
		structure: BuiltTileStructure,
		amount: number
	) {
		this.builtStructures[structure] += amount;
	}

	decrementStructureLvl(structure: BuiltTileStructure, amount: number) {
		this.builtStructures[structure] -= amount;
	}

	resetStructures() {
		this.builtStructures = {
			roof: 0,
			shelter: 0,
			palisade: 0,
		};
	}

	public applyGreaterDangerEffect(resolver: ICharacter) {
		if (
			this._game.constructionService.getConstruction(CONSTRUCTION.WEAPON)
				.lvl < 1
		) {
			this._game.characterService.hurt(resolver, 1, "Zagrożenie");
		}
	}

	public addModifier(
		arg: Side | TileGatherableResource,
		source: string
	): void {
		if (isSide(arg)) {
			this._tileResourceService?.addResourceBoostBySide(arg, source);
		} else {
			this._tileResourceService?.addModifierByResource(arg, source);
		}
	}

	public removeResourceModifier(
		side: Side | null,
		resource: "wood" | "food",
		source: string
	): void {
		const resSide = side ? side : this.getSideByResource(resource);
		if (!side) {
			const resSide = this.getSideByResource("beast") as Side;
		}
		if (!resSide) {
			throw new Error("Can't deduce resource side");
		}
		this._tileResourceService?.removeBoost(resSide, source);
	}

	public clearResourceModifiers() {
		this._tileResourceService?.clearModifiers();
	}

	private getTileModifierTrigger(
		modifier: keyof TileModifiers,
		value: boolean,
		source: string
	) {
		return () => {
			if (value) {
				if (modifier === "flipped" && this.hasShortcut) {
					this._game.inventionService.destroy(
						INVENTION_PERSONAL.SHORTCUT
					);
				}
				this.setTileModifier(modifier, source);
			} else {
				this.unsetTileModifier(modifier, source);
			}
		};
	}

	public unsetTileModifier(modifier: keyof TileModifiers, source: string) {
		this._modifiers[modifier] = null;
		if (modifier === "flipped") {
			this._game.tileService.updateDistance();
		}
		this._game.logService.addMessage(
			{
				code: LOG_CODE.TILE_MODIFIER_REMOVED,
				subject1: modifier,
				subject2: "",
				amount: 1,
			},
			"positive",
			source
		);
	}

	public setTileModifier(modifier: keyof TileModifiers, source: string) {
		this.modifiers[modifier] = { source, setInRound: this._game.round };
		if (modifier === "flipped") {
			this._game.tileService.updateDistance();
		}
		this._game.logService.addMessage(
			{
				code: LOG_CODE.TILE_MODIFIER_ADDED,
				subject1: modifier,
				subject2: "",
				amount: 1,
			},
			"negative",
			source
		);
	}

	public unsetShortcut(): void {
		this.setShortcut("left", false);
		this.setShortcut("right", false);
	}

	public getShortcutResource() {
		return this._tileResourceService?.getShortcutResource() || null;
	}
}
