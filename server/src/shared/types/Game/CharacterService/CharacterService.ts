import {ISideCharacter, ISideCharacterRenderData,} from "../Characters/SideCharacter";
import {IPlayerCharacter, IPlayerCharacterRenderData,} from "../Characters/PlayerCharacter";
import {ICharacter} from "../Characters/Character";

export interface ICharacterServiceRenderData {
    playerCharacters: IPlayerCharacterRenderData[];
    dog: ISideCharacterRenderData;
    friday: ISideCharacterRenderData;
    thresholdAmountForRemoval: number;
    areSomePawnsUnassigned: boolean;
}

export interface ICharacterService {
    allCharacters: ICharacter[];

    healableCharacters: ICharacter[];

    dog: ISideCharacter;
    friday: ISideCharacter;
    thresholdAmountForRemoval: number;
    removeFreePawn: (charName: string, draggableId: string) => void;
    removePawn: (charName: string, draggableId: string) => void;
    addPawn: (charName: string, draggableId: string) => void;
    addFreePawn: (charName: string, draggableId: string) => void;
    getCharacter: (charName: string) => ICharacter;
    hurtAllPlayerCharacters: (by: number, source: string) => void;
    healAllCharacters: (amount: number, sourceLog: string) => void;
    decrDeterminationAllPlayerCharacters: (
        amount: number,
        logSource: string
    ) => void;
    incrDeterminationAllCharacters: (amount: number, logSource: string) => void;
    renderData: ICharacterServiceRenderData;
    hurt: (
        charOrName: string | ICharacter,
        by: number,
        logSource: string
    ) => void;
    heal: (
        charOrName: string | ICharacter,
        by: number,
        logSource: string
    ) => void;
    decrDeterminationOrGetHurt: (
        charOrName: string | ICharacter,
        by: number,
        logSource: string
    ) => void;
    incrDetermination: (
        charOrName: string | ICharacter,
        by: number,
        logSource: string
    ) => void;
    resetPawns: () => void;
    removeMoraleThreshold: (
        char: IPlayerCharacter | string,
        threshold: number
    ) => void;
    markThresholdsForRemoval: (amount: number) => void;
    unMarkThresholdsForRemoval: (amount: number) => void;
}
