export type Direction = { X: number; Y: number };

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
