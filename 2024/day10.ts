import { readFileSync } from "fs";
import { checkGridElement, Direction, isValidCoord } from "./utils";

const validDirections: Direction[] = [
  { X: 0, Y: -1 },
  { X: 1, Y: 0 },
  { X: 0, Y: 1 },
  { X: -1, Y: 0 },
];

const findTrailheads = (
  map: string[],
  nextHeight: number,
  currentRow: number,
  currentCol: number,
  currentTrailheads: Set<string>
): Set<string> => {
  for (let i = 0; i < validDirections.length; i++) {
    const nextRow = currentRow + validDirections[i].Y;
    const nextCol = currentCol + validDirections[i].X;
    if (checkGridElement(map, nextHeight.toString(), nextRow, nextCol)) {
      if (nextHeight == 9) {
        currentTrailheads.add(
          `${currentRow + validDirections[i].Y},${
            currentCol + validDirections[i].X
          }`
        );
      }

      findTrailheads(
        map,
        nextHeight + 1,
        nextRow,
        nextCol,
        currentTrailheads
      ).forEach((t) => currentTrailheads.add(t));
    }
  }

  return currentTrailheads;
};

const part1 = () => {
  const inputStr = readFileSync("./inputs/day10.txt").toString().trim();

  const map = inputStr.split("\n");

  let total = 0;
  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length; col++) {
      if (map[row][col] == "0") {
        total += findTrailheads(map, 1, row, col, new Set<string>()).size;
      }
    }
  }

  return total;
};

console.log("Part 1: " + part1()); // 776
