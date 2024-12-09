import { readFileSync } from "fs";

const part1 = () => {
  const inputStr = readFileSync("./inputs/day9.txt").toString().trim();

  const fileStructure = inputStr.split("").flatMap((digit, i) => {
    if (i % 2 == 0) {
      return Array<number | undefined>(parseInt(digit)).fill(i / 2);
    }

    return Array<number | undefined>(parseInt(digit)).fill(undefined);
  });

  const cleanedFiles: number[] = [];
  let startIndex = 0;
  let lastIndex = fileStructure.length - 1;
  while (
    startIndex < lastIndex ||
    cleanedFiles.length < fileStructure.filter((f) => f != undefined).length
  ) {
    if (fileStructure[startIndex] != undefined) {
      cleanedFiles.push(fileStructure[startIndex] ?? 0);
      startIndex++;
    } else {
      if (fileStructure[lastIndex] == undefined) {
        lastIndex--;
      } else {
        cleanedFiles.push(fileStructure[lastIndex] ?? 0);
        lastIndex--;
        startIndex++;
      }
    }
  }

  return cleanedFiles.reduce(
    (sum, current, position) => sum + position * current,
    0
  );
};

console.log("Part 1: " + part1());
