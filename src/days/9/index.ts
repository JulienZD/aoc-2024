import type { Solver } from '../../solution';

export const part1: Solver = ([input]) => {
  const blocks: Block[] = toBlocks(input!);

  const movedBlocks = moveBlocks(blocks);

  const squashed = squashAdjacentBlockIds(structuredClone(movedBlocks));

  return calculateChecksum(squashed);
};

export const part2: Solver = ([input]) => {
  const blocks: Block[] = toBlocks(input!);

  const movedBlocks = moveBlocksPart2(blocks);

  let squashed = structuredClone(movedBlocks);
  for (let i = 0; i < 5; i++) {
    squashed = squashAdjacentBlockIds(structuredClone(squashed));
  }

  return calculateChecksum(squashed);
};

type Block = [size: number, id: number | null];

function toBlocks(input: string): Block[] {
  const blocks: Block[] = [];

  let id = 0;

  for (let i = 0; i < input.length; i++) {
    const size = Number(input[i]);
    if (size === 0) {
      continue;
    }

    const blockId = i % 2 === 0 ? id++ : null;

    blocks.push([size, blockId]);
  }

  return blocks;
}

function moveBlocks(_blocks: ReadonlyArray<Block>): Block[] {
  const blocks = structuredClone(_blocks) as Block[];

  for (let i = blocks.length - 1; i > 0; i--) {
    while (true) {
      const [size, blockId] = blocks[i]!;

      const emptyIndex = blocks.findIndex((block) => block[1] === null);
      if (emptyIndex === -1 || emptyIndex >= i || blockId === null) {
        break;
      }

      const emptySpace = blocks[emptyIndex]![0]!;
      const remainingEmptySpace = Math.max(emptySpace - size, 0);

      // Move the block to the empty space
      const moveSize = emptySpace === size ? size : emptySpace - size > 0 ? size : emptySpace;
      blocks[emptyIndex] = [moveSize, blockId];

      let hasInserted = false;

      const [_nextBlockSize, nextBlockId] = blocks[emptyIndex + 1] ?? [];
      if (remainingEmptySpace > 0) {
        // Add the remaining space to the next empty block, if we're already next to one
        if (nextBlockId === null) {
          const nextBlock = blocks[emptyIndex + 1]!;
          nextBlock[0] += remainingEmptySpace;
        } else {
          // Otherwise, we need to insert a new empty block to make up for the remaining space
          blocks.splice(emptyIndex + 1, 0, [remainingEmptySpace, null]);
          hasInserted = true;
        }
      }

      const remainingSize = size - moveSize;

      const currentBlockIndex = hasInserted ? i + 1 : i;
      // Remove the moved ids
      blocks[currentBlockIndex] = [remainingSize, remainingSize === 0 ? null : blockId];

      if (hasInserted) {
        i++;
      }

      if (remainingSize === 0) {
        break;
      }
    }
  }

  return blocks;
}

function moveBlocksPart2(_blocks: ReadonlyArray<Block>): Block[] {
  const blocks = structuredClone(_blocks) as Block[];

  const movedIds = new Set<number>();

  for (let i = blocks.length - 1; i > 0; i--) {
    const [size, blockId] = blocks[i]!;
    if (blockId === null || movedIds.has(blockId)) {
      continue;
    }

    const emptyIndex = blocks.findIndex((block) => block[1] === null && block[0] >= size);
    if (emptyIndex === -1 || emptyIndex >= i) {
      continue;
    }

    const emptySpace = blocks[emptyIndex]![0]!;

    const canMove = emptySpace - size >= 0;
    if (!canMove) {
      continue;
    }

    // Move the block to the empty space
    const moveSize = size;
    blocks[emptyIndex] = [moveSize, blockId];

    movedIds.add(blockId);

    // Remove the moved ids
    blocks[i] = [size, null];

    const remainingEmptySpace = Math.max(emptySpace - size, 0);
    if (remainingEmptySpace > 0) {
      // Insert a new empty block to make up for the remaining space
      blocks.splice(emptyIndex + 1, 0, [remainingEmptySpace, null]);

      i++;
    }
  }

  return blocks;
}

// The moving algorithm doesn't squash any adjacent blockIds, so we need to clean it up
function squashAdjacentBlockIds(blocks: Block[]): Block[] {
  for (let i = 0; i < blocks.length - 1; i++) {
    const current = blocks[i]!;
    const next = blocks[i + 1]!;

    if (current[1] === next[1]) {
      next[0] += current[0];
      blocks.splice(i, 1);
    }
  }
  return blocks;
}

function calculateChecksum(blocks: ReadonlyArray<Block>): number {
  let position = 0;
  let total = 0;

  for (const [size, blockId] of blocks) {
    for (let i = 0; i < size; i++) {
      if (blockId !== null) {
        total += blockId * position;
      }
      position++;
    }
  }

  return total;
}
