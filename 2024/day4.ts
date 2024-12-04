import { readFileSync } from "fs";

type Direction = { X: number; Y: number };

const searchInDirection = (
  currCol: number,
  currRow: number,
  lines: string[],
  word: string,
  direction: Direction
) => {
  if (lines[currRow][currCol] != word[0]) {
    return false;
  }

  if (word.length == 1) {
    return true;
  }

  // Out of range
  if (
    currCol + direction.X < 0 ||
    currCol + direction.X >= lines[currRow].length ||
    currRow + direction.Y < 0 ||
    currRow + direction.Y >= lines.length
  ) {
    return false;
  }

  return searchInDirection(
    currCol + direction.X,
    currRow + direction.Y,
    lines,
    word.substring(1),
    direction
  );
};

const part1 = () => {
  const fileStr = readFileSync("./inputs/day4.txt").toString();
  const lines = fileStr.split("\n");

  const directions = [
    { X: -1, Y: -1 },
    { X: 0, Y: -1 },
    { X: 1, Y: -1 },
    { X: -1, Y: 1 },
    { X: 0, Y: 1 },
    { X: 1, Y: 1 },
    { X: -1, Y: 0 },
    { X: 1, Y: 0 },
  ];

  let total = 0;
  for (let currRow = 0; currRow < lines.length; currRow++) {
    for (let currCol = 0; currCol < lines[currRow].length; currCol++) {
      total += directions.filter((direction) =>
        searchInDirection(currCol, currRow, lines, "XMAS", direction)
      ).length;
    }
  }

  return total;
};

console.log("Part 1: " + part1()); // 2613
