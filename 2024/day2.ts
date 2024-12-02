import { readFileSync } from "fs";

const part1 = () => {
  const fileStr = readFileSync("./inputs/Day2.txt").toString();

  const reports = fileStr
    .split("\n")
    .filter((reportStr) => reportStr)
    .map((reportStr) => reportStr.split(" ").map((x) => parseInt(x)));

  return reports
    .map((report) => {
      const diffs: number[] = [];
      for (let i = 0; i < report.length - 1; i++) {
        diffs.push(report[i] - report[i + 1]);
      }

      return diffs.every(
        (num) =>
          Math.sign(num) == Math.sign(diffs[0]) &&
          Math.abs(num) > 0 &&
          Math.abs(num) <= 3
      );
    })
    .filter((isSafe) => isSafe).length;
};

console.log("Part 1: " + part1()); // 463
