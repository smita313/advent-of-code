export type Direction = { X: number; Y: number };
export type Coord = Direction;

export const coordEquals = (a: Coord, b: Coord) => {
  return a.X == b.X && a.Y == b.Y;
};

export const isValidCoord = (
  grid: any[][] | string[],
  row: number,
  col: number
) => {
  return row >= 0 && row < grid.length && col >= 0 && col < grid[0].length;
};

export const isValidIndex = (arr: any[] | string, index: number) => {
  return index >= 0 && index < arr.length;
};

export const checkGridElement = (
  grid: any[][] | string[],
  testValue: any,
  row: number,
  col: number
) => {
  return isValidCoord(grid, row, col) && grid[row][col] == testValue;
};
