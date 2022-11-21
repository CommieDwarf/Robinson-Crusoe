export class MissingPawnError extends Error {
  private readonly _itemName: string | number;
  private readonly _itemType: string;

  constructor(message: string, itemName: string | number, itemType: string) {
    super(message);
    this.name = "MissingPawn";
    this._itemName = itemName;
    this._itemType = itemType;
  }

  get itemType(): string {
    return this._itemType;
  }

  get itemName(): string | number {
    return this._itemName;
  }
}
