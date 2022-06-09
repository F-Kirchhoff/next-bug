import "../styles/globals.css";
import { useEffect } from "react";
import useStore from "../hooks/useStore";

function MyApp({ Component, pageProps }) {
  const setHasHydrated = useStore((state) => state.setHasHydrated);
  useEffect(() => setHasHydrated(true), []);

  return <Component {...pageProps} />;
}

export default MyApp;
