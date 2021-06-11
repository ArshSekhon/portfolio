import { useEffect, useState } from "react";

const useBreakpoint = (
  queries = {
    xs: "(max-width: 320px)",
    sm: "(max-width: 512px)",
    md: "(max-width: 768px)",
    lg: "(max-width: 1024px)",
  }
) => {
  const [queryMatch, setQueryMatch] = useState(null);

  useEffect(() => {
    const mediaQueryLists = {};
    const keys = Object.keys(queries);

    // To check whether event listener is attached or not
    let isAttached = false;

    const handleQueryListener = () => {
      const updatedMatches = keys.reduce((acc, media) => {
        acc[media] = !!(
          mediaQueryLists[media] && mediaQueryLists[media].matches
        );
        return acc;
      }, {});
      //Setting state to the updated matches
      // when document either starts or stops matching a query
      setQueryMatch(updatedMatches);
    };

    if (window && window.matchMedia) {
      const matches = {};
      keys.forEach((media) => {
        if (typeof queries[media] === "string") {
          mediaQueryLists[media] = window.matchMedia(queries[media]);
          matches[media] = mediaQueryLists[media].matches;
        } else {
          matches[media] = false;
        }
      });
      //Setting state to initial matching queries
      setQueryMatch(matches);
      isAttached = true;
      keys.forEach((media) => {
        if (typeof queries[media] === "string") {
          mediaQueryLists[media].addListener(handleQueryListener);
        }
      });
    }

    return () => {
      //If event listener is attached then remove it when deps change
      if (isAttached) {
        keys.forEach((media) => {
          if (typeof queries[media] === "string") {
            mediaQueryLists[media].removeListener(handleQueryListener);
          }
        });
      }
    };
  }, [queries]);

  return queryMatch;
};

export default useBreakpoint;
