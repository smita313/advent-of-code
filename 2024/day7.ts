import { readFileSync } from "fs";

const isPossible = (
  total: number,
  terms: number[],
  current: number,
  includePipeOperator: boolean
): boolean => {
  if (terms.length == 0) {
    return current == total;
  }

  if (current > total) {
    return false;
  }

  return (
    isPossible(
      total,
      terms.slice(1),
      current + terms[0],
      includePipeOperator
    ) ||
    isPossible(
      total,
      terms.slice(1),
      current * terms[0],
      includePipeOperator
    ) ||
    (includePipeOperator &&
      isPossible(
        total,
        terms.slice(1),
        parseInt(`${current}${terms[0]}`),
        includePipeOperator
      ))
  );
};

const part1 = () => {
  const fileStr = readFileSync("./inputs/day7.txt").toString();

  return fileStr
    .split("\n")
    .filter((str) => str)
    .map((possibleEquation) => {
      const equation = possibleEquation.split(": ");

      const total = parseInt(equation[0]);
      const terms = equation[1].split(" ").map((num) => parseInt(num));

      return { total, terms };
    })
    .filter((possibleEquation) =>
      isPossible(
        possibleEquation.total,
        possibleEquation.terms.slice(1),
        possibleEquation.terms[0],
        false
      )
    )
    .reduce((sum, current) => sum + current.total, 0);
};

const part2 = () => {
  const fileStr = readFileSync("./inputs/day7.txt").toString();

  return fileStr
    .split("\n")
    .filter((str) => str)
    .map((possibleEquation) => {
      const equation = possibleEquation.split(": ");

      const total = parseInt(equation[0]);
      const terms = equation[1].split(" ").map((num) => parseInt(num));

      return { total, terms };
    })
    .filter((possibleEquation) =>
      isPossible(
        possibleEquation.total,
        possibleEquation.terms.slice(1),
        possibleEquation.terms[0],
        true
      )
    )
    .reduce((sum, current) => sum + current.total, 0);
};

console.log("Part 1: " + part1()); // 66343330034722
console.log("Part 2: " + part2()); // 637696070419031
