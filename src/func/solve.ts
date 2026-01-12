import Trie from "./Trie";

export function solve_bfs(nums: number[][], n: number, correct_board: number[][]) {
  const visited = new Trie();
  const path = new Map();

  path.set(nums, "");
  const to_visit = [nums];
  while (to_visit.length != 0) {
    const current = to_visit.pop();
    if (!current) {
      break;
    }
    const moves = find_move_opportunity(current, n);
    for (let index = 0; index < moves.length; index++) {
      const move = moves[index];
      if (check_win(move, correct_board)) {
        let curr = current;
        const res_path = [move];
        while (curr) {
          res_path.push(curr);
          curr = path.get(curr);
        }
        return res_path.reverse();
      }
      if (visited.exists(move)) {
        continue;
      }
      visited.add(move);
      path.set(move, current);
      to_visit.unshift(move);
    }
  }
  console.log("sad");
}

export function solve_dfs(nums: number[][], root: Trie): number[][][] {
  if (root.exists(nums)) {
    return [];
  }
  if (check_win(nums, [[]])) {
    return [nums];
  }
  root.add(nums);
  const moves = find_move_opportunity(nums, 0);
  for (let index = 0; index < moves.length; index++) {
    const element = moves[index];
    const result = solve_dfs(element, root);
    if (result.length > 0) {
      result.push(nums);
      return result;
    }
  }
  return [];
}

function find_zero(nums: number[][], n: number) {
  for (let i = 0; n > i; i++) {
    for (let j = 0; j < n; j++) {
      const element = nums[i][j];
      if (element == 0) {
        return [i, j];
      }
    }
  }
  return [0, 0];
}

function find_move_opportunity(nums: number[][], n: number) {
  const zero = find_zero(nums, n);
  const i = zero[0];
  const j = zero[1];
  const next_index_list = [];

  if (i > 0) {
    let num_mod = nums.map((row) => row.slice());
    const last_num = num_mod[i - 1][j];
    num_mod[i][j] = last_num;
    num_mod[i - 1][j] = 0;
    next_index_list.push(num_mod);
  }

  if (i < n - 1) {
    let num_mod = nums.map((row) => row.slice());
    const last_num = num_mod[i + 1][j];
    num_mod[i][j] = last_num;
    num_mod[i + 1][j] = 0;
    next_index_list.push(num_mod);
  }

  if (j > 0) {
    let num_mod = nums.map((row) => row.slice());
    const last_num = num_mod[i][j - 1];
    num_mod[i][j] = last_num;
    num_mod[i][j - 1] = 0;
    next_index_list.push(num_mod);
  }

  if (j < n - 1) {
    let num_mod = nums.map((row) => row.slice());
    const last_num = num_mod[i][j + 1];
    num_mod[i][j] = last_num;
    num_mod[i][j + 1] = 0;
    next_index_list.push(num_mod);
  }
  return next_index_list;
}

export function check_win(nums: number[][], correct_board: number[][]) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums[i].length; j++) {
      if (nums[i][j] != correct_board[i][j]) {
        return false;
      }
    }
  }
  return true;
}

export function createCorrectBoard(n: number) {
  const nums: number[][] = [];
  let i = -1;
  for (let index = 0; index < n * n - 1; index++) {
    if (index % n == 0) {
      i++;
      nums.push([index + 1]);
    } else {
      try {
        nums[i].push(index + 1);
      } catch {
        console.log(i);
        console.log(nums);
      }
    }
  }
  nums[nums.length - 1].push(0);
  console.log("board_correct");
  console.log(nums);
  return nums;
}

function log_nums(nums: number[][], i: number, j: number) {
  console.log("------------------------------------------------");
  console.log(`i: ${i}, j: ${j}`);
  nums.forEach((element) => {
    console.log(element);
  });
  console.log("------------------------------------------------");
}

export function move(nums_p: number[][], i: number, j: number, n: number) {
  let nums = nums_p.map((row) => row.slice());
  const zeroPosition = find_zero(nums, n);
  if (
    (i - 1 <= zeroPosition[0] && i + 1 >= zeroPosition[0] && zeroPosition[1] == j) ||
    (j - 1 <= zeroPosition[1] && j + 1 >= zeroPosition[1] && zeroPosition[0] == i)
  ) {
    const last_num = nums[i][j];
    nums[i][j] = 0;
    nums[zeroPosition[0]][zeroPosition[1]] = last_num;
    return nums;
  }
}
