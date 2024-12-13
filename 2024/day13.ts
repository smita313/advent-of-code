import { readFileSync } from "fs";
import { Coord, Direction } from "./utils";

type Machine = {
  ButtonA: Direction;
  ButtonB: Direction;
  Prize: Coord;
};

const part1 = () => {
  const inputStr = readFileSync("./inputs/day13.txt").toString().trim();

  const machines: Machine[] = inputStr.split("\n\n").map((machineStr) => {
    const machineInfoArr = machineStr.split("\n");
    const numberRegex = /\d+/g;
    const aMatches = machineInfoArr[0].match(numberRegex);
    const bMatches = machineInfoArr[1].match(numberRegex);
    const prizeMatches = machineInfoArr[2].match(numberRegex);

    return {
      ButtonA: { X: Number(aMatches?.at(0)), Y: Number(aMatches?.at(1)) },
      ButtonB: { X: Number(bMatches?.at(0)), Y: Number(bMatches?.at(1)) },
      Prize: { X: Number(prizeMatches?.at(0)), Y: Number(prizeMatches?.at(1)) },
    };
  });

  return machines
    .map((machine) => {
      const aPress =
        (machine.ButtonB.X * machine.Prize.Y -
          machine.ButtonB.Y * machine.Prize.X) /
        (machine.ButtonB.X * machine.ButtonA.Y -
          machine.ButtonB.Y * machine.ButtonA.X);

      const bPress =
        (machine.Prize.X - machine.ButtonA.X * aPress) / machine.ButtonB.X;

      if (
        Number.isInteger(aPress) &&
        Number.isInteger(bPress) &&
        aPress > 0 &&
        aPress <= 100 &&
        bPress > 0 &&
        bPress <= 100
      ) {
        return 3 * aPress + 1 * bPress;
      }

      return 0;
    })
    .reduce((sum, current) => sum + current, 0);
};

const part2 = () => {
  const inputStr = readFileSync("./inputs/day13.txt").toString().trim();

  const machines: Machine[] = inputStr.split("\n\n").map((machineStr) => {
    const machineInfoArr = machineStr.split("\n");
    const numberRegex = /\d+/g;
    const aMatches = machineInfoArr[0].match(numberRegex);
    const bMatches = machineInfoArr[1].match(numberRegex);
    const prizeMatches = machineInfoArr[2].match(numberRegex);

    return {
      ButtonA: { X: Number(aMatches?.at(0)), Y: Number(aMatches?.at(1)) },
      ButtonB: { X: Number(bMatches?.at(0)), Y: Number(bMatches?.at(1)) },
      Prize: {
        X: Number(prizeMatches?.at(0)) + 10000000000000,
        Y: Number(prizeMatches?.at(1)) + 10000000000000,
      },
    };
  });

  return machines
    .map((machine) => {
      const aPress =
        (machine.ButtonB.X * machine.Prize.Y -
          machine.ButtonB.Y * machine.Prize.X) /
        (machine.ButtonB.X * machine.ButtonA.Y -
          machine.ButtonB.Y * machine.ButtonA.X);

      const bPress =
        (machine.Prize.X - machine.ButtonA.X * aPress) / machine.ButtonB.X;

      if (
        Number.isInteger(aPress) &&
        Number.isInteger(bPress) &&
        aPress > 0 &&
        bPress > 0
      ) {
        return 3 * aPress + 1 * bPress;
      }

      return 0;
    })
    .reduce((sum, current) => sum + current, 0);
};

const p1Start = performance.now();

console.log("Part 1: " + part1()); // 29598

const p1End = performance.now();

console.log(`Part 1 took ${p1End - p1Start} ms`);

const p2Start = performance.now();

console.log("Part 2: " + part2()); // 93217456941970

const p2End = performance.now();

console.log(`Part 2 took ${p2End - p2Start} ms`);
