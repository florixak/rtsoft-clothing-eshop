import { useEffect, useEffectEvent, useState } from "react";

const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState<boolean>(false);

  const setInitialMatchesEffectFn = useEffectEvent((media: MediaQueryList) => {
    setMatches(media.matches);
  });

  useEffect(() => {
    const media = window.matchMedia(query);
    setInitialMatchesEffectFn(media);

    const listener = () => setMatches(media.matches);

    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
};

export default useMediaQuery;
