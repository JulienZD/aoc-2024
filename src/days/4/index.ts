import type { Solver } from '../../solution.js';

export const part1: Solver = (input) => {
  const grid = input.map((line) => line.split(''));

  return findXmases(grid);
};

function findXmases(grid: string[][]): number {
  let occurrences = 0;

  for (let y = 0; y < grid.length; y++) {
    const row = grid[y]!;
    for (let x = 0; x < row.length; x++) {
      const cell = row[x]!;
      if (cell !== 'X') {
        continue;
      }

      const right = [row[x], row[x + 1], row[x + 2], row[x + 3]];
      const left = [row[x], row[x - 1], row[x - 2], row[x - 3]];

      const columns = grid.map((r) => r[x]);

      const down = [columns[y], columns[y + 1], columns[y + 2], columns[y + 3]];
      const up = [columns[y], columns[y - 1], columns[y - 2], columns[y - 3]];

      for (const direction of [right, left, up, down]) {
        if (direction.join('') === 'XMAS') {
          occurrences++;
        }
      }

      const offsets = Array.from({ length: 3 }, (_, index) => index + 1);

      const leftDown = offsets
        .filter((offset) => y + offset <= grid.length)
        .map((offset) => grid[y + offset]?.[x - offset]);

      const rightDown = offsets
        .filter((offset) => y + offset <= grid.length)
        .map((offset) => grid[y + offset]?.[x + offset]);

      const rightUp = offsets.filter((offset) => y - offset >= 0).map((offset) => grid[y - offset]?.[x + offset]);
      const leftUp = offsets.filter((offset) => y - offset >= 0).map((offset) => grid[y - offset]?.[x - offset]);

      for (const diagonal of [leftDown, rightDown, rightUp, leftUp]) {
        const word = `X${diagonal.join('')}`;
        if (word === 'XMAS') {
          occurrences++;
        }
      }
    }
  }

  return occurrences;
}

export const part2: Solver = (input) => {
  const grid = input.map((line) => line.split(''));

  return findMasXes(grid);
};

function findMasXes(grid: string[][]): number {
  let occurrences = 0;

  for (let y = 0; y < grid.length; y++) {
    const row = grid[y]!;
    for (let x = 0; x < row.length; x++) {
      const cell = row[x]!;
      if (cell !== 'A') {
        continue;
      }

      const leftUp = grid[y - 1]?.[x - 1];
      const rightUp = grid[y - 1]?.[x + 1];
      const leftDown = grid[y + 1]?.[x - 1];
      const rightDown = grid[y + 1]?.[x + 1];

      const xWords = [
        [leftUp, cell, rightDown],
        [leftDown, cell, rightUp],
      ].map((words) => [words.join(''), words.toReversed().join('')]);

      const isXMas = xWords.filter((words) => words.some((word) => word === 'MAS')).length === 2;
      if (isXMas) {
        occurrences++;
      }
    }
  }

  return occurrences;
}
