import React from "react";
import { Text } from "@chakra-ui/layout";
import styles from "./Main.Layout.module.css";

export default function MainLayout(props) {
  return (
    <div>
      <div className={styles.container}>
        <main className={styles.main}>{props.children}</main>
      </div>
      <footer
        style={{
          position: "absolute",
          bottom: "1vh",
          textAlign: "right",
          width: "98vw",
        }}
      >
        <Text color="blackAlpha.400">
          &copy; {new Date().getFullYear()} - Arsh Sekhon
        </Text>
      </footer>
    </div>
  );
}
