import type { Solver } from '../../solution.js';

export const part1: Solver = (input) => {
  const report = input.map((line) => line.split(' ').map(Number));

  const validIndexes: number[] = [];

  for (let lineIndex = 0; lineIndex < report.length; lineIndex++) {
    const line = report[lineIndex]!;

    let isValid = true;

    let prevIncrements: boolean | undefined;

    for (let i = 0; i < line.length - 1; i++) {
      const current = line[i]!;
      const next = line[i + 1]!;

      const diff = current - next;
      if (Math.abs(diff) > 3 || diff === 0) {
        isValid = false;
        break;
      }

      const increments = diff > 0;
      if (prevIncrements !== undefined && prevIncrements !== increments) {
        isValid = false;
        break;
      }

      prevIncrements = increments;
    }

    if (isValid) {
      validIndexes.push(lineIndex);
    }
  }

  return validIndexes.length;
};

export const part2: Solver = (input) => {};
