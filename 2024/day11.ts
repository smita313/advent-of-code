import { readFileSync } from "fs";

const handleBlinks = (
  currentStones: number[],
  currentBlink: number,
  totalBlinks: number
): number[] => {
  if (currentBlink == totalBlinks) {
    return currentStones;
  }
  const newStones = [];
  for (let i = 0; i < currentStones.length; i++) {
    const stone = currentStones[i];
    if (stone == 0) {
      newStones.push(1);

      continue;
    }

    const stoneStr = stone.toString();
    if (stone.toString().length % 2 == 0) {
      newStones.push(
        ...[
          Number(stoneStr.slice(0, stoneStr.length / 2)),
          Number(stoneStr.slice(stoneStr.length / 2)),
        ]
      );
      continue;
    }

    newStones.push(stone * 2024);
  }

  return handleBlinks(newStones, currentBlink + 1, totalBlinks);
};

const part1 = () => {
  const inputStr = readFileSync("./inputs/day11.txt").toString().trim();

  const stones = inputStr
    .trim()
    .split(" ")
    .map((stoneStr) => Number(stoneStr));

  return handleBlinks(stones, 0, 25).length;
};

console.log("Part 1: " + part1());
