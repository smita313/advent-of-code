import { readFileSync } from "fs";

const part1 = () => {
  const fileStr =
    //readFileSync("./inputs/day5.txt").toString();

    `47|53
  97|13
  97|61
  97|47
  75|29
  61|13
  75|53
  29|13
  97|29
  53|29
  61|53
  97|53
  61|29
  47|13
  75|47
  97|75
  47|61
  75|61
  47|29
  75|13
  53|13
  
  75,47,61,53,29
  97,61,53,29,13
  75,29,13
  75,97,47,61,53
  61,13,29
  97,13,75,29,47`;

  const fileParts = fileStr.split("\n\n");

  const orderingRules = fileParts[0].split("\n").map((rule) => rule.split("|"));

  const sortedOrder = Array.from(new Set(orderingRules.flat()));

  for (let i = 0; i < orderingRules.length; i++) {
    const before = orderingRules[i][0];
    const after = orderingRules[i][1];

    const beforeIndex = sortedOrder.indexOf(before);
    const afterIndex = sortedOrder.indexOf(after);

    if (afterIndex < beforeIndex) {
      sortedOrder.splice(beforeIndex, 1);
      sortedOrder.splice(afterIndex, 0, before);
    }

    console.log({ sortedOrder });
  }

  const validUpdates = fileParts[1]
    .split("\n")
    .map((update) => update.split(","))
    .filter((update) =>
      update.every(
        (page, i, pages) =>
          i == 0 ||
          sortedOrder.indexOf(page) > sortedOrder.indexOf(pages[i - 1])
      )
    );

  console.log({ validUpdates });

  return validUpdates
    .map((update) => parseInt(update[Math.floor(update.length / 2)]))
    .reduce((sum, current) => sum + current, 0);
};

console.log("Part 1: " + part1());
