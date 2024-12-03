import type { Solver } from '../../solution.js';

export const part1: Solver = (input) => {
  const corruptedMemory = input.join('');

  const MULTIPLY_REGEX = /mul\((\d+,\d+)\)/g;

  const multiplications = corruptedMemory
    .matchAll(MULTIPLY_REGEX)
    .map((v) => v[1]?.split(',').map(Number)!)
    .toArray();

  return multiplications.reduce((sum, tuple) => {
    return sum + tuple[0]! * tuple[1]!;
  }, 0);
};

export const part2: Solver = (input) => {
  const corruptedMemory = input.join('');

  return 0;
};
