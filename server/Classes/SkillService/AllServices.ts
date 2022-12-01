import { Cook } from "./Characters/Cook";
import { Friday } from "./Characters/Friday";
import { Explorer } from "./Characters/Explorer";
import { Carpenter } from "./Characters/Carpenter";
import { Soldier } from "./Characters/Soldier";
import { Dog } from "./Characters/Dog";

interface SkillServices {
  cook: typeof Cook;
  explorer: typeof Explorer;
  carpenter: typeof Carpenter;
  soldier: typeof Soldier;
  friday: typeof Friday;
  dog: typeof Dog;
}

export const skillServices: SkillServices = {
  cook: Cook,
  explorer: Explorer,
  carpenter: Carpenter,
  soldier: Soldier,
  friday: Friday,
  dog: Dog,
};
