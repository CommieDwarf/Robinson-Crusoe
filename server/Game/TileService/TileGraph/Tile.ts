import {
  BuiltTileStructure,
  ITile,
  ITileRenderData,
  TileModifiers,
  TilePosition,
  TileResource,
  MarkedForAction,
} from "../../../../interfaces/TileService/ITile";
import {IGame} from "../../../../interfaces/Game";
import {ICharacter} from "../../../../interfaces/Characters/Character";
import {CONSTRUCTION} from "../../../../interfaces/ConstructionService/Construction";
import {
  GatherableResourceAmount,
  ITileResourceService,
  Side,
  TILE_RESOURCE_ACTION,
} from "../../../../interfaces/TileService/TileResourceService";
import {FixedTileResources} from "../../../../interfaces/TileService/TileResourceInfo";
import {TileResourceService} from "./TileResourceService/TileResourceService";

export class Tile implements ITile {
  private readonly _position: TilePosition;
  private readonly _id: number;
  private _show: boolean;
  private _tileResourceService: ITileResourceService | null;
  private _requiredHelperAmount: number = 0;
  private _canCampBeSettled = false;
  private readonly _game: IGame;
  private _camp: boolean;
  private _modifiers: TileModifiers = {
    greaterDanger: false,
    timeConsumingAction: false,
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
    this._position = position;
    this._id = id;
    this._camp = camp;
    this._tileResourceService = tileType;
    this._game = game;
    this._show = camp;
  }

  get renderData(): ITileRenderData {
    return {
      requiredHelperAmount: this.requiredHelperAmount,
      id: this.id,
      show: this.show,
      position: this.position,
      tileResourceService: this.tileResourceService?.renderData || null,
      canCampBeSettled: this.canCampBeSettled,
      camp: this.camp,
      modifiers: this._modifiers,
    };
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
    return this._canCampBeSettled && this._game.phaseService.phase === "night";
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

  get requiredHelperAmount(): number {
    let requiredHelperAmount: number;
    requiredHelperAmount = this._modifiers.timeConsumingAction
        ? this._requiredHelperAmount + 1
        : this._requiredHelperAmount;
    return requiredHelperAmount;
  }

  set requiredHelperAmount(value: number) {
    this._requiredHelperAmount = value;
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

  public canBeGathered(side: "left" | "right"): boolean {
    const resourceAmount = this.getGatherableResourceAmount(side)?.amount;
    return resourceAmount ? resourceAmount > 0 : false;
  }

  public getGatherableResourceAmount(
      side: "left" | "right"
  ): GatherableResourceAmount | null {
    return (
        this._tileResourceService?.getModifiedBasicResourceAmount(side) || null
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
      side: Side,
      actionName: TILE_RESOURCE_ACTION,
      source: string
  ) {
    if (!this.tileResourceService) {
      throw new Error(`tile is not revealed. id: ${this.id}`);
    }
    this.tileResourceService.markResourceForAction(source, actionName, side);
  }

  public markTileForActon(
      actionName: TILE_RESOURCE_ACTION,
      source: string,
  ) {
    let trigger;
    switch (TILE_RESOURCE_ACTION.ADD_MODIFIER) {
      
    }
  }


  public triggerResourceAction(side: Side, source: string) {
    this.tileResourceService?.triggerAction(side, source);
  }

  public reveal(resources: FixedTileResources) {
    this._tileResourceService = new TileResourceService(
        this._game,
        resources.id,
        resources.terrainType,
        resources.resources,
        resources.extras
    );
  }

  public setStructureLvl(
      structure: "roof" | "palisade" | "shelter",
      amount: number
  ) {
    this.builtStructures[structure] = amount;
  }

  public incrementStructureLvl(structure: BuiltTileStructure, amount: number) {
    this.builtStructures[structure] += amount;
  }

  // TODO: implement edge cases
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
        this._game.constructionService.getConstruction(CONSTRUCTION.WEAPON).lvl <
        1
    ) {
      this._game.characterService.hurt(resolver, 1, "Zagrożenie");
    }
  }

  public addResourceModifier(side: Side, source: string): void {
    this._tileResourceService?.addModifier(side, source);
  }

  public removeResourceModifier(side: Side, source: string): void {
    this._tileResourceService?.removeModifier(side, source);
  }

  public clearResourceModifiers() {
    this._tileResourceService?.clearModifiers();
  }

  public setTileModifier(
      modifier: keyof TileModifiers,
      value: boolean,
      source: string
  ) {
    if (this.modifiers[modifier] === value) {
      return;
    }

    this.modifiers[modifier] = value;

    switch (true) {
      case value && modifier === "greaterDanger":
        this._game.chatLog.addMessage(
            "Na kafelek położono żeton zagrożenia.",
            "red",
            source
        );
        break;
      case value && modifier === "timeConsumingAction":
        this._game.chatLog.addMessage(
            "Na kafelek położono żeton wymaganego dodatkowego pionka",
            "red",
            source
        );
        break;
      case !value && modifier === "greaterDanger":
        this._game.chatLog.addMessage(
            "Na kafelku usunięto żeton zagrożenia",
            "green",
            source
        );
        break;
      case !value && modifier === "timeConsumingAction":
        this._game.chatLog.addMessage(
            "Na kafelku usunięto żeton wymaganego dodatkowego pionka",
            "green",
            source
        );
        break;
    }
  }
}
