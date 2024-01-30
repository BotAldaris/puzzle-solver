import { createSignal, type Component, For } from "solid-js";
import styles from "./App.module.css";
import Item from "./Item";
import solve_bfs from "./func/solve";
const App: Component = () => {
  const num_begin = [
    [0, 1, 7],
    [6, 2, 5],
    [4, 3, 8],
  ];
  const solved = solve_bfs(num_begin);
  const [number, setNumbers] = createSignal(num_begin);
  let i = 1;
  function modifyNumber() {
    if (solved) {
      if (solved.length > i) {
        const next = solved[i];
        setNumbers(next);
        i++;
      }
    }
  }
  return (
    <>
      <div class={styles.grid}>
        <For each={number()}>
          {(numArr) => (
            <For each={numArr}>{(num) => <Item num={num}></Item>}</For>
          )}
        </For>
      </div>
      <button onclick={() => modifyNumber()}>Next</button>
      <p>moves = {solved?.length}</p>
    </>
  );
};

export default App;
