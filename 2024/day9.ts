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

const part2 = () => {
  const inputStr = readFileSync("./inputs/day9.txt").toString().trim();

  type Block = { Id: number | undefined; Count: number };

  const fileStructure: Block[] = inputStr.split("").map((digit, i) => {
    if (i % 2 == 0) {
      return { Id: i / 2, Count: parseInt(digit) };
    }

    return { Id: undefined, Count: parseInt(digit) };
  });

  const cleanedFiles = [...fileStructure];

  for (let i = fileStructure.length - 1; i > -1; i--) {
    const lastBlock = fileStructure[i];
    if (lastBlock.Id != undefined) {
      const availableSpot = cleanedFiles.findIndex(
        (b) => b.Id == undefined && b.Count >= lastBlock.Count
      );
      const currIndex = cleanedFiles.findIndex((b) => b.Id == lastBlock.Id);

      if (availableSpot != -1 && currIndex > availableSpot) {
        const freeSpaceReplacement = {
          Id: undefined,
          Count: lastBlock.Count,
        };

        const relocatedReplacement = [
          lastBlock,
          {
            Id: undefined,
            Count: cleanedFiles[availableSpot].Count - lastBlock.Count,
          },
        ];
        cleanedFiles.splice(currIndex, 1, freeSpaceReplacement);
        cleanedFiles.splice(availableSpot, 1, ...relocatedReplacement);
      }
    }
  }

  return cleanedFiles
    .filter((block) => block.Count > 0)
    .flatMap((block) => Array<number | undefined>(block.Count).fill(block.Id))
    .reduce(
      (sum: number, current, position) => sum + position * (current ?? 0),
      0
    );
};

console.log("Part 1: " + part1()); // 6154342787400
console.log("Part 2: " + part2()); // 6183632723350
