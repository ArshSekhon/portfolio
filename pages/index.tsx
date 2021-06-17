import Head from "next/head";
import React from "react";
import AlphaLogoWithShadow from "../src/components/branding/AlphaLogoWithShadow/AlphaLogoWithShadow";
import IntroText from "../src/components/branding/IntroText/IntroText";
import LoadScreen from "../src/components/LoadScreen/LoadScreen";
import styles from "../styles/Home.module.css";
import { motion } from "framer-motion";
import Home from "../src/components/Home/Home";
import { useAppContext } from "../src/providers/AppContext";

export default function HomePage() {
  const appCtx = useAppContext();
  const [loading, setLoading] = React.useState(!appCtx.data.introViewed);
  const [loadingAnimationComplete, setLoadingAnimationComplete] =
    React.useState(appCtx.data.introViewed);

  const [showIntro, setShowIntro] = React.useState(false);
  const [introComplete, setIntroComplete] = React.useState(
    appCtx.data.introViewed
  );

  const setLoadingTimeOut = (timeout) => {
    setTimeout(() => {
      setLoading(false);
    }, timeout);
  };

  const setIntroTimeOut = (timeout) => {
    setTimeout(() => {
      setShowIntro(false);
    }, timeout);
  };

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

      {!loadingAnimationComplete && (
        <LoadScreen
          loading={loading}
          setLoadingAnimationComplete={() => {
            setLoadingAnimationComplete(true);
            setShowIntro(true);
            setIntroTimeOut(2000);
          }}
        />
      )}
      {loadingAnimationComplete && !introComplete && (
        <IntroText
          showIntro={showIntro}
          setIntroComplete={() => {
            setTimeout(() => {
              setIntroComplete(true);
            }, 300);
            appCtx.loadComplete();
          }}
        />
      )}
      {loadingAnimationComplete && introComplete && <Home />}
    </div>
  );
}
