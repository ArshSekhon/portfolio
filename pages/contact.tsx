import React from "react";
import { motion } from "framer-motion";
import Navlink from "../src/components/layouts/Navlink/Navlink";
import { Router } from "next/router";
export default function ContactPage() {
  const [Open, setOpen] = React.useState(true);

  Router.events.on("beforeHistoryChange", (route: string) => {
    setOpen(false);
  });

  return (
    <>
      {Open && (
        <motion.div
          style={
            false
              ? {
                  position: "fixed",
                  left: "50%",
                  translateX: "-50%",
                }
              : {
                  position: "fixed",
                  top: "10%",
                }
          }
          transition={{ duration: 1 }}
          layoutId="contact-link"
          exit={{ opacity: 0 }}
        >
          <Navlink
            text="Contact"
            href="/contact"
            enabled={true}
            normalCharSpacing="50px"
          />
        </motion.div>
      )}
    </>
  );
}
