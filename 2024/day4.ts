import { readFileSync } from "fs";

type Direction = { X: number; Y: number };

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

const isCrossMas = (currCol: number, currRow: number, lines: string[]) => {
  if (
    lines[currRow][currCol] != "A" ||
    currCol - 1 < 0 ||
    currCol + 1 >= lines[currRow].length ||
    currRow - 1 < 0 ||
    currRow + 1 >= lines.length
  ) {
    return false;
  }

  const firstOption = [
    lines[currRow - 1][currCol - 1],
    lines[currRow + 1][currCol + 1],
  ];
  const secondOption = [
    lines[currRow - 1][currCol + 1],
    lines[currRow + 1][currCol - 1],
  ];

  return (
    firstOption.includes("M") &&
    firstOption.includes("S") &&
    secondOption.includes("M") &&
    secondOption.includes("S")
  );
};

const part2 = () => {
  const fileStr = readFileSync("./inputs/day4.txt").toString();

  const lines = fileStr.split("\n");

  let total = 0;
  for (let currRow = 0; currRow < lines.length; currRow++) {
    for (let currCol = 0; currCol < lines[currRow].length; currCol++) {
      if (isCrossMas(currCol, currRow, lines)) {
        total++;
      }
    }
  }

  return total;
};

console.log("Part 1: " + part1()); // 2613
console.log("Part 2: " + part2()); // 1905
