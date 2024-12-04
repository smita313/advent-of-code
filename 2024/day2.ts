import { readFileSync } from "fs";

const isReportSafe = (report: number[]) => {
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
};

const isReportTolerablySafeBruteForce = (report: number[]) => {
  for (let i = 0; i < report.length; i++) {
    const testReport = [...report];
    testReport.splice(i, 1);

    if (isReportSafe(testReport)) {
      return true;
    }
  }

  return false;
};

const part1 = () => {
  const fileStr = readFileSync("./inputs/Day2.txt").toString();

  const reports = fileStr
    .split("\n")
    .filter((reportStr) => reportStr)
    .map((reportStr) => reportStr.split(" ").map((x) => parseInt(x)));

  return reports.filter((report) => isReportSafe(report)).length;
};

const part2 = () => {
  const fileStr = readFileSync("./inputs/Day2.txt").toString();

  const reports = fileStr
    .split("\n")
    .filter((reportStr) => reportStr)
    .map((reportStr) => reportStr.split(" ").map((x) => parseInt(x)));

  return reports.filter(
    (report) => isReportSafe(report) || isReportTolerablySafeBruteForce(report)
  ).length;
};

console.log("Part 1: " + part1()); // 463
console.log("Part 2: " + part2()); // 514
