import type { Solver } from '../../solution.js';

export const part1: Solver = (input) => {
  const report = input.map((line) => line.split(' ').map(Number));

  return report.filter((line) => isValidLine(line)).length;
};

export const part2: Solver = (input) => {
  const report = input.map((line) => line.split(' ').map(Number));

  return report.map((line) => isValidLinePart2(line)).filter(Boolean).length;
};

function isValidLine(line: number[]) {
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

  return isValid;
}

function isValidLinePart2(line: number[]) {
  if (isValidLine(line)) {
    return true;
  }

  return line.some((_, indexToRemove) => isValidLine(line.filter((_, index) => index !== indexToRemove)));
}
