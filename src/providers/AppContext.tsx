import React, { useState } from "react";

const defaultAppState = {
  introViewed: false,
};

const AppContext = React.createContext({
  data: null,
  loadComplete: () => {},
  navTransitionRect: null,
  setNavTransitionRect: (_rect: any) => {},
  /** When true, destination pages play reverse exit animations before navigation */
  isExiting: false,
  triggerExit: (_onComplete: () => void) => {},
  completeExit: () => {},
});

function AppContextProvider(props) {
  const [appData, setAppData] = useState(defaultAppState);
  const [navTransitionRect, setNavTransitionRect] = useState(null);
  const [isExiting, setIsExiting] = useState(false);
  const exitCallbackRef = React.useRef<(() => void) | null>(null);

  const loadComplete = () => {
    setAppData({ introViewed: true });
  };

  /**
   * Called by BackButton to trigger exit animations.
   * Pages watch isExiting and play reverse animations,
   * then call onComplete to actually navigate.
   */
  const triggerExit = (onComplete: () => void) => {
    exitCallbackRef.current = onComplete;
    setIsExiting(true);
  };

  // Expose the exit callback so pages can call it when done
  const completeExit = React.useCallback(() => {
    if (exitCallbackRef.current) {
      exitCallbackRef.current();
      exitCallbackRef.current = null;
    }
    setIsExiting(false);
  }, []);

  return (
    <AppContext.Provider
      value={{
        data: appData,
        loadComplete,
        navTransitionRect,
        setNavTransitionRect,
        isExiting,
        triggerExit,
        completeExit,
      }}
      {...props}
    />
  );
}
const useAppContext = () => React.useContext(AppContext);

export { AppContextProvider, useAppContext };
