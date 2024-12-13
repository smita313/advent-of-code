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
        aPress > 1 &&
        aPress <= 100 &&
        bPress > 1 &&
        bPress <= 100
      ) {
        return 3 * aPress + 1 * bPress;
      }

      return 0;
    })
    .reduce((sum, current) => sum + current, 0);
};

console.log("Part 1: " + part1()); // 29598
