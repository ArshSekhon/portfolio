import React from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import styles from "./BackButton.module.css";

/**
 * BackButton — fixed bottom-left back navigation with brutalist design.
 *
 * Default: dark grey circle with sharp left-facing arrow.
 * Hover: circle shrinks + turns black, "BACK" label slides out from behind.
 * Click: navigates to "/" (home).
 * Fades in after a delay to let page entrance animations complete first.
 */
export default function BackButton() {
  const router = useRouter();

  return (
    <motion.div
      className={styles.wrapper}
      onClick={() => router.push("/")}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 0.6, ease: "easeOut" }}
    >
      <div className={styles.circle}>
        {/* Sharp, geometric left arrow — no rounded caps */}
        <svg className={styles.arrow} viewBox="0 0 24 24">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="11,5 5,12 11,19" />
        </svg>
      </div>
      <span className={styles.label}>Back</span>
    </motion.div>
  );
}
