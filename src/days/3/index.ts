import type { Solver } from '../../solution.js';

const MULTIPLY_REGEX = /mul\((\d+,\d+)\)/g;

export const part1: Solver = (input) => {
  const corruptedMemory = input.join('');

  const multiplications = corruptedMemory
    .matchAll(MULTIPLY_REGEX)
    .map((v) => v[1]?.split(',').map(Number)! as [number, number])
    .toArray();

  return multiplications.reduce((sum, tuple) => {
    return sum + tuple[0] * tuple[1];
  }, 0);
};

export const part2: Solver = (input) => {
  const corruptedMemory = input.join('');

  let state = corruptedMemory;

  const enabledMultiplications: Array<[number, number]> = [];

  while (state.length) {
    const untilDisabled = state.split("don't()")[0] ?? state;

    const multiplications = untilDisabled
      .matchAll(MULTIPLY_REGEX)
      .map((v) => v[1]?.split(',').map(Number)! as [number, number])
      .toArray();

    enabledMultiplications.push(...multiplications);

    // Remove the part we just processed
    state = state.slice(untilDisabled.length);

    // Remove everything up to the first do(), so we can restart with an enabled state
    state = state.split('do()').slice(1).join('do()');
  }

  return enabledMultiplications.reduce((sum, tuple) => {
    return sum + tuple[0] * tuple[1];
  }, 0);
};
