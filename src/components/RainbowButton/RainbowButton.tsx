import React from "react";
import styles from "./RainbowButton.module.css";

export default function RainbowButton({
  children,
  onClick = () => {},
  style = {},
}) {
  return (
    <button className={styles.glowOnHover} onClick={onClick} style={style}>
      {children}
    </button>
  );
}
