import { readFileSync } from "fs";
import { Direction, isValidCoord } from "./utils";

const traversalDirections: Direction[] = [
  { X: 0, Y: -1 },
  { X: 1, Y: 0 },
  { X: 0, Y: 1 },
  { X: -1, Y: 0 },
];

const getInitialPath = (grid: string[]) => {
  let currRow = grid.findIndex((row) => row.includes("^"));
  let currCol = grid[currRow].indexOf("^");
  let currDirectionIndex = 0;

  let traversed = new Set<string>();
  while (isValidCoord(grid, currRow, currCol)) {
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

  return traversed;
};

const part1 = () => {
  const fileStr = readFileSync("./inputs/day6.txt").toString();

  const grid = fileStr.split("\n");

  return getInitialPath(grid).size;
};

const replaceAt = (str: string, index: number, replacement: string) => {
  return (
    str.substring(0, index) +
    replacement +
    str.substring(index + replacement.length)
  );
};

const isInfiniteTraversal = (grid: string[]) => {
  let currRow = grid.findIndex((row) => row.includes("^"));
  let currCol = grid[currRow].indexOf("^");
  let currDirectionIndex = 0;

  let traversed: string[] = [];
  while (isValidCoord(grid, currRow, currCol)) {
    const entry = `${currCol},${currRow},${currDirectionIndex}`;

    if (traversed.includes(entry)) {
      return true;
    }

    traversed.push(`${currCol},${currRow},${currDirectionIndex}`);

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

  return false;
};

const part2 = () => {
  const startTime = performance.now();

  const fileStr = readFileSync("./inputs/day6.txt").toString();

  const grid = fileStr.split("\n");

  const initialPath = Array.from(getInitialPath(grid).values()).map((coord) =>
    coord.split(",").map((numStr) => parseInt(numStr))
  );

  let total = 0;
  for (let i = 1; i < initialPath.length; i++) {
    const col = initialPath[i][0];
    const row = initialPath[i][1];

    const newGrid = [...grid];

    if (newGrid[row][col] == ".") {
      newGrid[row] = replaceAt(newGrid[row], col, "#");
      if (isInfiniteTraversal(newGrid)) {
        total++;
      }
    }
  }

  const endTime = performance.now();

  console.log(`Part 2 took ${endTime - startTime} ms`);

  return total;
};

console.log("Part 1: " + part1()); // 5030
console.log("Part 2: " + part2()); // 1928
