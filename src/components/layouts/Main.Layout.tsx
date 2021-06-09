import React from "react";
import { motion } from "framer-motion";
import Navlink from "./Navlink/Navlink";
import styles from "./Main.Layout.module.css";
import { useAppContext } from "../../providers/AppContext";

const Nav = ({ isMobile = false }) => {
  return (
    <>
      <motion.div
        style={
          isMobile
            ? {
                position: "fixed",
                left: "50%",
                translateX: "-50%",
              }
            : {
                position: "fixed",
                right: "15%",
              }
        }
        initial={
          isMobile ? { opacity: 0, top: "0%" } : { opacity: 0, bottom: "0%" }
        }
        animate={
          isMobile ? { opacity: 1, top: "4%" } : { opacity: 1, bottom: "4%" }
        }
        transition={{ duration: 1 }}
      >
        <Navlink text="Contact" href="/contact" enabled={true} />
      </motion.div>

      <motion.div
        style={
          isMobile
            ? {
                position: "fixed",
                left: "50%",
                translateX: "-50%",
              }
            : {
                position: "fixed",
                left: "25%",
              }
        }
        initial={{ opacity: 0, bottom: "0%" }}
        animate={
          isMobile ? { opacity: 1, bottom: "4%" } : { opacity: 1, bottom: "4%" }
        }
        transition={{ duration: 1 }}
      >
        <Navlink text="About" href="/about" enabled={true} />
      </motion.div>

      <motion.div
        style={{
          position: "fixed",
          top: "50vh",
          rotate: -90,
          translateY: "-50%",
          translateX: "50%",
        }}
        initial={{ opacity: 0, right: "-4%" }}
        animate={{ opacity: 1, right: "4%" }}
        transition={{ duration: 1 }}
      >
        <Navlink
          text="Work"
          href="/work"
          enabled={true}
          fontSize="2.5rem"
          normalCharSpacing="10px"
        />
      </motion.div>
    </>
  );
};
const DesktopNav = () => {
  return <Nav isMobile={false} />;
};
const MobileNav = () => {
  return <Nav isMobile={true} />;
};

export default function MainLayout(props) {
  const appCtx = useAppContext();
  return (
    <div>
      <header>
        <nav style={{ position: "absolute" }}>
          {appCtx.data.introViewed && (
            <>
              <div className={styles.desktopNavContainer}>
                {/* <DesktopNav /> */}
              </div>
              <div className={styles.mobileNavContainer}>
                {/* <MobileNav /> */}
              </div>
            </>
          )}
        </nav>
      </header>
      <div className={styles.container}>
        <main className={styles.main}>{props.children}</main>
      </div>
      <footer></footer>
    </div>
  );
}
