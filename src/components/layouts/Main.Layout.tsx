import React from "react";
import { Text } from "@chakra-ui/layout";
import styles from "./Main.Layout.module.css";
import { AnimatePresence, motion } from "framer-motion";
import RainbowButton from "../RainbowButton/RainbowButton";
import { Tooltip } from "@chakra-ui/react";
import { useAppContext } from "../../providers/AppContext";

const DownloadResumeButton = () => {
  return (
    <motion.div
      initial={{ scale: 1 }}
      animate={{ scale: 1.15 }}
      transition={{
        repeat: Infinity,
        repeatType: "reverse",
        duration: 1,
        ease: "easeInOut",
      }}
    >
      <Tooltip
        label="Resume"
        zIndex={1000}
        hasArrow
        position="absolute"
        placement="top"
        fontWeight="light"
        fontFamily="Open Sans"
        fontSize="xs"
      >
        <div>
          <RainbowButton
            style={{ height: "3em", width: "3em", padding: "0.75em" }}
          >
            <span
              className="material-icons-outlined"
              style={{ margin: "auto" }}
            >
              badge
            </span>
          </RainbowButton>
        </div>
      </Tooltip>
    </motion.div>
  );
};

export default function MainLayout(props) {
  const appCtx = useAppContext();
  return (
    <div>
      <div className={styles.container}>
        <AnimatePresence>
          {appCtx.data.introViewed && (
            <motion.div
              style={{ position: "fixed", bottom: "6%", right: "3vw" }}
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 1,
                ease: "easeInOut",
              }}
            >
              <DownloadResumeButton />
            </motion.div>
          )}
        </AnimatePresence>
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
