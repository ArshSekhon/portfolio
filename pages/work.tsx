import React from "react";
import { motion } from "framer-motion";
import styles from "./styles/work.module.css";
import Navlink from "../src/components/navigation/Navlink/Navlink";

export default function Work() {
  return (
    <div>
      {" "}
      <motion.div
        style={{
          position: "fixed",
          top: "50vh",
          right: "50vh",
          x: "50%",
          // transform: "translate(-50%,-50%) rotate(-90deg)",
        }}
      >
        <motion.div transition={{ duration: 1 }} layoutId="work-HomeNavLink">
          <Navlink
            fontSize="4rem"
            text="Works"
            href="/work"
            enabled={true}
            style={{
              transform: "rotate(-90deg)",
              position: "relative",
              right: "0%",
              top: "50%",
            }}
            isExpanded={true}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
