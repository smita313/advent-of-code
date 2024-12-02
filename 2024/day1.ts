import { readFileSync } from "fs";

const part1 = () => {
  const fileStr = readFileSync("./inputs/Day1.txt").toString();

  const rows = fileStr
    .split("\n")
    .filter((row) => row)
    .map((row) => row.split("   "));

  const leftList = rows.map((row) => parseInt(row[0])).sort();
  const rightList = rows.map((row) => parseInt(row[1])).sort();

  return leftList
    .map((left, i) => Math.abs(left - rightList[i]))
    .reduce((sum, current) => sum + current, 0);
};

const part2 = () => {
  const fileStr = readFileSync("./inputs/Day1.txt").toString();

  const rows = fileStr
    .split("\n")
    .filter((row) => row)
    .map((row) => row.split("   "));

  const leftList = rows.map((row) => parseInt(row[0]));
  const rightList = rows.map((row) => parseInt(row[1]));

  return leftList
    .map((left) => left * rightList.filter((right) => right == left).length)
    .reduce((sum, current) => sum + current, 0);
};

console.log("Part 1: " + part1()); // 1830467
console.log("Part 2: " + part2()); // 26674158
