import React, { useState } from "react";

/**
 * AppContext — global state shared across the portfolio app.
 *
 * STATE:
 * - data.introViewed (boolean): Set to true after the intro sequence
 *   (LoadScreen + IntroText) completes on first visit. Used to:
 *   a. Skip the intro on subsequent visits to "/" within the same session
 *   b. Adjust content entrance delay on destination pages (About/Work use
 *      1.3s delay if introViewed, 0s otherwise — so first-ever load has no
 *      awkward gap, but nav transitions get time for the morph to finish)
 *
 * - navTransitionRect (DOMRect-like object | null): The bounding rect of the
 *   clicked Navlink, captured just before router.push(). Read by:
 *   a. useMorphTransition (About/Contact) for vertical FLIP animation
 *   b. Work page for horizontal CSS transition
 *   Cleared after the destination page finishes its entrance animation.
 *
 * METHODS:
 * - loadComplete(): marks introViewed=true
 * - setNavTransitionRect(rect): stores/clears the morph source rect
 */
const defaultAppState = {
  introViewed: false,
};

const AppContext = React.createContext({
  data: null,
  loadComplete: () => {},
  navTransitionRect: null,
  setNavTransitionRect: (_rect: any) => {},
});

function AppContextProvider(props) {
  const [appData, setAppData] = useState(defaultAppState);
  /** Stores the bounding rect of the nav link that was clicked, for morph animation */
  const [navTransitionRect, setNavTransitionRect] = useState(null);

  /** Called when the intro sequence finishes; prevents replay on return to "/" */
  const loadComplete = () => {
    setAppData({ introViewed: true });
  };

  return (
    <AppContext.Provider
      value={{ data: appData, loadComplete, navTransitionRect, setNavTransitionRect }}
      {...props}
    />
  );
}
const useAppContext = () => React.useContext(AppContext);

export { AppContextProvider, useAppContext };
