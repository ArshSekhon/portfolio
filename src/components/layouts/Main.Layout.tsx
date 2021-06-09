import React from "react";
import styles from "./Main.Layout.module.css";

export default function MainLayout(props) {
  return (
    <div>
      <div className={styles.container}>
        <main className={styles.main}>{props.children}</main>
      </div>
      <footer></footer>
    </div>
  );
}
