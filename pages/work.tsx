import React from "react";
import { motion } from "framer-motion";
import styles from "./styles/work.module.css";
import Navlink from "../src/components/navigation/Navlink/Navlink";

export default function Work() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        layoutId="work-HomeNavLink"
      >
        <div
          style={{
            transform: "rotate(-90deg)",
          }}
        >
          <Navlink
            style={{ fontSize: "4rem" }}
            text="Works"
            href="/work"
            enabled={false}
          />
        </div>
      </motion.div>
    </div>
  );
}
