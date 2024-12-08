export type Direction = { X: number; Y: number };

export const isValidCoord = (grid: string[], row: number, col: number) => {
  return row >= 0 && row < grid.length && col >= 0 && col < grid[0].length;
};
