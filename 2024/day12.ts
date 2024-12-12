import { readFileSync } from "fs";
import { Coord, Direction } from "./utils";

const searchDirections: Direction[] = [
  { X: 0, Y: -1 },
  { X: 1, Y: 0 },
  { X: 0, Y: 1 },
  { X: -1, Y: 0 },
];

const isAdjacentTo = (region: Coord[], point: Coord) => {
  return region.some((r) =>
    searchDirections.some((d) => point.X - r.X == d.X && point.Y - r.Y == d.Y)
  );
};

const findHoles = (region: Coord[]) => {
  const xVals = region
    .map((c) => c.X)
    .sort()
    .slice(1, -1);
  const yVals = region
    .map((c) => c.Y)
    .sort()
    .slice(1, -1);

  let holes: Coord[] = [];

  for (let y = yVals[0]; y <= yVals[-1]; y++) {
    for (let x = xVals[0]; x <= xVals[-1]; x++) {}
  }
  console.log({ holes });

  return holes;
};

// todo: handle holes
const calculatePerimeter = (region: Coord[]) => {
  return (
    new Set(region.map((c) => c.X)).size * 2 +
    new Set(region.map((c) => c.Y)).size * 2 +
    findHoles(region).length * 4
  );
};

const part1 = () => {
  //   const inputStr = readFileSync("./inputs/day12.txt").toString().trim();

  const inputStr = `OOOOO
OXOXO
OOOOO
OXOXO
OOOOO`;

  const regionMap = inputStr.split("\n");

  const discoveredRegions: Record<string, Coord[]> = {};

  for (let i = 0; i < regionMap.length; i++) {
    for (let j = 0; j < regionMap.length; j++) {
      const coord: Coord = { X: j, Y: i };

      const existingKeys = Object.keys(discoveredRegions).filter((k) =>
        k.includes(regionMap[i][j])
      );
      if (existingKeys.length > 0) {
        const adjacentRegionKey = existingKeys.find((k) =>
          isAdjacentTo(discoveredRegions[k], coord)
        );

        if (adjacentRegionKey) {
          discoveredRegions[adjacentRegionKey].push(coord);
        } else {
          discoveredRegions[`${regionMap[i][j]} ${existingKeys.length}`] = [
            coord,
          ];
        }
      } else {
        discoveredRegions[`${regionMap[i][j]} 0`] = [coord];
      }
    }
  }

  console.log(discoveredRegions);

  return Object.values(discoveredRegions).reduce(
    (sum, current) => sum + calculatePerimeter(current) * current.length,
    0
  );
};

console.log("Part 1: " + part1());
