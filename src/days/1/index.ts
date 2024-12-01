import type { Solver } from '../../solution.js';

export const part1: Solver = (input) => {
  const tuples = input.map((line) => line.split(' ').filter((char) => char !== ''));
  const listOne = tuples.map(([value]) => Number(value)).sort((a, b) => a - b);
  const listTwo = tuples.map(([_, value]) => Number(value)).sort((a, b) => a - b);

  let totalDistance = 0;

  for (let i = 0; i < listOne.length; i++) {
    const lowest1 = Math.min(...listOne.slice(i));
    const lowest2 = Math.min(...listTwo.slice(i));

    totalDistance += lowest1 > lowest2 ? lowest1 - lowest2 : lowest2 - lowest1;
  }

  return totalDistance;
};

export const part2: Solver = (input) => {
  const tuples = input.map((line) => line.split(' ').filter((char) => char !== ''));
  const listOne = tuples.map(([value]) => Number(value)).sort((a, b) => a - b);
  const listTwo = tuples.map(([_, value]) => Number(value)).sort((a, b) => a - b);

  const occurences = Object.fromEntries(
    Object.entries(Object.groupBy(listTwo, (item) => item)).map(([key, items]) => [key, items?.length])
  );

  let totalSimilarityScore = 0;

  for (const value of listOne) {
    const occurencesInListTwo = occurences[value] ?? 0;

    totalSimilarityScore += value * occurencesInListTwo;
  }

  return totalSimilarityScore;
};
