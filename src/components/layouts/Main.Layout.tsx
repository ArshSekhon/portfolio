import React from "react";
import { Text } from "@chakra-ui/react";
import styles from "./Main.Layout.module.css";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import BackButton from "../BackButton/BackButton";
import { useAppContext } from "../../providers/AppContext";

/**
 * MainLayout — shared page shell rendered by _app.tsx around every page.
 * Contains the main content area, a back button (on non-home pages),
 * and a fade-in footer with copyright.
 */
export default function MainLayout(props) {
  const router = useRouter();
  const appCtx = useAppContext();
  const isHome = router.pathname === "/";

  return (
    <div>
      <div className={styles.container}>
        {!isHome && appCtx.data.introViewed && <BackButton />}
        <main className={styles.main}>{props.children}</main>
      </div>
      <motion.div
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
