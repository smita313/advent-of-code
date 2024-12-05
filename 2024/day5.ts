import { readFileSync } from "fs";

const part1 = () => {
  const fileStr = readFileSync("./inputs/day5.txt").toString();

  const fileParts = fileStr.split("\n\n");

  const orderingRules = fileParts[0].split("\n").map((rule) => rule.split("|"));

  const checkPairOrder = (first: string, second: string) => {
    const filteredRule = orderingRules.find(
      (rule) => rule.includes(first) && rule.includes(second)
    );
    if (filteredRule) {
      return filteredRule[0] == first;
    }

    return true;
  };

  const validUpdates = fileParts[1]
    .split("\n")
    .filter((s) => s)
    .map((update) => update.split(","))
    .filter((update) =>
      update.every((page, i, pages) =>
        pages.slice(i + 1).every((nextPage) => checkPairOrder(page, nextPage))
      )
    );

  return validUpdates
    .map((update) => parseInt(update[Math.floor(update.length / 2)]))
    .reduce((sum, current) => sum + current, 0);
};

console.log("Part 1: " + part1()); // 4281
