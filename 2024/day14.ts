import { readFileSync } from "fs";
import { Coord, Direction } from "./utils";

type Robot = { InitialPosition: Coord; Velocity: Direction };

const topLeft = "topLeft";
const topRight = "topRight";
const bottomRight = "bottomRight";
const bottomLeft = "bottomLeft";

const width = 101;
const height = 103;

const quadrantPartition = (positions: Coord[]): Record<string, number> => {
  const quadrants: Record<string, number> = {};
  quadrants[topLeft] = 0;
  quadrants[topRight] = 0;
  quadrants[bottomRight] = 0;
  quadrants[bottomLeft] = 0;

  Object.entries(positions).forEach(([, position]) => {
    if (position.X < Math.floor(width / 2)) {
      if (position.Y < Math.floor(height / 2)) {
        quadrants[topLeft]++;
      }
      if (position.Y > Math.floor(height / 2)) {
        quadrants[bottomLeft]++;
      }
    }
    if (position.X > Math.floor(width / 2)) {
      if (position.Y < Math.floor(height / 2)) {
        quadrants[topRight]++;
      }
      if (position.Y > Math.floor(height / 2)) {
        quadrants[bottomRight]++;
      }
    }
  });

  return quadrants;
};

const part1 = () => {
  const inputStr = readFileSync("./inputs/day14.txt").toString().trim();

  const robots: Robot[] = inputStr.split("\n").map((str) => {
    const matches = str.match(/-?\d+/g);
    return {
      InitialPosition: { X: Number(matches?.at(0)), Y: Number(matches?.at(1)) },
      Velocity: { X: Number(matches?.at(2)), Y: Number(matches?.at(3)) },
    };
  });

  const positions: Coord[] = [];

  robots.forEach((r) => positions.push(r.InitialPosition));

  for (let i = 0; i < 100; i++) {
    for (let r = 0; r < robots.length; r++) {
      const robot = robots[r];
      const newX = positions[r].X + robot.Velocity.X;
      const newY = positions[r].Y + robot.Velocity.Y;

      positions[r] = {
        X: newX - width * Math.floor(newX / width),
        Y: newY - height * Math.floor(newY / height),
      };
    }
  }

  const quadrants = quadrantPartition(positions);

  return (
    quadrants[topLeft] *
    quadrants[topRight] *
    quadrants[bottomRight] *
    quadrants[bottomLeft]
  );
};

console.log("Part 1: " + part1()); // 218965032
