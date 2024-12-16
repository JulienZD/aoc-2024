import type { Solver } from '../../solution';

export const part1: Solver = ([input]) => {
  let current = input!.split(' ').map(Number);
  for (let i = 0; i < 25; i++) {
    current = blink(current);
  }
  return current.length;
};

function blink(numbers: readonly number[]): number[] {
  const next = numbers.slice();

  for (let i = 0; i < next.length; i++) {
    const stone = next[i]!;

    if (stone === 0) {
      next[i] = 1;
      continue;
    }

    const digits = stone.toString().split('').map(Number);
    if (digits.length % 2 === 0) {
      const [left, right] = [digits.slice(0, digits.length / 2), digits.slice(digits.length / 2)].map((x) =>
        Number(x.join(''))
      ) as [number, number];

      next[i] = left!;

      next.splice(i + 1, 0, right);
      // Handle the extra position
      i++;

      continue;
    }

    next[i] = stone * 2024;
  }

  return next;
}

export const part2: Solver = ([input]) => {};
