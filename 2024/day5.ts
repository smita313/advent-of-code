import { readFileSync } from "fs";

const checkPairOrder = (
  orderingRules: string[][],
  first: string,
  second: string
) => {
  const filteredRule = orderingRules.find(
    (rule) => rule.includes(first) && rule.includes(second)
  );
  if (filteredRule) {
    return filteredRule[0] == first;
  }

  return true;
};

const part1 = () => {
  const fileStr = readFileSync("./inputs/day5.txt").toString();

  const fileParts = fileStr.split("\n\n");

  const orderingRules = fileParts[0].split("\n").map((rule) => rule.split("|"));

  const validUpdates = fileParts[1]
    .split("\n")
    .filter((s) => s)
    .map((update) => update.split(","))
    .filter((update) =>
      update.every((page, i, pages) =>
        pages
          .slice(i + 1)
          .every((nextPage) => checkPairOrder(orderingRules, page, nextPage))
      )
    );

  return validUpdates
    .map((update) => parseInt(update[Math.floor(update.length / 2)]))
    .reduce((sum, current) => sum + current, 0);
};

const part2 = () => {
  const fileStr = readFileSync("./inputs/day5.txt").toString();

  const fileParts = fileStr.split("\n\n");

  const orderingRules = fileParts[0].split("\n").map((rule) => rule.split("|"));

  const sortedInvalidUpdates = fileParts[1]
    .split("\n")
    .filter((s) => s)
    .map((update) => update.split(","))
    .filter(
      (update) =>
        !update.every((page, i, pages) =>
          pages
            .slice(i + 1)
            .every((nextPage) => checkPairOrder(orderingRules, page, nextPage))
        )
    )
    .map((update) =>
      update.sort((a, b) => (checkPairOrder(orderingRules, a, b) ? -1 : 1))
    );

  return sortedInvalidUpdates
    .map((update) => parseInt(update[Math.floor(update.length / 2)]))
    .reduce((sum, current) => sum + current, 0);
};

console.log("Part 1: " + part1()); // 4281
console.log("Part 2: " + part2()); // 5466
