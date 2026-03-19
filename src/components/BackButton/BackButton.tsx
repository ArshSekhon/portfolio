import React from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import styles from "./BackButton.module.css";
import { useAppContext } from "../../providers/AppContext";

/**
 * BackButton — triggers reverse exit animations, then navigates home.
 * Pages watch appCtx.isExiting and play reverse animations,
 * then call appCtx.completeExit() which triggers the actual navigation.
 */
export default function BackButton() {
  const router = useRouter();
  const appCtx = useAppContext();

  const handleClick = () => {
    appCtx.triggerExit(() => {
      router.push("/");
    });
  };

  return (
    <motion.div
      className={styles.wrapper}
      onClick={handleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: appCtx.isExiting ? 0 : 1 }}
      transition={{ delay: appCtx.isExiting ? 0 : 2, duration: 0.3, ease: "easeOut" }}
    >
      <div className={styles.circle}>
        <svg className={styles.arrow} viewBox="0 0 24 24">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="11,5 5,12 11,19" />
        </svg>
      </div>
      <span className={styles.label}>Back</span>
    </motion.div>
  );
}
