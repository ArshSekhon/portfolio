import React from "react";
import { Container } from "@chakra-ui/react";
import { useAnimation, motion } from "framer-motion";
import AlphaSpinner from "../branding/AlphaSpinner/AlphaSpinner";
import LoadingText from "../LoadingText/LoadingText";

const LoadScreen = ({ loading, setLoadingAnimationComplete }) => {
  const spinnerAnimationControl = useAnimation();
  const loadingTextAnimationControl = useAnimation();

  const startEntryAnimation = () => {
    spinnerAnimationControl.stop();
    loadingTextAnimationControl.stop();

    spinnerAnimationControl.start({
      opacity: 1,
      y: "0%",
      transition: {
        duration: 0.7,
        ease: "easeIn",
      },
    });

    loadingTextAnimationControl.start({
      opacity: 1,
      y: "0%",
      transition: {
        duration: 0.7,
        ease: "easeIn",
        delay: 0.7,
      },
    });
  };

  const startExitAnimation = () => {
    spinnerAnimationControl.stop();
    loadingTextAnimationControl.stop();

    spinnerAnimationControl.start({
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    });

    loadingTextAnimationControl
      .start({
        opacity: 0,
        y: "50%",
        transition: {
          duration: 0.5,
          ease: "easeOut",
        },
      })
      .then(() => {
        setLoadingAnimationComplete();
      });
  };
  React.useEffect(() => {
    if (loading) startEntryAnimation();
    else startExitAnimation();
  }, [loading]);

  return (
    <Container maxW="xs" centerContent>
      <motion.div
        initial={{ opacity: 0, y: "100%" }}
        animate={spinnerAnimationControl}
        style={{ marginBottom: "2rem" }}
      >
        <AlphaSpinner />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: "40%" }}
        animate={loadingTextAnimationControl}
      >
        <LoadingText />
      </motion.div>
    </Container>
  );
};

export default LoadScreen;
