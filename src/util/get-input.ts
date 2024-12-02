import path from 'path';
import { readFile, stat, writeFile } from 'fs/promises';
import { styleText } from 'util';

export async function getDayInput(dayNumber: number, dayDirectory: string, useExample: boolean) {
  const inputFile = path.join(dayDirectory, useExample ? 'example.txt' : 'input.txt');

  const hasInput = await stat(inputFile).catch(() => false);

  if (!hasInput) {
    if (useExample) {
      console.error(styleText('red', `Could not find ${inputFile}`));
      process.exit(1);
    }

    const input = await getInputFromAOC(dayNumber);

    await writeFile(inputFile, input.trim());
  }

  return readFile(inputFile, 'utf8');
}

async function getInputFromAOC(dayNumber: number) {
  const inputUrl = `https://adventofcode.com/2024/day/${dayNumber}/input`;

  const response = await fetch(inputUrl, {
    headers: {
      cookie: `session=${process.env.AOC_SESSION_COOKIE}`,
      'User-Agent': `${process.env.REPOSITORY_URL} by ${process.env.EMAIL}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Could not get input from ${inputUrl}. Response status: ${response.status}`);
  }

  return response.text();
}
