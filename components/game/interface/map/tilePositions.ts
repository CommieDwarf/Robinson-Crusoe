let mapStructure = [
  [false, true, true, true],
  [true, true, true, true, true],
  [true, true, true, true],
  [false, true, true, true],
];

function getTilePositions(topStart: number, leftStart: number) {
  const positions = [];
  let top = topStart;
  let nextRowStartLeft = leftStart;
  for (let row of mapStructure) {
    let left = nextRowStartLeft;
    for (let hex of row) {
      if (hex) {
        positions.push({ top, left });
      }
      left += 16;
    }
    top += 13.5;
    nextRowStartLeft = nextRowStartLeft === 22 ? 14 : 22;
  }

  return positions;
}

export default getTilePositions(17, 22);
