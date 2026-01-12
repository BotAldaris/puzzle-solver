export function isSolvable(puzzle: number[][]): boolean {
  const flattenPuzzle = puzzle.flat(); // Transforma a matriz 2D em uma matriz 1D
  const flattenedArray = flattenPuzzle.filter((num) => num !== 0); // Remove a célula vazia

  const gridSize = puzzle.length;
  const blankRow = puzzle.findIndex((row) => row.includes(0)); // Linha da célula vazia

  // Conta o número de inversões
  let inversions = 0;
  for (let i = 0; i < flattenedArray.length - 1; i++) {
    for (let j = i + 1; j < flattenedArray.length; j++) {
      if (flattenedArray[i] > flattenedArray[j]) {
        inversions++;
      }
    }
  }

  // Se o tamanho do puzzle for ímpar, o puzzle é solucionável se o número de inversões for par
  if (gridSize % 2 === 1) {
    return inversions % 2 === 0;
  }

  // Se o tamanho do puzzle for par, o puzzle é solucionável se a soma da linha da célula vazia e o número de inversões for ímpar
  return (blankRow + inversions) % 2 === 1;
}

export function generatePuzzle(n: number) {
  const nums = [];
  for (let index = 0; index < n * n; index++) {
    nums.push(index);
  }
  console.log(nums);
  let board = shuffleArray(nums, n);
  while (!isSolvable(board)) {
    board = shuffleArray(nums, n);
  }
  return board;
}

function shuffleArray(array: number[], n: number): number[][] {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  const nums: number[][] = [];
  let i = -1;
  for (let index = 0; index < array.length; index++) {
    if (index % n == 0) {
      i++;
      nums.push([array[index]]);
    } else {
      nums[i].push(array[index]);
    }
  }
  return nums;
}
