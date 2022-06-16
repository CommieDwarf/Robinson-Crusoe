import IStructure from "../interfaces/Structure";

const structures: IStructure[] = [
    {
        type: "shelter",
        level: 1,
        commitedResources: {
            type: "wood",
            quantity: 4,
        },
        woodCost: 3,
        leatherCost: 2,
        locked: false,
        builder: false,
        helper: false
    },
    {
      type: "roof",
      level: 0,
      commitedResources: {
          type: null,
          quantity: 0,
      },
      woodCost: 3,
      leatherCost: 2,
      locked: true,
      builder: null,
        helper: null
  },
  {
      type: "palisade",
      level: 0,
      commitedResources: {
          type: null,
          quantity: 0,
      },
      woodCost: 3,
      leatherCost: 2,
      locked: true,
      builder: null,
        helper: null
  },
  {
    type: "weapon",
    level: 0,
    commitedResources: {
        type: null,
        quantity: 0
    },
    woodCost: 2,
    leatherCost: 0,
    locked: false,
    builder: null,
    helper: null,
  }
]

export default structures;