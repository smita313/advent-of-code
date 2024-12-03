import { readFileSync } from "fs";

const sumValidProducts = (str: string) => {
  return (
    str
      .match(/mul\(\d+,\d+\)/g)
      ?.map((mul) => {
        const nums = mul.match(/\d+/g);
        return parseInt(nums?.at(0) ?? "1") * parseInt(nums?.at(1) ?? "1");
      })
      .reduce((sum, current) => sum + current, 0) ?? 0
  );
};

const part1 = () => {
  const fileStr = readFileSync("./inputs/day3.txt").toString();

  return sumValidProducts(fileStr);
};

const part2 = () => {
  const fileStr = readFileSync("./inputs/day3.txt").toString();

  let result = 0;
  let remainingStr = fileStr;
  
  while (remainingStr) {
    const nextDontIndex = remainingStr.indexOf("don't()");

    if (nextDontIndex < 0) {
      result += sumValidProducts(remainingStr);

      remainingStr = "";
    } else {
      const enabledStr = remainingStr.substring(0, nextDontIndex);

      result += sumValidProducts(enabledStr);

      const nextDoIndex = remainingStr.indexOf("do()", nextDontIndex);
     
      if (nextDoIndex > -1) {
        remainingStr = remainingStr.substring(nextDoIndex);
      } else {
        remainingStr = "";
      }
    }
  }

  return result;
};

console.log("Part 1: " + part1()); // 187194524
console.log("Part 2: " + part2()); // 127092535
