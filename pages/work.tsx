import React from "react";
import { motion } from "framer-motion";
import styles from "./styles/work.module.css";
import Navlink from "../src/components/navigation/Navlink/Navlink";
import { useAppContext } from "../src/providers/AppContext";
import { Router } from "next/router";

export default function Work() {
  const appCtx = useAppContext();
  const [Open, setOpen] = React.useState(true);
  const [titleExpanded, setTitleExpanded] = React.useState(
    !!appCtx.data.introViewed
  );

  React.useEffect(() => {
    setTimeout(() => {
      setTitleExpanded(false);
    }, 1100);
  }, []);

  Router.events.on("beforeHistoryChange", (route: string) => {
    setOpen(false);
  });

  return (
    <>
      {Open && (
        <div>
          <motion.div
            style={{
              position: "fixed",
              top: "50vh",
              right: "95vw",
              x: "50%",
              y: "-50%",
              // transform: "translate(-50%,-50%) rotate(-90deg)",
            }}
          >
            <motion.div
              transition={{ duration: 1 }}
              layoutId="work-HomeNavLink"
            >
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
                isExpanded={titleExpanded}
              />
            </motion.div>
          </motion.div>
        </div>
      )}
    </>
  );
}
