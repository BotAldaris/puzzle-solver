import { Component } from "solid-js";
import styles from './Item.module.css';
const Item: Component<{num:number}> = (props) => {
  return (
    <div class={styles.grid}>
        {props.num}
    </div>
  );
}

export default Item