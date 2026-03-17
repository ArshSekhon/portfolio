import React, { useState } from "react";

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
  const [navTransitionRect, setNavTransitionRect] = useState(null);

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
