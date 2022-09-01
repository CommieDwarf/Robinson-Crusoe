export interface IBeastRenderData {
  name: { pl: string; en: string };
}

export interface IBeast {
  name: { pl: string; en: string };
  strength: number;
  weaponLoss: number;
  renderData: IBeastRenderData;
}
