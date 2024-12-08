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

export const part2: Solver = (input) => {
  const calibrations = input
    .map((line) => {
      const [_, target, equations] = line.match(/(\d+): (.*)/);
      return {
        target: Number(target),
        equations: equations.split(' ').map(Number),
      };
    })
    .filter(({ target, equations }) => canReachTarget2(target, ...equations));

  return calibrations.reduce<number>((total, current) => total + current.target, 0);
};

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
  // This is somehow not breaking for part 1, but is for part 2
  if (nextNum === undefined) {
    return false;
  }

  return recurse(target, multiplied, nextNum, ...nextNumbers) || recurse(target, added, nextNum, ...nextNumbers);
}

function canReachTarget2(target: number, ...numbers: number[]) {
  return recurse2(target, numbers[0]!, numbers[1]!, ...numbers.slice(2));
}

function recurse2(target: number, left: number, right: number | undefined, ...next: number[]): boolean {
  if (right === undefined) {
    return left === target;
  }

  const multiplied = left * right;
  const added = left + right;
  const concatenated = Number(`${left}${right}`);

  const [nextNum, ...nextNumbers] = next;

  return (
    recurse2(target, added, nextNum, ...nextNumbers) ||
    recurse2(target, multiplied, nextNum, ...nextNumbers) ||
    recurse2(target, concatenated, nextNum, ...nextNumbers)
  );
}
