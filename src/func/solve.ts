import Trie from "./Trie";

function solve_bfs(nums: number[][]) {
  const visited = new Trie();
  const path = new Map();
  path.set(nums, "");
  const to_visit = [nums];
  while (to_visit.length != 0) {
    const current = to_visit.pop();
    if (!current) {
      break;
    }
    const moves = find_move_opportunity(current);
    for (let index = 0; index < moves.length; index++) {
      const move = moves[index];
      if (check_win(move)) {
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
}

function find_zero(nums: number[][]) {
  for (let i = 0; 3 > i; i++) {
    for (let j = 0; j < 3; j++) {
      const element = nums[i][j];
      if (element == 0) {
        return [i, j];
      }
    }
  }
  return [0, 0];
}

function find_move_opportunity(nums: number[][]) {
  const zero = find_zero(nums);
  const i = zero[0];
  const j = zero[1];
  const next_index_list = [];

  if (i > 0) {
    let num_mod = nums.map((row) => row.slice()); // Cópia profunda
    const last_num = num_mod[i - 1][j];
    num_mod[i][j] = last_num;
    num_mod[i - 1][j] = 0;
    next_index_list.push(num_mod);
  }

  if (i < 2) {
    let num_mod = nums.map((row) => row.slice()); // Cópia profunda
    const last_num = num_mod[i + 1][j];
    num_mod[i][j] = last_num;
    num_mod[i + 1][j] = 0;
    next_index_list.push(num_mod);
  }

  if (j > 0) {
    let num_mod = nums.map((row) => row.slice()); // Cópia profunda
    const last_num = num_mod[i][j - 1];
    num_mod[i][j] = last_num;
    num_mod[i][j - 1] = 0;
    next_index_list.push(num_mod);
  }

  if (j < 2) {
    let num_mod = nums.map((row) => row.slice()); // Cópia profunda
    const last_num = num_mod[i][j + 1];
    num_mod[i][j] = last_num;
    num_mod[i][j + 1] = 0;
    next_index_list.push(num_mod);
  }
  return next_index_list;
}

function check_win(nums: number[][]) {
  const win = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 0],
  ];
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums[i].length; j++) {
      if (nums[i][j] != win[i][j]) {
        return false;
      }
    }
  }
  return true;
}

// function log_nums(nums: number[][], i: number, j: number) {
//   console.log("------------------------------------------------");
//   console.log(`i: ${i}, j: ${j}`);
//   nums.forEach((element) => {
//     console.log(element);
//   });
// }
export default solve_bfs;
