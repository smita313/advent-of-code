import { readFileSync } from "fs";
import { Coord, Direction } from "./utils";

type Robot = { InitialPosition: Coord; Velocity: Direction };

const width = 101;
const height = 103;

const getSafetyScore = (positions: Coord[]): number => {
  let topLeft = 0;
  let topRight = 0;
  let bottomRight = 0;
  let bottomLeft = 0;

  positions.forEach((position) => {
    if (position.X < Math.floor(width / 2)) {
      if (position.Y < Math.floor(height / 2)) {
        topLeft++;
      }
      if (position.Y > Math.floor(height / 2)) {
        bottomLeft++;
      }
    }
    if (position.X > Math.floor(width / 2)) {
      if (position.Y < Math.floor(height / 2)) {
        topRight++;
      }
      if (position.Y > Math.floor(height / 2)) {
        bottomRight++;
      }
    }
  });

  return topLeft * topRight * bottomRight * bottomLeft;
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

  const positions: Coord[] = robots.map((r) => {
    const newX = r.InitialPosition.X + 100 * r.Velocity.X;
    const newY = r.InitialPosition.Y + 100 * r.Velocity.Y;

    return {
      X: newX - width * Math.floor(newX / width),
      Y: newY - height * Math.floor(newY / height),
    };
  });

  return getSafetyScore(positions);
};

const part2 = () => {
  const inputStr = readFileSync("./inputs/day14.txt").toString().trim();

  const robots: Robot[] = inputStr.split("\n").map((str) => {
    const matches = str.match(/-?\d+/g);
    return {
      InitialPosition: { X: Number(matches?.at(0)), Y: Number(matches?.at(1)) },
      Velocity: { X: Number(matches?.at(2)), Y: Number(matches?.at(3)) },
    };
  });

  const positions = robots.map((r) => r.InitialPosition);

  let lowestSafetyScore = getSafetyScore(positions);
  let treeSec = 0;

  for (let i = 1; i < 10000; i++) {
    for (let r = 0; r < robots.length; r++) {
      const robot = robots[r];
      const newX = positions[r].X + robot.Velocity.X;
      const newY = positions[r].Y + robot.Velocity.Y;

      positions[r] = {
        X: newX - width * Math.floor(newX / width),
        Y: newY - height * Math.floor(newY / height),
      };
    }

    const safetyScore = getSafetyScore(positions);
    if (safetyScore < lowestSafetyScore) {
      lowestSafetyScore = safetyScore;
      treeSec = i;
    }
  }

  return treeSec;
};

console.log("Part 1: " + part1()); // 218965032

console.log("Part 2: " + part2()); // 7037
