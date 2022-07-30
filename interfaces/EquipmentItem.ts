import { EqList } from "../server/constants/equipmentList";

export default interface EquipmentItem {
  name: keyof EqList;
  namePL: string;
  uses: number;
  game: {};
}

