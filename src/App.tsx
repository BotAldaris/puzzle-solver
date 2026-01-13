import { createSignal, type Component, For, onMount } from "solid-js";
import styles from "./App.module.css";
import { check_win, createCorrectBoard, move, solve_bfs } from "./func/solve";
import { generatePuzzle } from "./func/solvable";
import Grid from "./components/Grid";
//653172840
const App: Component = () => {
  onMount(async () => {
    async function loadGoWasm() {
      const go = new window.Go();
      const wasm = await WebAssembly.instantiateStreaming(fetch("/main.wasm"), go.importObject);
      go.run(wasm.instance);
      console.time("hi")
      // const  result = JSON.parse(window.solveBFS(num_begin)) as number[][][]
      console.timeEnd("hi")
    }
    loadGoWasm();
  });
  const [n, setN] = createSignal(4);
  const num_begin = generatePuzzle(n())
  const correct_board = createCorrectBoard(n());
  const [number, setNumbers] = createSignal(num_begin);
  const [resolution, setResolution] = createSignal([]  as  number[][][]);
  let i = 1;

  function modifyNumber() {
    if (resolution()) {
      if (resolution().length > i) {
        const next = resolution()[i];
        setNumbers(next);
        i++;
      }
    }
  }

  function try_move(i: number, j: number) {
    const next_number = move(number(), i, j, 3);
    if (next_number) {
      setNumbers(next_number);
      if (check_win(next_number, correct_board)) {
        alert("You Win");
      }
    }
  }
  return (
    <main class={styles.main}>
      <h1>Puzzle 8 Game</h1>
      <Grid number={number()} try_move={try_move} />
      <div class={styles.buttons}>
        <button
          class={styles.button}
          style={{ "background-color": "#008CBA" }}
          onclick={() => modifyNumber()}
        >
          Next
        </button>
        <button
          class={styles.button}
          style={{ "background-color": "#f44336" }}
          onclick={() => {
            setNumbers(generatePuzzle(n()));
            setResolution([]);
            i = 1;
          }}
        >
          Shuffle
        </button>
        <button
          class={styles.button}
          style={{ "background-color": "#4CAF50" }}
          onclick={() => {
            setResolution(solve_bfs(number(), n(), correct_board)!);
            alert("The puzzle was solved click on next to walktrouh the solution");
          }}
        >
          Solve
        </button>
      </div>
    </main>
  );
};

export default App;
