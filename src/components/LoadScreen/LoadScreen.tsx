import React from "react";
import { Container } from "@chakra-ui/react";
import { useAnimation, motion } from "framer-motion";
import AlphaSpinner from "../branding/AlphaSpinner/AlphaSpinner";
import LoadingText from "../LoadingText/LoadingText";

/**
 * LoadScreen — spinner + "loading" text with coordinated entry/exit animations.
 *
 * ENTRY SEQUENCE (loading=true):
 * 1. Spinner slides up + fades in (0.7s)
 * 2. Loading text slides up + fades in (0.7s, delayed 0.7s after spinner)
 *
 * EXIT SEQUENCE (loading=false):
 * 1. Spinner fades out + scales down (0.5s)
 * 2. Loading text slides down + fades out (0.5s)
 * 3. Loading text animation completes -> .then() calls setLoadingAnimationComplete()
 *    which triggers the parent (index.tsx) to unmount LoadScreen and show IntroText
 *
 * @param loading - true while loading, false to trigger exit
 * @param setLoadingAnimationComplete - callback when exit animation finishes
 */
const LoadScreen = ({ loading, setLoadingAnimationComplete }) => {
  const spinnerAnimationControl = useAnimation();
  const loadingTextAnimationControl = useAnimation();

  /** Spinner slides up first, then loading text follows with a 0.7s delay */
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

  /** Both elements fade out simultaneously; .then() on text animation signals completion */
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
