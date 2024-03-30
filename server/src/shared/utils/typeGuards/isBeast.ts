import {Beast} from "../../../Classes/Game/BeastService/BeastCreator/Beast";
import {BEAST, IBeastRenderData} from "@shared/types/Game/Beasts/Beast";

export function isBeast(candidate: Object): candidate is Beast {
    return "weaponLoss" in candidate;
}

export function isBeastRenderData(candidate: Object): candidate is IBeastRenderData {
    return "name" in candidate && Object.values(BEAST).includes(candidate.name as BEAST);
}
