import { readFileSync } from "fs";
import { Coord, coordEquals, Direction } from "./utils";

const searchDirections: Direction[] = [
  { X: 0, Y: -1 },
  { X: 1, Y: 0 },
  { X: 0, Y: 1 },
  { X: -1, Y: 0 },
];

const findRegions = (grid: string[][]) => {
  const discoveredRegions: Record<string, Coord[]> = {};

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const coord: Coord = { X: j, Y: i };

      const existingKeys = Object.keys(discoveredRegions).filter((k) =>
        k.includes(grid[i][j])
      );
      if (existingKeys.length > 0) {
        const adjacentRegionKeys = existingKeys.filter((k) =>
          isAdjacentTo(discoveredRegions[k], coord)
        );

        if (adjacentRegionKeys.length == 1) {
          discoveredRegions[adjacentRegionKeys[0]].push(coord);
        } else if (adjacentRegionKeys.length > 1) {
          adjacentRegionKeys.slice(1).forEach((k) => {
            discoveredRegions[adjacentRegionKeys[0]].push(
              ...discoveredRegions[k]
            );

            discoveredRegions[k] = [];
          });

          discoveredRegions[adjacentRegionKeys[0]].push(coord);
        } else {
          discoveredRegions[`${grid[i][j]} ${existingKeys.length}`] = [coord];
        }
      } else {
        discoveredRegions[`${grid[i][j]} 0`] = [coord];
      }
    }
  }

  return discoveredRegions;
};

const isAdjacentTo = (region: Coord[], point: Coord) => {
  return region.some((r) =>
    searchDirections.some((d) => r.X == point.X + d.X && r.Y == point.Y + d.Y)
  );
};

const calculatePerimeter = (region: Coord[]) => {
  let total = 0;
  for (let i = 0; i < region.length; i++) {
    for (let d = 0; d < searchDirections.length; d++) {
      if (
        !region.some(
          (regionElement) =>
            regionElement.X == region[i].X + searchDirections[d].X &&
            regionElement.Y == region[i].Y + searchDirections[d].Y
        )
      ) {
        total++;
      }
    }
  }

  return total;
};

const countCorners = (region: Coord[], point: Coord) => {
  const dirs = [-1, 1];

  let total = 0;
  for (let y = 0; y < dirs.length; y++) {
    for (let x = 0; x < dirs.length; x++) {
      if (
        !region.some((r) =>
          coordEquals(r, { X: point.X + dirs[x], Y: point.Y })
        ) &&
        !region.some((r) =>
          coordEquals(r, { X: point.X, Y: point.Y + dirs[y] })
        )
      ) {
        total++;
      }

      if (
        region.some((r) =>
          coordEquals(r, { X: point.X + dirs[x], Y: point.Y })
        ) &&
        region.some((r) =>
          coordEquals(r, { X: point.X, Y: point.Y + dirs[y] })
        ) &&
        !region.some((r) =>
          coordEquals(r, { X: point.X + dirs[x], Y: point.Y + dirs[y] })
        )
      ) {
        total++;
      }
    }
  }

  return total;
};

const calculateCorners = (region: Coord[]) => {
  return region.reduce(
    (sum, current) => sum + countCorners(region, current),
    0
  );
};

const part1 = () => {
  const inputStr = readFileSync("./inputs/day12.txt").toString().trim();

  const regionMap = inputStr.split("\n").map((row) => row.trim().split(""));

  const discoveredRegions = findRegions(regionMap);

  return Object.values(discoveredRegions).reduce((sum, current) => {
    return sum + calculatePerimeter(current) * current.length;
  }, 0);
};

const part2 = () => {
  const inputStr = readFileSync("./inputs/day12.txt").toString().trim();

  const regionMap = inputStr.split("\n").map((row) => row.trim().split(""));

  const discoveredRegions = findRegions(regionMap);

  return Object.values(discoveredRegions).reduce((sum, current) => {
    return sum + calculateCorners(current) * current.length;
  }, 0);
};

console.log("Part 1: " + part1()); // 1451030
console.log("Part 2: " + part2()); // 859494
