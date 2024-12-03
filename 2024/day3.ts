import { readFileSync } from "fs";

const part1 = () => {
  const fileStr = readFileSync("./inputs/day3.txt").toString();

  return fileStr
    .match(/mul\(\d+,\d+\)/g)
    ?.map((mul) => {
      const nums = mul.match(/\d+/g);
      return parseInt(nums?.at(0) ?? "1") * parseInt(nums?.at(1) ?? "1");
    })
    .reduce((sum, current) => sum + current, 0);
};

console.log("Part 1: " + part1()); // 187194524
