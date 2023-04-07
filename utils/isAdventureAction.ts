import {ACTION, AdventureAction} from "../interfaces/ACTION";


export const isAdventureAction = (
    candidate: ACTION
): candidate is AdventureAction => {
    return (
        candidate === ACTION.BUILD || candidate === ACTION.EXPLORE || candidate === ACTION.GATHER
    );
};
