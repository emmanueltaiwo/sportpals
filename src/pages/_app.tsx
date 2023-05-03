import "@/styles/globals.css";
import type { AppProps } from "next/app";
import React, { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
    useEffect(() => {
      // Disable text selection when the component mounts
      document.body.style.userSelect = "none";

      // Re-enable text selection when the component unmounts
      return () => {
        document.body.style.userSelect = "auto";
      };
    }, []);
  return <Component {...pageProps} />;
}
