import { Component, For } from "solid-js";
import styles from "./Grid.module.css";
import Item from "../Item/Item";

const Grid: Component<{
  number: number[][];
  try_move: (i: number, j: number) => void;
}> = (props) => {
  return (
    <div class={styles.grid}>
      <For each={props.number}>
        {(numArr, i) => (
          <For each={numArr}>
            {(num, j) => <Item num={num} func={() => props.try_move(i(), j())}></Item>}
          </For>
        )}
      </For>
    </div>
  );
};

export default Grid;
