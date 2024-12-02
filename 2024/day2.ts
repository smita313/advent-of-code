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

// Performant part 2 attempt, alas
// const isReportTolerablySafe = (report: number[]) => {
//   const diffs: number[] = [];
//   for (let i = 0; i < report.length - 1; i++) {
//     diffs.push(report[i + 1] - report[i]);
//   }

//   const signs = diffs.map((num) => Math.sign(num));

//   const signMap: Record<string, number> = {};
//   signs.forEach((sign) =>
//     signMap[sign] ? signMap[sign]++ : (signMap[sign] = 1)
//   );

//   console.log(signMap);

//   if (Object.keys(signMap).length > 2) {
//     return false;
//   }

//   if (Object.keys(signMap).filter((sign) => signMap[sign] > 1).length > 1) {
//     return false;
//   }

//   // do something else here

//   return true;
// };

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
