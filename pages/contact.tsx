import React from "react";
import { motion } from "framer-motion";
import Navlink from "../src/components/navigation/Navlink/Navlink";
import { Router } from "next/router";
export default function ContactPage() {
  const [Open, setOpen] = React.useState(true);

  Router.events.on("beforeHistoryChange", (route: string) => {
    setOpen(false);
  });

  return (
    <>
      {Open && (
        <div>
          <motion.div
            style={{
              ...(false
                ? {
                    position: "fixed",
                    left: "50%",
                    translateX: "-50%",
                  }
                : {
                    position: "fixed",
                    top: "10%",
                  }),
              visibility: "visible",
            }}
            transition={{ duration: 1 }}
            layoutId="contact-HomeNavLink"
            exit={{ opacity: 0 }}
          >
            <Navlink
              text="Contact"
              href="/contact"
              enabled={true}
              normalCharSpacing="50px"
            />
          </motion.div>
        </div>
      )}
    </>
  );
}
