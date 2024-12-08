import { readFileSync } from "fs";

const findAntinodes = (grid: string[], row: number, col: number) => {
  const antenna = grid[row][col];

  const antinodes: string[] = [];
  for (let currRow = row + 1; currRow < grid.length; currRow++) {
    for (let currCol = 0; currCol < grid[currRow].length; currCol++) {
      if (grid[currRow][currCol] == antenna) {
        const rowDiff = currRow - row;
        const colDiff = currCol - col;

        const beforeRow = row - rowDiff;
        const beforeCol = col - colDiff;

        const afterRow = currRow + rowDiff;
        const afterCol = currCol + colDiff;

        if (
          beforeRow >= 0 &&
          beforeRow < grid.length &&
          beforeCol >= 0 &&
          beforeCol < grid[0].length
        ) {
          antinodes.push(`${beforeRow},${beforeCol}`);
        }

        if (
          afterRow >= 0 &&
          afterRow < grid.length &&
          afterCol >= 0 &&
          afterCol < grid[0].length
        ) {
          antinodes.push(`${afterRow},${afterCol}`);
        }
      }
    }
  }

  return antinodes;
};

const findResonantAntinodes = (grid: string[], row: number, col: number) => {
  const antenna = grid[row][col];

  const antinodes: string[] = [];
  for (let currRow = row + 1; currRow < grid.length; currRow++) {
    for (let currCol = 0; currCol < grid[currRow].length; currCol++) {
      if (grid[currRow][currCol] == antenna) {
        antinodes.push(`${row},${col}`);
        antinodes.push(`${currRow},${currCol}`);

        const rowDiff = currRow - row;
        const colDiff = currCol - col;

        let beforeNodeRow = row - rowDiff;
        let beforeNodeCol = col - colDiff;
        while (
          beforeNodeRow >= 0 &&
          beforeNodeRow < grid.length &&
          beforeNodeCol >= 0 &&
          beforeNodeCol < grid[0].length
        ) {
          antinodes.push(`${beforeNodeRow},${beforeNodeCol}`);
          beforeNodeRow -= rowDiff;
          beforeNodeCol -= colDiff;
        }

        let afterNodeRow = currRow + rowDiff;
        let afterNodeCol = currCol + colDiff;
        while (
          afterNodeRow >= 0 &&
          afterNodeRow < grid.length &&
          afterNodeCol >= 0 &&
          afterNodeCol < grid[0].length
        ) {
          antinodes.push(`${afterNodeRow},${afterNodeCol}`);
          afterNodeRow += rowDiff;
          afterNodeCol += colDiff;
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

const part2 = () => {
  const fileStr = readFileSync("./inputs/day8.txt").toString();

  const grid = fileStr.split("\n").filter((str) => str);

  const antinodes = new Set<string>();
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] != ".") {
        findResonantAntinodes(grid, row, col).map((antinodeStr) =>
          antinodes.add(antinodeStr)
        );
      }
    }
  }

  return antinodes.size;
};

console.log("Part 1: " + part1()); // 413
console.log("Part 2: " + part2()); // 1417
