import type { Solver } from '../../solution.js';

export const part1: Solver = (input) => {
  const calibrations = input
    .map((line) => {
      // @ts-expect-error this is ok
      const [_, target, equations] = line.match(/(\d+): (.*)/);
      return {
        target: Number(target),
        equations: equations.split(' ').map(Number),
      };
    })
    .filter(({ target, equations }) => canReachTarget(target, ...equations));

  return calibrations.reduce<number>((total, current) => total + current.target, 0);
};

export const part2: Solver = (input) => {};

function canReachTarget(target: number, ...numbers: number[]) {
  return recurse(target, numbers[0]!, numbers[1]!, ...numbers.slice(2));
}

function recurse(target: number, left: number, right: number, ...next: number[]): boolean {
  const multiplied = left * right;
  const added = left + right;

  if (multiplied === target) {
    return true;
  }

  if (added === target) {
    return true;
  }

  const [nextNum, ...nextNumbers] = next;
  if (nextNum === undefined) {
    return false;
  }

  return recurse(target, multiplied, nextNum, ...nextNumbers) || recurse(target, added, nextNum, ...nextNumbers);
}
