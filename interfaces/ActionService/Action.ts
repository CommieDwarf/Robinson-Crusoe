export enum ACTION_TYPE {
  gather = "GATHER",
  explore = "EXPLORE",
  build = "BUILD",
  hunt = "HUNT",
  threat = "THREAT",
}

export interface IAction {
  type: ACTION_TYPE;
  eventToken: boolean;
  reRollToken: boolean;
  additionalPawnRequired: boolean;
}
