import Head from "next/head";
import React from "react";
import AlphaLogoWithShadow from "../src/components/branding/AlphaLogoWithShadow/AlphaLogoWithShadow";
import IntroText from "../src/components/branding/IntroText/IntroText";
import LoadScreen from "../src/components/LoadScreen/LoadScreen";
import styles from "../styles/Home.module.css";
import { motion } from "framer-motion";
import Home from "../src/components/Home/Home";
import { useAppContext } from "../src/providers/AppContext";

/**
 * HomePage — orchestrates the intro sequence on first visit.
 *
 * INTRO SEQUENCE FLOW (first visit, introViewed=false):
 * 1. LoadScreen renders (spinner + loading text entry animation)
 * 2. After 3s timeout, `loading` becomes false -> LoadScreen plays exit animation
 * 3. LoadScreen exit completes -> setLoadingAnimationComplete(true), showIntro=true
 * 4. IntroText renders, plays entry animation (slide up + fade in)
 * 5. After 2s timeout, showIntro=false -> IntroText plays exit animation
 * 6. IntroText exit completes -> setIntroComplete(true), appCtx.loadComplete()
 *    (sets introViewed=true so the intro never replays in this session)
 * 7. Home component renders with nav links
 *
 * RETURNING VISIT (introViewed=true via AppContext):
 * - All intro states start as "complete", so Home renders immediately.
 * - This includes navigating back to "/" from another page.
 */
export default function HomePage() {
  const appCtx = useAppContext();
  // If intro already viewed, skip straight to the final state
  const [loading, setLoading] = React.useState(!appCtx.data.introViewed);
  const [loadingAnimationComplete, setLoadingAnimationComplete] =
    React.useState(appCtx.data.introViewed);

  const [showIntro, setShowIntro] = React.useState(false);
  const [introComplete, setIntroComplete] = React.useState(
    appCtx.data.introViewed
  );

  const setLoadingTimeOut = (timeout) => {
    setTimeout(() => {
      setLoading(false); // Triggers LoadScreen exit animation
    }, timeout);
  };

  const setIntroTimeOut = (timeout) => {
    setTimeout(() => {
      setShowIntro(false); // Triggers IntroText exit animation
    }, timeout);
  };

  // Start the 3s loading timer on mount
  React.useEffect(() => {
    setLoadingTimeOut(3000);
  }, []);

  return (
    <div>
      <Head>
        <title>Arsh Sekhon</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Hey There! I'm  Arsh Sekhon, an experienced Software Developer 
          with several years of experience developing enterprise scale software.
          I started out as a Graphics Designer, so I have a keen eye for detail and 
          design in the work I produce."
        />
      </Head>

      {/* Phase 1: Loading spinner + text. When exit animation completes, starts Phase 2. */}
      {!loadingAnimationComplete && (
        <LoadScreen
          loading={loading}
          setLoadingAnimationComplete={() => {
            setLoadingAnimationComplete(true);
            setShowIntro(true);
            setIntroTimeOut(2000); // IntroText shows for 2s before exiting
          }}
        />
      )}
      {/* Phase 2: Intro message. When exit animation completes, marks intro as viewed. */}
      {loadingAnimationComplete && !introComplete && (
        <IntroText
          showIntro={showIntro}
          setIntroComplete={() => {
            setTimeout(() => {
              setIntroComplete(true);
            }, 300); // Brief delay before showing Home for smooth transition
            appCtx.loadComplete(); // Sets introViewed=true globally
          }}
        />
      )}
      {/* Phase 3: Main home screen with nav links */}
      {loadingAnimationComplete && introComplete && <Home />}
    </div>
  );
}
