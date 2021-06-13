import React from "react";
import { Text } from "@chakra-ui/layout";
import styles from "./Main.Layout.module.css";
import { motion } from "framer-motion";

export default function MainLayout(props) {
  return (
    <div>
      <div className={styles.container}>
        <main className={styles.main}>{props.children}</main>
      </div>
      <motion.div
        layoutId="footer"
        transition={{ duration: 1 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <footer
          style={{
            position: "absolute",
            bottom: "0vh",
            textAlign: "center",
            width: "98vw",
            transform: "translate(0%,-50%)",
            fontSize: "0.75em",
            fontWeight: 500,
          }}
        >
          <Text color="blackAlpha.400">
            &copy; {new Date().getFullYear()} - Arsh Sekhon
          </Text>
        </footer>
      </motion.div>
    </div>
  );
}
