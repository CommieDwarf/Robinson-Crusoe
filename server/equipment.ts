import shuffle from "../utils/shuffleArray";

const equipmentList = [
  "bible",
  "biscuits",
  "emptyBottle",
  "flaskOfRum",
  "hammer&Nails",
  "pipe&Tabacco",
  "pistol",
  "stormGlass",
];

const shuffled = shuffle(equipmentList);

export default equipmentList.splice(0, 2);
