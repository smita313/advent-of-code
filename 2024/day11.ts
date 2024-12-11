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
    if (stoneStr.length % 2 == 0) {
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

const addToCounter = (
  counter: Record<string, number>,
  key: string,
  value: number
) => {
  if (!counter[key]) {
    counter[key] = 0;
  }

  counter[key] += value;

  return counter;
};

const handleBlinksPerformantly = (stones: string[], totalBlinks: number) => {
  let stoneCounter: Record<string, number> = {};
  stones.forEach((s) => addToCounter(stoneCounter, s, 1));

  let blinks = 0;

  while (blinks < totalBlinks) {
    stoneCounter = Object.entries(stoneCounter).reduce(
      (acc, [stone, stoneCount]) => {
        if (stone == "0") {
          addToCounter(acc, "1", stoneCount);
        } else if (stone.length % 2 == 0) {
          addToCounter(acc, stone.slice(0, stone.length / 2), stoneCount);
          addToCounter(
            acc,
            Number(stone.slice(stone.length / 2)).toString(),
            stoneCount
          );
        } else {
          addToCounter(acc, (Number(stone) * 2024).toString(), stoneCount);
        }
        return acc;
      },
      {} as Record<string, number>
    );

    blinks++;
  }

  return stoneCounter;
};

const part1 = () => {
  const inputStr = readFileSync("./inputs/day11.txt").toString().trim();

  const stones = inputStr.trim().split(" ");

  return Object.values(handleBlinksPerformantly(stones, 25)).reduce(
    (sum, current) => sum + current,
    0
  );
};

const part2 = () => {
  const inputStr = readFileSync("./inputs/day11.txt").toString().trim();

  const stones = inputStr.trim().split(" ");

  return Object.values(handleBlinksPerformantly(stones, 75)).reduce(
    (sum, current) => sum + current,
    0
  );
};

const p1Start = performance.now();

console.log("Part 1: " + part1()); // 231278

const p1End = performance.now();

console.log(`Part 1 took ${p1End - p1Start} ms`);

const p2Start = performance.now();

console.log("Part 2: " + part2()); // 274229228071551

const p2End = performance.now();

console.log(`Part 2 took ${p2End - p2Start} ms`);
