import React, { useState, useEffect } from "react";

const defaultAppState = {
  introViewed: false,
};

const AppContext = React.createContext({
  data: null,
  loadComplete: () => {},
});

function AppContextProvider(props) {
  const [appData, setAppData] = useState(defaultAppState);
  const loadComplete = () => {
    setAppData({ introViewed: true });
  };

  return (
    <AppContext.Provider value={{ data: appData, loadComplete }} {...props} />
  );
}
const useAppContext = () => React.useContext(AppContext);

export { AppContextProvider, useAppContext };
