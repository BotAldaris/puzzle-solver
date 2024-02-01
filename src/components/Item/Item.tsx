import { Component } from "solid-js";
import styles from "./Item.module.css";
const Item: Component<{
  num: number;
  func: () => void;
}> = (props) => {
  return (
    <div onclick={() => props.func()} class={styles.grid}>
      {props.num}
    </div>
  );
};

export default Item;
