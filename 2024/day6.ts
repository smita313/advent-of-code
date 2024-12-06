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
  traversed.add(`${currCol},${currRow}`);
  while (
    currRow + traversalDirections[currDirectionIndex].Y > -1 &&
    currRow + traversalDirections[currDirectionIndex].Y < grid.length &&
    currCol + traversalDirections[currDirectionIndex].X > -1 &&
    currCol + traversalDirections[currDirectionIndex].X < grid[0].length
  ) {
    const currDirection = traversalDirections[currDirectionIndex];
    if (grid[currRow + currDirection.Y][currCol + currDirection.X] != "#") {
      currRow += currDirection.Y;
      currCol += currDirection.X;

      traversed.add(`${currCol},${currRow}`);
    } else {
      currDirectionIndex = (currDirectionIndex + 1) % 4;
    }
  }

  return traversed.size;
};

console.log("Part 1: " + part1()); // 5030
