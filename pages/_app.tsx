import '../styles/globals.sass'
import type {AppProps} from 'next/app'
import React, {useEffect} from "react";
import {stateDesktop} from "../lib/state/state";
import {ThemeTitle, updateCurrentTheme} from "../lib/theme";
import { useAtom } from 'jotai';

function MyApp({Component, pageProps}: AppProps) {
  const desktopState = useAtom(stateDesktop);
  const [desktop, setDesktop] = desktopState;
  useEffect(() => {
    const localTheme = localStorage.getItem('theme');

    // If theme is stored locally, use that, otherwise default is auto
    if (localTheme) {
      switch (localTheme) {
        case ThemeTitle.Dark:
          setDesktop({
            ...desktop,
            theme: ThemeTitle.Dark
          });
          break;
        case ThemeTitle.Light:
          setDesktop({
            ...desktop,
            theme: ThemeTitle.Light
          });
          break;
        default:
          setDesktop({
            ...desktop,
            theme: ThemeTitle.Auto
          });
          break;
      }
    }

    updateCurrentTheme(desktopState);

    const mql = window.matchMedia('(prefers-color-scheme: dark)');

    mql.onchange = (_) => {
      updateCurrentTheme(desktopState);
    }
  }, []);

  return <Component {...pageProps} />
}

export default MyApp
