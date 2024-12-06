import { readFileSync } from "fs";

type Direction = { X: number; Y: number };

const traversalDirections: Direction[] = [
  { X: 0, Y: -1 },
  { X: 1, Y: 0 },
  { X: 0, Y: 1 },
  { X: -1, Y: 0 },
];

const part1 = () => {
  const fileStr = readFileSync("./inputs/day6.txt").toString();

  const grid = fileStr.split("\n");

  let currRow = grid.findIndex((row) => row.includes("^"));
  let currCol = grid[currRow].indexOf("^");
  let currDirectionIndex = 0;

  let traversed = new Set<string>();
  while (
    currRow > -1 &&
    currRow < grid.length &&
    currCol > -1 &&
    currCol < grid[0].length
  ) {
    traversed.add(`${currCol},${currRow}`);

    const currDirection = traversalDirections[currDirectionIndex];

    if (
      grid.at(currRow + currDirection.Y)?.at(currCol + currDirection.X) != "#"
    ) {
      currRow += currDirection.Y;
      currCol += currDirection.X;
    } else {
      currDirectionIndex = (currDirectionIndex + 1) % 4;
    }
  }

  return traversed.size;
};

console.log("Part 1: " + part1()); // 5030
