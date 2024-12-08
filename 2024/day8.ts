import { readFileSync } from "fs";

const findAntinodes = (grid: string[], row: number, col: number) => {
  const antenna = grid[row][col];

  const antinodes: string[] = [];
  for (let currRow = row + 1; currRow < grid.length; currRow++) {
    for (let currCol = 0; currCol < grid[currRow].length; currCol++) {
      if (grid[currRow][currCol] == antenna) {
        const rowDiff = currRow - row;
        const colDiff = currCol - col;

        const an1Row = row - rowDiff;
        const an1Col = col - colDiff;

        const an2Row = currRow + rowDiff;
        const a2Col = currCol + colDiff;

        if (
          an1Row >= 0 &&
          an1Row < grid.length &&
          an1Col >= 0 &&
          an1Col < grid[0].length
        ) {
          antinodes.push(`${an1Row},${an1Col}`);
        }

        if (
          an2Row >= 0 &&
          an2Row < grid.length &&
          a2Col >= 0 &&
          a2Col < grid[0].length
        ) {
          antinodes.push(`${an2Row},${a2Col}`);
        }
      }
    }
  }

  return antinodes;
};

const part1 = () => {
  const fileStr = readFileSync("./inputs/day8.txt").toString();

  const grid = fileStr.split("\n").filter((str) => str);

  const antinodes = new Set<string>();
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] != ".") {
        findAntinodes(grid, row, col).map((antinodeStr) =>
          antinodes.add(antinodeStr)
        );
      }
    }
  }

  return antinodes.size;
};

console.log("Part 1: " + part1());
