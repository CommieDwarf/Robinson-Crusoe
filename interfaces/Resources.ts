export default interface IResources {
    food: number,
    dryFood: number,
    wood: number,
    leather: number
  }

export interface AllResources {
    owned: IResources,
    future: IResources,
}



